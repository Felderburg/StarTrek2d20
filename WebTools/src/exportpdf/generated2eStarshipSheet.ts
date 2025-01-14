import i18next from "i18next";
import { BaseNonForm2eSheet } from "./generated2eBaseSheet";
import { makeKey } from "../common/translationKey";
import { PDFDocument, PDFForm, PDFPage } from "@cantoo/pdf-lib";
import { Construct } from "../common/construct";
import { Starship } from "../common/starship";
import { XYLocation } from "../common/xyLocation";
import { SheetTag } from "./icharactersheet";
import { Paragraph } from "./paragraph";
import { FontSpecification } from "./fontSpecification";
import { SimpleColor } from "../common/colour";
import { System } from "../helpers/systems";
import { Department } from "../helpers/departments";
import { TALENT_NAME_MISSION_POD, TalentsHelper } from "../helpers/talents";
import { Column } from "./column";
import { FontOptions } from "./fontOptions";
import { FontType } from "./fontLibrary";
import { cardassianBrownColour2e, ferengiOrangeColour2e, greyColour2e, klingonRedColour2e, labelColourProvider, romulanGreenColour2e, tealColour2e } from "./colourProvider2e";
import { CharacterType } from "../common/characterType";
import { politySymbolArrowHead, politySymbolArrowHeadCommand, politySymbolCardassianSymbolInner, politySymbolCardassianSymbolOutline, politySymbolFederationLaurels, politySymbolFederationStarfield, politySymbolFerengiSymbol, politySymbolKlingonSymbol, politySymbolKlingonSymbolCircle, politySymbolRomulanSymbolBackground, politySymbolRomulanSymbolBird } from "./politySymbols";
import { ReadableTalentModel, TalentWriter } from "./talentWriter";
import { bullet2EWriter } from "./bullet2eWriter";

export class Generated2eStarshipSheet extends BaseNonForm2eSheet {

    static readonly sideBubblesOpen = "m 559.5048,680.4048 h 5.533 c 0.917,0 1.662,0.746 1.662,1.662 v 10.464 c 0,0.917 -0.745,1.662 -1.662,1.662 h -5.533 c -0.916,0 -1.662,-0.745 -1.662,-1.662 v -10.464 c 0,-0.916 0.746,-1.662 1.662,-1.662 m 0,-18.1846 h 5.533 c 0.917,0 1.662,-0.746 1.662,-1.662 v -13.025 c 0,-0.916 -0.745,-1.662 -1.662,-1.662 h -5.533 c -0.916,0 -1.662,0.746 -1.662,1.662 v 13.025 c 0,0.916 0.746,1.662 1.662,1.662";
    static readonly sideBubblesClosed = "m 559.505,664.1688 h 5.534 c 1.051,0 1.912,0.86 1.912,1.912 v 10.465 c 0,1.05 -0.861,1.912 -1.912,1.912 h -5.534 c -1.053,0 -1.912,-0.862 -1.912,-1.912 v -10.465 c 0,-1.052 0.859,-1.912 1.912,-1.912 m 0,45.4336 h 5.534 c 1.051,0 1.912,-0.861 1.912,-1.912 v -9.639 c 0,-1.051 -0.861,-1.912 -1.912,-1.912 h -5.534 c -1.053,0 -1.912,0.861 -1.912,1.912 v 9.639 c 0,1.051 0.859,1.912 1.912,1.912 m 0,11.852 h 5.534 c 1.051,0 1.912,-0.86 1.912,-1.912 v -6.331 c 0,-1.052 -0.861,-1.912 -1.912,-1.912 h -5.534 c -1.053,0 -1.912,0.86 -1.912,1.912 v 6.331 c 0,1.052 0.859,1.912 1.912,1.912";
    static readonly bottomDots = "m 508.491,766.488 c -1.828,0 -3.311,-1.481 -3.312,-3.311 0.001,-1.831 1.484,-3.313 3.312,-3.313 1.829,0 3.312,1.483 3.313,3.313 0,1.829 -1.484,3.311 -3.313,3.311 m 0,-5.808 h 0.001 v 0 h -0.001 z m -423.915,7.6998 c 0,1.829 -1.481,3.312 -3.311,3.313 -1.831,-0.001 -3.313,-1.484 -3.313,-3.313 0,-1.829 1.483,-3.311 3.313,-3.312 1.829,0 3.311,1.483 3.311,3.312 m -5.808,0 h 0.001 v -0.001 h -0.001 z";
    static readonly cornerDecoration = "m 228.401,-15.305 19.12,19.12 c 4.34,4.34 12.864,7.871 19.002,7.871 h 251.115 c 2.359,0 5.513,1.306 7.182,2.975 l 5.594,5.594 c 4.341,4.341 12.865,7.872 19.003,7.872 h 78.37818";
    static readonly mainBorder = "m 53.798,63.6928 c -5.977,0 -10.839,4.862 -10.839,10.839 v 646.833 c 0,2.895 1.128,5.617 3.175,7.664 2.047,2.047 4.769,3.174 7.664,3.174 l 508.61,-0.01 c 5.976,0 10.839,-4.862 10.839,-10.839 v -76.298 c 0,-3.197 -1.802,-7.676 -4.015,-9.983 l -6.712,-6.995 c -4.406,-4.591 -7.99,-13.502 -7.991,-19.866 l -0.049,-533.68 c -10e-4,-5.977 -4.864,-10.839 -10.84,-10.839 z";

    static readonly starshipStatFrame = "M 2.835,0 C 1.269,0 0,1.269 0,2.835 V 9 c 0,1.565 1.269,2.835 2.835,2.835 h 66.567 c 1.565,0 2.835,-1.27 2.835,-2.835 V 2.835 C 72.237,1.269 70.967,0 69.402,0 Z"

    getName(): string {
        return i18next.t(makeKey('Sheet.', "Generated2eStarshipSheet"),
            { "defaultValue": "New 2nd Ed.-style Starship Sheet (US Letter)"});
    }
    getThumbnailUrl(): string {
        return '/static/img/sheets/STA_2e_Starship_Sheet.png'
    }
    getPdfUrl(): string {
        return "/static/pdf/STA_2e_Starship_Sheet.pdf";
    }

    getTags(): SheetTag[] {
        return [ SheetTag.Portrait, SheetTag.Style2e, SheetTag.LanguageSupport, SheetTag.TalentText, SheetTag.UsLetter ];
    }

    get nameColumn() {
        return new Column(75, 48, 15, 550-75);
    }

    writeStarshipName(page: PDFPage, starship: Starship, colour: SimpleColor) {
        if (starship.name?.length) {
            let name = starship.name;
            if (starship.registry?.length) {
                name += " (" + starship.registry + ")";
            }
            this.writeName(page, name, colour);
        } else {
            this.writeName(page, i18next.t('ViewPage.unnamedStarship'), colour);
        }
    }

    // if we can stick the three stats together, then we should do so
    writeThreeColumnDerivedStats(page: PDFPage, starship: Starship, previousParagraph: Paragraph, colour: SimpleColor) {
        let resistanceParagraph = previousParagraph.nextParagraph(1);
        resistanceParagraph.append(i18next.t("Construct.other.resistance").toLocaleUpperCase() + ": ", new FontSpecification(this.boldFont, 9),
            colour);
        resistanceParagraph.append(starship.resistance, new FontSpecification(this.textFont, 9));

        let scaleParagraph = previousParagraph.nextParagraph(1);
        scaleParagraph.append(i18next.t("Construct.other.scale").toLocaleUpperCase() + ": ", new FontSpecification(this.boldFont, 9),
            colour);
        scaleParagraph.append(starship.scale, new FontSpecification(this.textFont, 9));

        let crewParagraph = previousParagraph.nextParagraph(1);
        crewParagraph.append(i18next.t("Construct.other.crewSupport").toLocaleUpperCase() + ": ", new FontSpecification(this.boldFont, 9),
            colour);
        crewParagraph.append(starship.crewSupport, new FontSpecification(this.textFont, 9));

        if (resistanceParagraph.lines.length === 1 && scaleParagraph.lines.length === 1 && crewParagraph.lines.length === 1
            && (resistanceParagraph.lines[0].width + scaleParagraph.lines[0].width + crewParagraph.lines[0].width + 30 < previousParagraph.column.width)) {

            let availableMiddleSpace = previousParagraph.column.width - resistanceParagraph.lines[0].width - crewParagraph.lines[0].width;
            let centreX = resistanceParagraph.lines[0].width + (availableMiddleSpace / 2) - (scaleParagraph.lines[0].width / 2);
            let endX = previousParagraph.column.width - (crewParagraph.lines[0].width);

            resistanceParagraph.write();

            let x = scaleParagraph.lines[0].bottom().x + centreX;
            let y = scaleParagraph.lines[0].bottom().y;
            scaleParagraph.lines[0].blocks.forEach(textBlock => {
                textBlock.writeToPage(x, y, page, SimpleColor.from("#000000"));
                x += textBlock.width;
            });

            x = crewParagraph.lines[0].bottom().x + endX;
            y = crewParagraph.lines[0].bottom().y;
            crewParagraph.lines[0].blocks.forEach(textBlock => {
                textBlock.writeToPage(x, y, page, SimpleColor.from("#000000"));
                x += textBlock.width;
            });

            return crewParagraph.bottom;
        } else {
            resistanceParagraph.write();

            scaleParagraph = resistanceParagraph.nextParagraph(0);
            scaleParagraph.append(i18next.t("Construct.other.scale").toLocaleUpperCase() + ": ", new FontSpecification(this.boldFont, 9),
                colour);
            scaleParagraph.append(starship.scale, new FontSpecification(this.textFont, 9));
            scaleParagraph.write();

            let crewParagraph = scaleParagraph.nextParagraph(0);
            crewParagraph.append(i18next.t("Construct.other.crewSupport").toLocaleUpperCase() + ": ", new FontSpecification(this.boldFont, 9),
                colour);
            crewParagraph.append(starship.crewSupport, new FontSpecification(this.textFont, 9));
            crewParagraph.write();

            return crewParagraph.bottom;
        }
    }

    firstColumn(additionalPage: PDFPage, pdf: PDFDocument) {
        const column4 = new Column(538.5 - (284.7-56.7), 78.5, 715-78.5, 284.7-56.7);
        const column3 = new Column(56.7, 78.5, 715-78.5, 284.7-56.7, column4);

        const column2 = new Column(538.5 - (284.7-56.7), 225, 715-225, 284.7-56.7,
            () => {
                const page = pdf.addPage(additionalPage);
                return {
                    page: page,
                    column: column3
                }
            });
        const column1 = new Column(56.7, 225, 715-225, 284.7-56.7, column2);

        return column1;
    }

    async populate(pdf: PDFDocument, construct: Construct) {
        await super.populate(pdf, construct);

        let starship = construct as Starship;
        let page = pdf.getPage(0);

        const colour = this.deriveSheetColour(construct);
        this.drawSheetDecorations(page, colour);

        this.writeStarshipName(page, starship, colour);

        const [ secondPage ] = await pdf.copyPages(pdf, [0]);
        const column = this.firstColumn(secondPage, pdf);

        const { SheetOutlineOptions, SpaceframeOutline } = await import(/* webpackChunkName: 'spaceframeOutline' */ "../helpers/spaceframeOutlineHelper");
        SpaceframeOutline.draw(pdf, new SheetOutlineOptions(new XYLocation(56.7, 80), colour.asPdfRbg(), 1.2, 1.2), starship);
        this.drawArrowHead(page, construct, colour);

        let paragraph = new Paragraph(page, column, this.fonts);
        paragraph.append(i18next.t("Construct.other.launchYear").toLocaleUpperCase() + ": ", new FontSpecification(this.boldFont, 9),
            colour);
        paragraph.append("" + (starship.spaceframeModel?.serviceYear ?? (starship.serviceYear ?? "")), new FontSpecification(this.textFont, 9));
        paragraph.write();

        paragraph = paragraph.nextParagraph(1);

        paragraph.append(i18next.t("Construct.other.timeline").toLocaleUpperCase() + ": ", new FontOptions(9, FontType.Bold),
            colour);
        paragraph.append("" + (starship.serviceYear), new FontOptions(9));
        if (starship.spaceframeModel?.serviceYear != null && starship.serviceYear != null) {
            let yearsOfService = i18next.t("Construct.other.yearsOfService", {
                count: (Math.max(0, starship.serviceYear -  starship.spaceframeModel.serviceYear)),
                interpolation: { escapeValue: false }
            });
            let numberOfRefits = i18next.t("Construct.other.numberOfRefits", {
                count: starship.numberOfRefits,
                interpolation: { escapeValue: false }
            });

            paragraph.append("(" + yearsOfService + ", " + numberOfRefits + ")", new FontOptions(9));
        }
        paragraph.write();

        if (starship.className?.length && starship.version === 1) {
            paragraph = paragraph.nextParagraph(1);

            paragraph.append(i18next.t("Construct.other.spaceFrame").toLocaleUpperCase() + ": ", new FontOptions(9, FontType.Bold),
                colour);
            if (starship.spaceframeModel != null) {
                paragraph.append(starship.spaceframeModel?.localizedName, new FontOptions(9));
            } else {
                paragraph.append(starship.className, new FontOptions(9));
            }
            paragraph.write();
        }

        if (starship.missionProfileStep?.type != null) {
            paragraph = paragraph.nextParagraph(1);

            paragraph.append(i18next.t("Construct.other.missionProfile").toLocaleUpperCase() + ": ", new FontOptions(9, FontType.Bold),
                colour);
            paragraph.append(starship.missionProfileStep?.type?.localizedName, new FontOptions(9));
            paragraph.write();
        }

        paragraph = paragraph.nextParagraph(1);

        paragraph.append(i18next.t("Construct.other.traits").toLocaleUpperCase() + ": ", new FontOptions(9, FontType.Bold),
            colour);
        paragraph.append(starship.getAllTraits(), new FontOptions(9));
        paragraph.write();

        let bottom = this.writeThreeColumnDerivedStats(page, starship, paragraph, colour);

        let statFontSize = this.determineFontSizeForWidth(this.determineAllStatLabels(starship), 72.2 * 0.8 - 2);

        this.writeSubTitle(page, i18next.t("Construct.other.systems"), new Column(bottom.x, bottom.y + 16,
            13, column.width));

        let systemsBoxes = new XYLocation(bottom.x, bottom.y + 16 + 13 + 4);
        // these sheets use an unusual order
        [System.Comms, System.Engines, System.Structure, System.Computer, System.Sensors, System.Weapons].forEach((s, i) => {

            let location = new XYLocation(systemsBoxes.x + i % 3 * 77.9, systemsBoxes.y + Math.floor(i / 3) * 15.4);
            let x = location.x;
            const y = page.getHeight() - location.y;
            page.moveTo(x, y);
            page.drawSvgPath(Generated2eStarshipSheet.starshipStatFrame, {
                borderColor: SimpleColor.from("#979696").asPdfRbg(),
                borderWidth: 0.5
            });

            let column = new Column(x, location.y, 11.8, 72.2 * 0.8);
            this.writeLabel(page, i18next.t(makeKey("Construct.system.", System[s])), column, new FontSpecification(this.boldFont, statFontSize),
                tealColour2e);

            this.writeLabel(page, "" + starship.getSystemValue(s), this.valueBlock(column), new FontSpecification(this.boldFont, statFontSize),
                tealColour2e);

        });

        this.writeSubTitle(page, i18next.t("Construct.other.departments"), new Column(systemsBoxes.x, systemsBoxes.y + 15.4 * 2 + 16,
            13, column.width));
        let departmentBoxes = new XYLocation(systemsBoxes.x, systemsBoxes.y + 15.4 * 2 + 16 + 13 + 4);

        // these sheets use an unusual order
        [Department.Command, Department.Engineering, Department.Medicine, Department.Conn, Department.Security, Department.Science].forEach((d, i) => {

            let location = new XYLocation(departmentBoxes.x + i % 3 * 77.9, departmentBoxes.y + Math.floor(i / 3) * 15.4);
            let x = location.x;
            const y = page.getHeight() - location.y;
            page.moveTo(x, y);
            page.drawSvgPath(Generated2eStarshipSheet.starshipStatFrame, {
                borderColor: SimpleColor.from("#979696").asPdfRbg(),
                borderWidth: 0.5
            });

            let column = new Column(x, location.y, 11.8, 72.2 * 0.8);
            const key = makeKey("Construct.department.", Department[d]);
            this.writeLabel(page,i18next.t(key), column, new FontSpecification(this.boldFont, statFontSize),
                labelColourProvider(construct.era, key));

            this.writeLabel(page, "" + starship.departments[d], this.valueBlock(column), new FontSpecification(this.boldFont, statFontSize),
                labelColourProvider(construct.era, key));
        });

        let attacksArea = new XYLocation(departmentBoxes.x, departmentBoxes.y + 15.4 * 2 + 16);
        this.writeSubTitle(page, i18next.t("Construct.other.attacks"), new Column(attacksArea.x, attacksArea.y,
            13, column.width));

        let remainingColumn = this.writeAttacks(page, starship,
            column.bottomAfter(
                (attacksArea.y + 13 + 4) - column.start.y), colour);

        this.writeSubTitle(page, i18next.t("Construct.other.shields"), remainingColumn.bottomAfter(16).topBefore(13));
        remainingColumn = remainingColumn.bottomAfter(16 + 13 + 4);
        let bottomOfShields = this.writeShieldsBoxes(page, pdf.getForm(), starship, remainingColumn);

        remainingColumn = remainingColumn.bottomAfter(bottomOfShields.y - remainingColumn.start.y).bottomAfter(16);
        this.writeSubTitle(page, i18next.t("Construct.other.talents"), remainingColumn);

        let talentsColumn = remainingColumn.bottomAfter(13 + 4);

        let finalColumn = await this.writeTalents(page, starship, talentsColumn, colour);

        if (this.hasSpecialRules(starship) && finalColumn) {
            if (finalColumn.height <= 50 && finalColumn.isNextColumnAvailable) {
                let newColumn = finalColumn.advanceToNextColumn(page);
                page = newColumn.page;
                finalColumn = newColumn.column;
            } else {
                finalColumn = finalColumn.bottomAfter(16);
            }
            if (finalColumn.height > 50) {
                this.writeSubTitle(page, i18next.t("Construct.other.specialRules"), finalColumn);
                await this.writeSpecialRules(page, starship, finalColumn.bottomAfter(13 + 4), colour);
            }
        }
    }

    drawArrowHead(page: PDFPage, construct: Construct, colour: SimpleColor) {
        if (construct.type === CharacterType.Starfleet) {

            page.moveTo(513.5, page.getHeight() - 185.9);

            page.drawSvgPath(politySymbolArrowHead, {
                borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
                color: SimpleColor.from("#ffffff").asPdfRbg(),
                borderWidth: 1,
                scale: 0.6
            });

            page.drawSvgPath(politySymbolArrowHeadCommand, {
                borderColor: colour.asPdfRbg(),
                color: colour.asPdfRbg(),
                borderWidth: 0,
                scale: 0.6
            });
        } else if (construct.type === CharacterType.KlingonWarrior || (construct as Starship).spaceframeModel?.type === CharacterType.KlingonWarrior) {
            page.moveTo(513.5, page.getHeight() - 185.9);

            page.drawSvgPath(politySymbolKlingonSymbolCircle, {
                borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
                color: SimpleColor.from("#ffffff").asPdfRbg(),
                borderWidth: 1,
                scale: 0.6
            });

            page.drawSvgPath(politySymbolKlingonSymbol, {
                borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
                color: colour.asPdfRbg(),
                borderWidth: 0,
                scale: 0.6
            });

        } else if (construct.type === CharacterType.Cardassian) {
            page.moveTo(513.5, page.getHeight() - 185.9);

            page.drawSvgPath(politySymbolCardassianSymbolInner, {
                borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
                color: colour.asPdfRbg(),
                borderWidth: 0,
                scale: 0.6
            });

            page.drawSvgPath(politySymbolCardassianSymbolOutline, {
                borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
                color: Generated2eStarshipSheet.greyColour.asPdfRbg(),
                borderWidth: 0,
                scale: 0.6
            });

        } else if (construct.type === CharacterType.Romulan) {
            page.moveTo(499.5, page.getHeight() - 187.9);

            page.drawSvgPath(politySymbolRomulanSymbolBackground, {
                borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
                color: colour.asPdfRbg(),
                borderWidth: 0,
                scale: 0.6
            });

            page.drawSvgPath(politySymbolRomulanSymbolBird, {
                borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
                color: colour.asPdfRbg(),
                borderWidth: 0,
                scale: 0.6
            });

        } else if (construct.type === CharacterType.Civilian) {
            page.moveTo(499.5, page.getHeight() - 187.9);

            page.drawSvgPath(politySymbolFederationLaurels, {
                borderColor: greyColour2e.asPdfRbg(),
                color: greyColour2e.asPdfRbg(),
                borderWidth: 0,
                scale: 0.6
            });

            page.drawSvgPath(politySymbolFederationStarfield, {
                borderColor: greyColour2e.asPdfRbg(),
                color: greyColour2e.asPdfRbg(),
                borderWidth: 0,
                scale: 0.6
            });

        } else if (construct.type === CharacterType.Ferengi) {
            page.moveTo(509.5, page.getHeight() - 191.9);

            page.drawSvgPath(politySymbolFerengiSymbol, {
                borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
                color: colour.asPdfRbg(),
                borderWidth: 0,
                scale: 0.6
            });
        }
    }

    deriveSheetColour(construct: Construct) {
        if (construct.type === CharacterType.Starfleet) {
            return tealColour2e;
        } else if (construct.type === CharacterType.KlingonWarrior || (construct as Starship).spaceframeModel?.type === CharacterType.KlingonWarrior) {
            return klingonRedColour2e;
        } else if (construct.type === CharacterType.Romulan) {
            return romulanGreenColour2e;
        } else if (construct.type === CharacterType.Cardassian) {
            return cardassianBrownColour2e;
        } else if (construct.type === CharacterType.Ferengi) {
            return ferengiOrangeColour2e;
        } else {
            return tealColour2e;
        }
    }

    drawSheetDecorations(page: PDFPage, colour: SimpleColor) {
        page.moveTo(0, page.getHeight());

        page.drawSvgPath(Generated2eStarshipSheet.sideBubblesOpen, {
            borderColor: colour.asPdfRbg(),
            borderWidth: 0.5
        });

        page.drawSvgPath(Generated2eStarshipSheet.sideBubblesClosed, {
            borderColor: colour.asPdfRbg(),
            color: colour.asPdfRbg(),
            borderWidth: 0.5
        });

        page.drawSvgPath(Generated2eStarshipSheet.bottomDots, {
            borderColor: colour.asPdfRbg(),
            color: colour.asPdfRbg(),
            borderWidth: 0
        });

        page.drawSvgPath(Generated2eStarshipSheet.mainBorder, {
            borderColor: colour.asPdfRbg(),
            borderWidth: 1
        });

        page.drawSvgPath(Generated2eStarshipSheet.cornerDecoration, {
            borderColor: colour.asPdfRbg(),
            borderWidth: 1
        });
    }


    hasSpecialRules(starship: Starship) {
        return starship.getDistinctTalentNameList().map(t => TalentsHelper.getTalent(t)).filter(t => t.specialRule).length > 0;
    }

    writeShieldsBoxes(page: PDFPage, form: PDFForm, starship: Starship, column: Column) {
        let stressBox = "m 1,0 h 7.5 c 0.554,0 1,0.446 1,1 v 7.5 c 0,0.554 -0.446,1 -1,1 H 1 C 0.446,9.5 0,9.054 0,8.5 V 1 C 0,0.446 0.446,0 1,0 Z";

        let x = column.translatedStart(page).x;
        let y = column.translatedStart(page).y;
        for (let i = 0; i < starship.shields; i++) {

            page.moveTo(x, y);
            page.drawSvgPath(stressBox, {
                borderColor: SimpleColor.from("#000000").asPdfRbg(),
                borderWidth: 0.5
            });

            let checkbox = form.createCheckBox("Shield " + (i+1));
            checkbox.addToPage(page, {
                x: x + 0.5,
                y: y - 9,
                width: 8.5,
                height: 8.5,
                textColor: SimpleColor.from("#000000").asPdfRbg(),
                borderWidth: 0
            });

            x += 12;
            if (i % 15 === 14) {
                x = column.translatedStart(page).x;
                y -= 12;
            } else if (i % 5 === 4) {
                x += 10;
            }
        }

        return column.untranslateLocation(page, new XYLocation(column.translatedStart(page).x, y -= 12));
    }

    async writeTalents(page: PDFPage, starship: Starship, column: Column, colour: SimpleColor) {
        let talents = [];

        let paragraph = new Paragraph(page, column, this.fonts);
        for (let t of starship.getDistinctTalentNameList()) {

            if (paragraph) {
                paragraph.indent(15);
                const talent = TalentsHelper.getTalent(t);
                if (!talent.specialRule) {
                    let readableTalent = new ReadableTalentModel(starship.type, talent);
                    talents.push(readableTalent);
                    if (talent && talent.maxRank > 1) {
                        let rank = starship.getRankForTalent(t);
                        readableTalent.rank = rank;
                    }

                    if (talent.name === TALENT_NAME_MISSION_POD && starship.missionPodModel) {
                        readableTalent.missionPod = starship.missionPodModel;
                    }
                }
            }
        };

        let writer = new TalentWriter(page, this.fonts, starship.version, colour, true);
        return await writer.writeTalents(talents, column, 9, 9, 15,
            (p) => bullet2EWriter(p.page, p, colour));
    }

    async writeSpecialRules(page: PDFPage, starship: Starship, column: Column, colour: SimpleColor) {
        let talents = [];
        let paragraph = new Paragraph(page, column, this.fonts);
        for (let t of starship.getDistinctTalentNameList()) {

            if (paragraph) {
                paragraph.indent(15);
                const talent = TalentsHelper.getTalent(t);
                if (talent.specialRule) {
                    let readableTalent = new ReadableTalentModel(starship.type, talent);
                    talents.push(readableTalent);
                    if (talent && talent.maxRank > 1) {
                        let rank = starship.getRankForTalent(t);
                        readableTalent.rank = rank;
                    }

                    if (talent.name === TALENT_NAME_MISSION_POD && starship.missionPodModel) {
                        readableTalent.missionPod = starship.missionPodModel;
                    }
                }
            }
        };

        let writer = new TalentWriter(page, this.fonts, starship.version, colour, true);
        return await writer.writeTalents(talents, column, 9, 9, 15,
            (p) => bullet2EWriter(p.page, p, colour));
    }
}