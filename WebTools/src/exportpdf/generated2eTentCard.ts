import { degrees, PDFDocument, PDFPage } from "@cantoo/pdf-lib";
import { BaseNonForm2eSheet } from "./generated2eBaseSheet";
import { SheetTag } from "./icharactersheet";
import i18next from "i18next";
import { makeKey } from "../common/translationKey";
import { AttributesHelper } from "../helpers/attributes";
import { SkillsHelper } from "../helpers/skills";
import { Character, Division } from "../common/character";
import { Construct } from "../common/construct";
import { Column } from "./column";
import { FontType } from "./fontLibrary";
import { divisionColour2e, greyColour2e, klingonRedColour2e, labelColourProvider, tealColour2e } from "./colourProvider2e";
import { labelWriter, simpleLabelWriter, VerticalAlignment } from "./labelWriter";
import { TextAlign } from "./textAlign";
import { Paragraph } from "./paragraph";
import { FontOptions } from "./fontOptions";
import { WeaponDescriber } from "./weaponDescriber";
import { bullet2EWriter } from "./bullet2eWriter";
import { assembleWritableItems } from "./generatedsheet";
import { ReadableTalentModel } from "./talentWriter";
import { TextBlock } from "./textBlock";
import { FontSpecification } from "./fontSpecification";
import { SimpleColor } from "../common/colour";
import { determineIdealFontWidth } from "./fontWidthDeterminer";
import { CharacterType } from "../common/characterType";
import { politySymbolArrowHead, politySymbolArrowHeadCommand, politySymbolArrowHeadOperations, politySymbolArrowHeadScience, politySymbolFederationLaurels, politySymbolFederationStarfield, politySymbolKlingonSymbol, politySymbolKlingonSymbolCircle } from "./politySymbols";

export class BasicGeneratedTentCardCharacterSheet extends BaseNonForm2eSheet {

    firstBlock: Column = new Column(20.2, 255.2, 165.3, 158.9);
    secondBlock: Column = new Column(468.8, 220.4, 177.6, 146.7);
    thirdBlock: Column = new Column(629.9, 220.4, 177.6, 146.7);

    rankColumn: Column = new Column(147.8, 133.7, 43.1, 495.7);
    frontNameColumn: Column = new Column(147.8, 73.9, 55.1, 495.7);
    pronounsNameColumn: Column = new Column(147.8, 26.1, 55.1, 495.7);

    namePath = `M -6.144e-5,0 H 182.93826 c 6.45504,0 11.69568,5.24064 11.69568,11.69568 v 7.70136 c 0,6.45576 -5.24064,11.69496 -11.69568,11.69496 H -6.144e-5 Z`;

    getName(): string {
        return i18next.t(makeKey('Sheet.', "BasicGeneratedTentCardCharacterSheet"),
            { "defaultValue": "Basic 2nd Ed. Tent Card (US Letter)"});
    }
    getThumbnailUrl(): string {
        return '/static/img/sheets/STA_2e_TentCard.png'
    }
    getPdfUrl(): string {
        return "/static/pdf/STA_2e_TentCard.pdf";
    }

    getTags(): SheetTag[] {
        return [ SheetTag.Style2e, SheetTag.LanguageSupport, SheetTag.UsLetter ];
    }

    async populate(pdf: PDFDocument, construct: Construct) {
        await super.populate(pdf, construct);
        const page = pdf.getPage(0);
        let character = construct as Character;

        this.writeFront(page, character);
        this.writeValues(page, character);
        this.writeStatBoxes(page, character);
        this.writeFocuses(page, character);
        this.writeTalents(page, character);
        this.writeCharacterName(page, character);

        this.drawArrowHead(page, character, divisionColour2e(character.era, character.division));
    }

    writeStatBoxes(page: PDFPage, character: Character) {

        this.writeSubTitle(page, i18next.t("Construct.other.attributes"), new Column(211.6, 220.4, 13, 241.2))
        this.writeSubTitle(page, i18next.t("Construct.other.departments"), new Column(211.6, 300.7, 13, 241.2))

        let columns = {
            "Construct.attribute.control": new Column(211.6, 235.4, 18.1, 60),
            "Construct.attribute.daring": new Column(211.6, 260.2, 18.1, 60),
            "Construct.attribute.fitness": new Column(294.6, 235.4, 18.1, 60),
            "Construct.attribute.insight": new Column(294.6, 260.2, 18.1, 60),
            "Construct.attribute.presence": new Column(377.6, 235.4, 18.1, 60),
            "Construct.attribute.reason": new Column(377.6, 260.2, 18.1, 60),

            "Construct.discipline.command": new Column(211.6, 315.7, 18.1, 60),
            "Construct.discipline.conn": new Column(211.6, 340.5, 18.1, 60),
            "Construct.discipline.engineering": new Column(294.6, 315.7, 18.1, 60),
            "Construct.discipline.security": new Column(294.6, 340.5, 18.1, 60),
            "Construct.discipline.medicine": new Column(377.6, 315.7, 18.1, 60),
            "Construct.discipline.science": new Column(377.6, 340.5, 18.1, 60),
        }

        labelWriter(page, columns, character.version,
            this.fonts.fontByType(FontType.Bold), 9.5, ((label) => labelColourProvider(character.era, label)),
            TextAlign.Right, "", VerticalAlignment.Middle);


        Object.keys(columns).forEach(key => {
            const colour = labelColourProvider(character.era, key);
            const column = columns[key];
            const valueColumn = new Column(column.start.x + column.width, column.start.y, column.height, 15.1);

            let text = "";
            if (key.includes("Construct.attribute.")) {
                let attribute = AttributesHelper.getAttributeByName(key.substring("Construct.attribute.".length));
                text = "" + character.attributes[attribute];
            }

            if (key.includes("Construct.discipline.")) {
                let department = SkillsHelper.getSkillByName(key.substring("Construct.discipline.".length));
                text = "" + character.departments[department];
            }

            simpleLabelWriter(page, text, valueColumn, this.fonts.fontByType(FontType.Bold), 9.5, colour,
                TextAlign.Centre, VerticalAlignment.Middle);
        });
    }

    writeTalents(page: PDFPage, character: Character) {
        const bold = new FontOptions(10, FontType.Bold);
        const standard = new FontOptions(10);

        let paragraph = new Paragraph(page, this.thirdBlock, this.fonts);
        paragraph.append(i18next.t('Construct.other.talents') + ":", bold);
        paragraph?.write();

        const items = assembleWritableItems(character);
        items.forEach(talent => {
            if (talent instanceof ReadableTalentModel) {
                paragraph = paragraph?.nextParagraph();

                let talentName = talent.talent.localizedDisplayName;
                if (talent && talent.talent.maxRank > 1) {
                    let rank = talent.rank;
                    talentName = i18next.t("Talent.text.rank", {talentName: talentName, rank: rank});
                }

                paragraph?.indent(15);
                paragraph?.append(talentName, standard);
                paragraph?.write();
                if (paragraph?.lines?.length) {
                    bullet2EWriter(page, paragraph, tealColour2e);
                }
            }
        });
    }

    writeValues(page: PDFPage, character: Character) {
        const bold = new FontOptions(10, FontType.Bold);
        const standard = new FontOptions(10);

        let paragraph = new Paragraph(page, this.firstBlock, this.fonts);
        paragraph.append(i18next.t('Construct.other.traits') + ":", bold);
        paragraph.append(character.getAllTraits(), standard);
        paragraph.write();

        paragraph = paragraph?.nextParagraph(0.8);
        paragraph?.append(i18next.t('Construct.other.values') + ":", bold);
        paragraph?.write();

        let values = character.values;
        values.forEach(value => {
            paragraph = paragraph?.nextParagraph();

            paragraph?.indent(15);
            paragraph?.append(value, standard);
            paragraph?.write();
            if (paragraph?.lines?.length) {
                bullet2EWriter(page, paragraph, tealColour2e);
            }
        });
    }

    writeFocuses(page: PDFPage, character: Character) {
        const bold = new FontOptions(10, FontType.Bold);
        const standard = new FontOptions(10);

        let paragraph = new Paragraph(page, this.secondBlock, this.fonts);
        paragraph.append(i18next.t('Construct.other.focuses') + ":", bold);
        paragraph.append(character.focuses.join(", "), standard);
        paragraph.write();

        if (character.pastime?.length) {
            paragraph = paragraph?.nextParagraph();
            paragraph?.append(i18next.t('Construct.other.pastimes') + ":", bold);
            paragraph?.append(character.pastime?.join(", "), standard);
            paragraph?.write();
        }

        paragraph = paragraph?.nextParagraph(0.8);
        if (paragraph != null) {

            paragraph.append(i18next.t('Construct.other.attacks') + ":", bold);
            paragraph.write();

            character.determineWeapons().forEach((w, index) => {
                const text = new WeaponDescriber(character.version, false).describeFully(w, character);
                paragraph = paragraph?.nextParagraph(index === 0 ? 0.5 : 0);
                if (paragraph != null) {

                    paragraph?.indent(15);
                    paragraph?.append(w.description + ": ", bold);
                    paragraph?.append(text, standard);
                    paragraph?.write();

                    if (paragraph?.lines?.length) {
                        bullet2EWriter(page, paragraph, tealColour2e);
                    }
                }
            });
        }
    }

    writeFront(page: PDFPage, character: Character) {

        let divisionColour = divisionColour2e(character.era, character.division);
        let fontSize = determineIdealFontWidth([character.name?.toLocaleUpperCase()], this.frontNameColumn.width,
            55, 25, this.fonts.fontByType(FontType.Bold));

        let nameBlock = TextBlock.create(character.name?.toLocaleUpperCase() ?? "",
            new FontSpecification(this.fonts.fontByType(FontType.Bold), fontSize), false);
        nameBlock.writeToPage(
            this.frontNameColumn.end.x - ((this.frontNameColumn.width - nameBlock.width) / 2),
            page.getHeight() - this.frontNameColumn.start.y,
            page, SimpleColor.from("#000000"),
            degrees(180));

        if (character.rank?.localizedName != null) {
            let rankBlock = TextBlock.create(character.rank?.localizedName?.toLocaleUpperCase() ?? "",
                new FontSpecification(this.fonts.fontByType(FontType.Bold), 35), false);
            rankBlock.writeToPage(
                this.rankColumn.end.x - ((this.rankColumn.width - rankBlock.width) / 2),
                page.getHeight() - this.rankColumn.start.y,
                page, divisionColour,
                degrees(180));
        }

        if (character.pronouns?.length) {
            let pronounsBlock = TextBlock.create(character.pronouns ?? "",
                new FontSpecification(this.fonts.fontByType(FontType.Bold), 30), false);
            pronounsBlock.writeToPage(
                this.pronounsNameColumn.end.x - ((this.pronounsNameColumn.width - pronounsBlock.width) / 2),
                page.getHeight() - this.pronounsNameColumn.start.y,
                page, greyColour2e,
                degrees(180));
        }
    }

    writeCharacterName(page: PDFPage, character: Character) {
        page.moveTo(0, page.getHeight() - 216.5);
        page.drawSvgPath(this.namePath, {
            borderColor: greyColour2e.asPdfRbg(),
            color: tealColour2e.asPdfRbg(),
            borderWidth: 0,
            scale: 1
        });

        let name = i18next.t("Construct.other.unnamedCharacter");
        if (character.name?.length) {
            name = character.name;
            let rank = character.rank?.localizedAbbreviation;
            if (rank) {
                name = rank + " " + name;
            }
        }

        name = name.toLocaleUpperCase();

        const column = new Column(20.2, 219.1, 25.5, 164.1);
        const fontSize = determineIdealFontWidth([ name ], column.width, 14, 8, this.fonts.fontByType(FontType.Bold));

        simpleLabelWriter(page, name, column, this.fonts.fontByType(FontType.Bold), fontSize,
            SimpleColor.from("#ffffff"), TextAlign.Left, VerticalAlignment.Middle);
    }

    drawArrowHead(page: PDFPage, character: Character, colour: SimpleColor) {
        if (character.type === CharacterType.Starfleet || character.type === CharacterType.Cadet) {

            const division = character.division;
            if (division != null) {
                page.moveTo(30.9 + 102.7, page.getHeight() - (41.5 + 121.7));

                page.drawSvgPath(politySymbolArrowHead, {
                    borderColor: greyColour2e.asPdfRbg(),
                    color: SimpleColor.from("#ffffff").asPdfRbg(),
                    borderWidth: 1,
                    scale: 2.5,
                    rotate: degrees(180)

                });

                if (division === Division.Command) {
                    page.drawSvgPath(politySymbolArrowHeadCommand, {
                        borderColor: greyColour2e.asPdfRbg(),
                        color: colour.asPdfRbg(),
                        borderWidth: 0,
                        scale: 2.5,
                        rotate: degrees(180)

                    });
                } else if (division === Division.Science) {
                    page.drawSvgPath(politySymbolArrowHeadScience, {
                        borderColor: SimpleColor.from("#ffffff").asPdfRbg(),
                        color: colour.asPdfRbg(),
                        borderWidth: 0,
                        scale: 2.5,
                        rotate: degrees(180)

                    });
                } else if (division === Division.Operations) {
                    page.drawSvgPath(politySymbolArrowHeadOperations, {
                        borderColor: SimpleColor.from("#ffffff").asPdfRbg(),
                        color: colour.asPdfRbg(),
                        borderWidth: 0,
                        scale: 2.5,
                        rotate: degrees(180)

                    });
                }
            }

        } else if (character.isKlingonImperialCitizen) {
            page.moveTo(30.9 + 102.7, page.getHeight() - (41.5 + 121.7));

            page.drawSvgPath(politySymbolKlingonSymbolCircle, {
                borderColor: SimpleColor.from("#000000").asPdfRbg(),
                color: SimpleColor.from("#000000").asPdfRbg(),
                borderWidth: 1,
                scale: 2.5,
                rotate: degrees(180)
            });

            page.drawSvgPath(politySymbolKlingonSymbol, {
                borderColor: greyColour2e.asPdfRbg(),
                color: klingonRedColour2e.asPdfRbg(),
                borderWidth: 0,
                scale: 2.5,
                rotate: degrees(180)
            });
        } else if (character.type === CharacterType.Civilian || character.type === CharacterType.Child
                || character.type === CharacterType.AmbassadorDiplomat) {
            page.moveTo(30.9 + 102.7, page.getHeight() - (41.5 + 121.7));

            page.drawSvgPath(politySymbolFederationLaurels, {
                borderColor: greyColour2e.asPdfRbg(),
                color: greyColour2e.asPdfRbg(),
                scale: 2,
                rotate: degrees(180)
            });

            page.drawSvgPath(politySymbolFederationStarfield, {
                borderColor: greyColour2e.asPdfRbg(),
                color: greyColour2e.asPdfRbg(),
                scale: 2,
                rotate: degrees(180)
            });
        }
    }
}