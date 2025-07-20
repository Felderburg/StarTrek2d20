import { PDFDocument, PDFFont, PDFForm, PDFPage } from "@cantoo/pdf-lib";
import { Character } from "../common/character";
import { FontLibrary, FontType } from "./fontLibrary";
import { Column } from "./column";
import i18next from "i18next";
import fontkit from '@pdf-lib/fontkit'
import { greyColour2e, labelColourProvider, tealColour2e } from "./colourProvider2e";
import { PortraitSheetDecorations } from "./portraitSheetDecorations";
import { FontSpecification } from "./fontSpecification";
import { TextBlock } from "./textBlock";
import { SimpleColor } from "../common/colour";
import { Paragraph } from "./paragraph";
import { XYLocation } from "../common/xyLocation";
import { Attribute } from "../helpers/attributes";
import { makeKey } from "../common/translationKey";
import { Department } from "../helpers/department";
import { labelWriter, VerticalAlignment } from "./labelWriter";
import { TextAlign } from "./textAlign";
import { FontOptions } from "./fontOptions";
import { Construct, Stereotype } from "../common/construct";
import { WeaponDescriber } from "./weaponDescriber";
import { bullet2EWriter } from "./bullet2eWriter";
import { NpcType } from "../npc/model/npcType";

declare function download(bytes: any, fileName: any, contentType: any): any;

export class GmTrackerPdfSheet {

    static COLUMNS = [
        new Column(60.8, 78.2, 200, 478.3),
        new Column(60.8, 295.4, 200, 478.3),
        new Column(60.8, 512.6, 200, 478.3),
    ];


    getPdfUrl(): string {
        return "/static/pdf/STA_2e_Starship_Sheet.pdf";
    }

    fonts: FontLibrary = new FontLibrary();
    headingFont: PDFFont;

    async export(characters: Character[]) {
        const existingPdfBytes = await fetch(this.getPdfUrl()).then(res => res.arrayBuffer())
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        await this.populate(pdfDoc, characters);

        const pdfBytes = await pdfDoc.save();

        download(pdfBytes, "GM_Tracker", "application/pdf");
    }

    async initializeFonts(pdf: PDFDocument) {

        pdf.registerFontkit(fontkit);
        const baseFontBytes = await fetch("/static/font/OpenSansCondensed-Light.ttf").then(res => res.arrayBuffer());
        const baseFont =  await pdf.embedFont(baseFontBytes)
        const form = pdf.getForm()
        if (form) {
            const rawUpdateFieldAppearances = form.updateFieldAppearances.bind(form);
            form.updateFieldAppearances = function () {
                return rawUpdateFieldAppearances(baseFont);
            };
        }

        this.fonts.addFont(FontType.Standard, baseFont);
        const boldFontBytes = await fetch("/static/font/OpenSansCondensed-Bold.ttf").then(res => res.arrayBuffer());
        const boldFont = await pdf.embedFont(boldFontBytes);
        this.fonts.addFont(FontType.Bold, boldFont);

        const italicFontBytes = await fetch("/static/font/OpenSansCondensed-LightItalic.ttf").then(res => res.arrayBuffer());
        const italicFont = await pdf.embedFont(italicFontBytes);
        this.fonts.addFont(FontType.Italic, italicFont);

        const fontBytes = await fetch("/static/font/Michroma-Regular.ttf").then(res => res.arrayBuffer());
        this.headingFont = await pdf.embedFont(fontBytes);

        const symbolFontBytes = await fetch("/static/font/Trek_Arrowheads.ttf").then(res => res.arrayBuffer());
        const symbolFont = await pdf.embedFont(symbolFontBytes);
        this.fonts.addFont(FontType.Symbol, symbolFont);
    }

    async populate(pdf: PDFDocument, characters: Character[]) {
        await this.initializeFonts(pdf);
        let page = pdf.getPage(0);
        let decorations = new PortraitSheetDecorations();
        decorations.drawSheetDecorations(page, tealColour2e);
        decorations.writeName(page, i18next.t('GMTracker.title'), tealColour2e,
            this.headingFont,  new Column(75, 48, 15, 550-75));

        let blankCopy = await pdf.copyPages(pdf, [0]);

        for (let i = 0; i < characters.length; i++) {
            let c = characters[i];
            let column = GmTrackerPdfSheet.COLUMNS[i % 3];
            if (i > 0 && (i % 3) === 0) {
                page = pdf.addPage(blankCopy[0])
                blankCopy = await pdf.copyPages(pdf, [pdf.getPages().length-1]);
            }

            let headerColumn = column.topBefore(13);
            let name = c.nameAndAbbreviatedRank;
            if (c.stereotype === Stereotype.Npc && c.npcGenerationStep?.type != null) {
                name += " (" + i18next.t(makeKey("NpcType.", NpcType[c.npcGenerationStep?.type], ".name")).toLocaleUpperCase() + ")";
            }
            this.writeSubTitle(page, name, headerColumn);
            let column1 = column.bottomAfter(13);
            let column2 = new Column(column1.start.x + column1.width - 220, column1.start.y, column1.height, 220);
            column1 = new Column(column1.start.x, column1.start.y, column1.height, 220, column2);

            let descriptionParagraph = new Paragraph(page, column1, this.fonts);
            descriptionParagraph.append(c.speciesName + (c.assignment?.length ? "," : ""), new FontOptions(9))
            if (c.assignment?.length) {
                descriptionParagraph.append(c.assignment, new FontOptions(9));
            }
            descriptionParagraph.write();

            let statColumn = descriptionParagraph.nextColumn().bottomAfter(10);
            column1 = this.writeStatBoxes(page, statColumn, c);

            if (c.isStressTrackPresent) {
                let heading = new Paragraph(page, column1, this.fonts);
                heading.append(i18next.t('Construct.other.stress').toLocaleUpperCase() + ":",
                    new FontOptions(9, FontType.Bold), tealColour2e);
                heading.write();
                column1 = heading.nextColumn().bottomAfter(5);
                column1 = this.writeStressBoxes(page, pdf.getForm(), c.stress, i, column1);
                column1 = column1.bottomAfter(8, page);
            } else if (c.isPersonalThreatTrackPresent) {
                let heading = new Paragraph(page, column1, this.fonts);
                heading.append(i18next.t('Construct.other.personalThreat').toLocaleUpperCase() + ":",
                    new FontOptions(9, FontType.Bold), tealColour2e);
                heading.write();
                column1 = heading.nextColumn().bottomAfter(5);
                column1 = this.writeStressBoxes(page, pdf.getForm(), c.personalThreat, i, column1);
                column1 = column1.bottomAfter(8, page);
            }

            column1 = column1.columnWithAtLeast(20, page)?.column;
            let heading = new Paragraph(page, column1, this.fonts);
            heading.append(i18next.t('Construct.other.attacks').toLocaleUpperCase() + ":",
                new FontOptions(9, FontType.Bold), tealColour2e);
            heading.write();
            column1 = heading.nextColumn().bottomAfter(5);
            column1 = this.writeAttacks(page, c, column1)?.bottomAfter(9, page);
            column1 = column1.columnWithAtLeast(20, page)?.column;

            if (column1 != null) {
                let paragraph = new Paragraph(page, column1, this.fonts);
                if (c.focuses?.length) {
                    paragraph.append(i18next.t('Construct.other.focuses').toLocaleUpperCase() + ": ",
                        new FontOptions(9, FontType.Bold), tealColour2e);
                    paragraph.append(c.focuses.join(", "), new FontOptions(9));
                    paragraph.write();
                    paragraph = paragraph?.nextParagraph();
                }
                if (c.talents?.length) {
                    paragraph?.append(i18next.t('Construct.other.talents').toLocaleUpperCase() + ": ",
                        new FontOptions(9, FontType.Bold), tealColour2e);
                    paragraph?.append(c.talents.map(t => t.displayName).join(", "), new FontOptions(9));
                    paragraph?.write();
                    paragraph = paragraph?.nextParagraph();
                }

                if (c.values?.length) {
                    paragraph?.append(i18next.t("Construct.other.values").toLocaleUpperCase() + ":", new FontOptions(9, FontType.Bold), tealColour2e);
                    paragraph?.write();

                    c.values.forEach((v, i) => {
                        paragraph = paragraph?.nextParagraph(0.2);
                        paragraph?.indent(15);
                        paragraph?.append(v, new FontOptions(9));
                        paragraph?.write();

                        bullet2EWriter(page, paragraph, tealColour2e);
                    })
                }
            }
        }
    }

    writeStatBoxes(page: PDFPage, column: Column, character: Character) {

        let boxes = new XYLocation(column.start.x, column.start.y);
        const statFrame = "M 2.835,0 C 1.269,0 0,1.269 0,2.835 V 9 c 0,1.565 1.269,2.835 2.835,2.835 h 66.567 c 1.565,0 2.835,-1.27 2.835,-2.835 V 2.835 C 72.237,1.269 70.967,0 69.402,0 Z";

        const rowHeight = 16;
        let labels = {};
        [Attribute.Control, Attribute.Fitness, Attribute.Presence, Attribute.Daring, Attribute.Insight, Attribute.Reason].forEach((a, i) => {

            let location = new XYLocation(boxes.x + i % 3 * 81, boxes.y + Math.floor(i / 3) * rowHeight);
            let x = location.x;
            const y = page.getHeight() - location.y;
            page.moveTo(x, y);
            page.drawSvgPath(statFrame, {
                borderColor: SimpleColor.from("#979696").asPdfRbg(),
                borderWidth: 0.5
            });

            let labelColumn = new Column(x + 2, location.y, 11.8, 72.2 * 0.8);
            const key = i18next.t(makeKey("Construct.attribute.", Attribute[a]));
            labels[key] = labelColumn;

            this.writeLabel(page, "" + character.attributes[a], this.valueBlock(labelColumn), new FontSpecification(this.fonts.fontByType(FontType.Bold), 9),
                tealColour2e);
        });

        column = column.bottomAfter(10 + 2 * rowHeight);
        boxes = new XYLocation(column.start.x, column.start.y);
        [Department.Command, Department.Engineering, Department.Medicine, Department.Conn, Department.Security, Department.Science].forEach((s, i) => {

            let location = new XYLocation(boxes.x + i % 3 * 81, boxes.y + Math.floor(i / 3) * rowHeight);
            let x = location.x;
            const y = page.getHeight() - location.y;
            page.moveTo(x, y);
            page.drawSvgPath(statFrame, {
                borderColor: SimpleColor.from("#979696").asPdfRbg(),
                borderWidth: 0.5
            });

            let labelColumn = new Column(x + 2, location.y, 11.8, 72.2 * 0.8);
            const key = makeKey("Construct.discipline.", Department[s]);
            labels[key] = labelColumn;

            this.writeLabel(page, "" + character.departments[s], this.valueBlock(labelColumn), new FontSpecification(this.fonts.fontByType(FontType.Bold), 9),
                labelColourProvider(character.era, key));
        });

        labelWriter(page, labels, character.version, this.fonts.fontByType(FontType.Bold), 9, (label) => labelColourProvider(character.era, label),
            TextAlign.Right, "", VerticalAlignment.Middle);

        return column.bottomAfter(10 + 2 * rowHeight);
    }

    writeSubTitle(page: PDFPage, text: string, block: Column) {
        if (block.height > 13) {
            block = block.topBefore(13);
        }
        const font = new FontSpecification(this.headingFont, 9);
        const textBlock = TextBlock.create(text.toLocaleUpperCase(), font, 0);

        let lead = (block.width - textBlock.width) / 2;
        lead = Math.min(12, lead - 4);

        let x = block.start.x + lead + 4;
        let y = block.end.y - 1 - ((block.height - textBlock.height) / 2);
        textBlock.writeToPage(x, page.getHeight() - y, page, SimpleColor.from("#000000"));

        page.drawLine({
            start: { x: block.start.x, y: page.getHeight() - (y + 3 - block.height / 2) },
            end: { x: block.start.x + lead, y: page.getHeight() - (y + 3 - block.height / 2) },
            thickness: 1,
            color: greyColour2e.asPdfRbg()
        });

        let end = block.start.x + lead + 4 + textBlock.width + 4;
        if (end < block.end.x) {
            page.drawLine({
                start: { x: end, y: page.getHeight() - (y + 3 - block.height / 2) },
                end: { x: block.end.x, y: page.getHeight() - (y + 3 - block.height / 2) },
                thickness: 1,
                color: greyColour2e.asPdfRbg()
            });
        }
    }

    valueBlock(block: Column) {
        return new Column(block.end.x + 1, block.start.y, block.height, 10);
    }

    writeLabel(page: PDFPage, originalText: string, column: Column, font: FontSpecification, colour: SimpleColor) {
        originalText = originalText.toLocaleUpperCase();
        let textBlock = TextBlock.create(originalText, font, false);

        let text = originalText;
        let width = font.font.widthOfTextAtSize(text, font.size);
        while (width > column.width) {
            text = text.substring(0, text.length-1);
            width = font.font.widthOfTextAtSize(text + "...", font.size);
        }

        if (text !== originalText) {
            text += "...";
            textBlock = TextBlock.create(text, font, false);
        }

        let y = column.end.y - 1 - ((column.height - textBlock.height) / 2);
        let x = column.start.x + (column.width - textBlock.width);
        textBlock.writeToPage(x, page.getHeight() - y, page, colour);
    }

    writeStressBoxes(page: PDFPage, form: PDFForm, stress: number, index: number, column: Column) {
        let stressBox = "m 1,0 h 7.5 c 0.554,0 1,0.446 1,1 v 7.5 c 0,0.554 -0.446,1 -1,1 H 1 C 0.446,9.5 0,9.054 0,8.5 V 1 C 0,0.446 0.446,0 1,0 Z";

        let x = column.translatedStart(page).x;
        const y = column.translatedStart(page).y;
        for (let i = 0; i < stress; i++) {

            page.moveTo(x, y);
            page.drawSvgPath(stressBox, {
                borderColor: SimpleColor.from("#000000").asPdfRbg(),
                borderWidth: 0.5
            });

            let checkbox = form.createCheckBox("Stress-" + (index+1) + " " + (i+1));
            checkbox.addToPage(page, {
                x: x + 0.5,
                y: y - 9,
                width: 8.5,
                height: 8.5,
                textColor: SimpleColor.from("#000000").asPdfRbg(),
                borderWidth: 0
            });

            x += 12;
            if (i % 5 === 4) {
                x += 10;
            }
        }

        const height = 10;
        const result = column.bottomAfter(height);

        if (result == null) {
            const newLocation = column.advanceToNextColumn(page);
            return newLocation?.column;
        } else {
            return result;
        }
    }

    writeAttacks(page: PDFPage, construct: Construct, column: Column, colour: SimpleColor = tealColour2e) {

        let bold = new FontOptions(9, FontType.Bold);
        let standard = new FontOptions(9);
        let paragraph = null;
        let bottom = column;

        construct.determineWeapons().forEach(w => {
            const text = new WeaponDescriber(construct.version, false).describeFully(w, construct);
            paragraph = paragraph == null ? new Paragraph(page, column, this.fonts) : paragraph.nextParagraph(0);
            paragraph?.indent(15);
            paragraph?.append(w.name + ": ", bold);
            paragraph?.append(text, standard);
            paragraph?.write();

            if (paragraph?.lines?.length) {
                bullet2EWriter(page, paragraph, colour);
            }

            bottom = paragraph?.nextColumn();
        });

        return bottom;
    }
}