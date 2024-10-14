import { PDFPage } from "@cantoo/pdf-lib";
import { FontLibrary, FontType } from "./fontLibrary";
import { SimpleColor } from "../common/colour";
import { TALENT_NAME_BORG_IMPLANTS, TALENT_NAME_MISSION_POD, TALENT_NAME_UNTAPPED_POTENTIAL, TalentModel } from "../helpers/talents";
import { RoleModel } from "../helpers/roles";
import { SpeciesAbility } from "../helpers/speciesAbility";
import { Column } from "./column";
import { CharacterType } from "../common/characterType";
import { Implant } from "../helpers/borgImplant";
import { Attribute } from "../helpers/attributes";
import { MissionPodModel } from "../helpers/missionPods";
import { FontOptions } from "./fontOptions";
import { Paragraph } from "./paragraph";
import i18next from "i18next";
import { makeKey } from "../common/translationKey";

export class ReadableTalentModel {
    characterType: CharacterType;
    rank: number;
    talent: TalentModel;
    implants: Implant[];
    attribute: Attribute;
    missionPod: MissionPodModel;

    constructor(characterType: CharacterType, talent: TalentModel) {
        this.characterType = characterType;
        this.talent = talent;
    }
}

export class TalentWriter {

    page: PDFPage;
    fonts: FontLibrary;
    headingColour: SimpleColor;
    version: number;
    capitalizeName: boolean;
    nextPageHandler: () => Promise<Column>


    constructor(page: PDFPage, fonts: FontLibrary, version: number = 1, headingColour: SimpleColor = SimpleColor.from("#000000"),
            capitalizeName: boolean = false) {
        this.page = page;
        this.fonts = fonts;
        this.version = version;
        this.headingColour = headingColour;
        this.capitalizeName = capitalizeName;
    }

    async writeTalents(talents: (ReadableTalentModel|RoleModel|SpeciesAbility)[], column: Column,
            fontSize: number = 9, nameFontSize?: number,
            indent: number = 0, bulletWriter: (paragraph?: Paragraph) => void = (p => {})) {
        let paragraphs: Paragraph[] = [];
        let paragraph = new Paragraph(this.page, column, this.fonts);
        paragraph.indent(indent);
        paragraphs.push(paragraph);
        if (nameFontSize == null) {
            nameFontSize = fontSize;
        }

        talents.forEach(talent => {
            if (paragraph) {
                if (talent instanceof RoleModel) {
                    paragraph.append(talent.localizedName + ": ", new FontOptions(nameFontSize, FontType.Bold), this.headingColour);
                    paragraph.append(this.version === 1 ? talent.localizedAbility : talent.localizedAbility2e, new FontOptions(fontSize));
                    bulletWriter(paragraph);

                    paragraph = paragraph.nextParagraph();
                    if (paragraph) {
                        paragraphs.push(paragraph);
                    }
                } else if (talent instanceof SpeciesAbility) {
                    paragraph.append(talent.name + " (" + i18next.t('Construct.other.speciesAbility') + "): ", new FontOptions(nameFontSize, FontType.Bold), this.headingColour);
                    paragraph.append(talent.description, new FontOptions(fontSize));
                    bulletWriter(paragraph);

                    paragraph = paragraph.nextParagraph();
                    if (paragraph) {
                        paragraphs.push(paragraph);
                    }
                } else {

                    let talentName = talent.talent.localizedDisplayName;
                    if (this.capitalizeName) {
                        talentName = talentName.toLocaleUpperCase();
                    }
                    if (talent && talent.talent.maxRank > 1) {
                        let rank = talent.rank;
                        talentName = i18next.t("Talent.text.rank", {talentName: talentName, rank: rank});
                    }
                    paragraph?.append(talentName + ": ", new FontOptions(nameFontSize, FontType.Bold), this.headingColour);
                    let description = this.version === 1 ? talent.talent.localizedDescription : talent.talent.localizedDescription2e;

                    let descriptionParagraphs = description.split('\n');
                    descriptionParagraphs.forEach((p, i) => {
                        if (i > 0) {
                            paragraph = paragraph?.nextParagraph();
                            if (paragraph) {
                                paragraphs.push(paragraph);
                            }
                        } else {
                            bulletWriter(paragraph);
                        }
                        paragraph?.append(p, new FontOptions(fontSize));
                    });

                    if (talent.talent.name === TALENT_NAME_BORG_IMPLANTS && talent.implants?.length) {
                        talent.implants?.forEach(implant => {
                            paragraph = paragraph?.nextParagraph(0);
                            if (paragraph) {
                                paragraphs.push(paragraph);
                                paragraph.indent(indent + 10);
                                paragraph.append(implant.localizedName + ": ", new FontOptions(fontSize, FontType.Bold));
                                paragraph.append(implant.description, new FontOptions(fontSize));
                            }
                        });
                    } else if (talent.talent.name === TALENT_NAME_UNTAPPED_POTENTIAL && talent.attribute != null) {
                        paragraph = paragraph?.nextParagraph(0);
                        if (paragraph) {
                            paragraphs.push(paragraph);
                            paragraph.indent(indent + 10);
                            paragraph.append(i18next.t("Construct.other.attribute") + ": ", new FontOptions(fontSize, FontType.Bold));
                            paragraph.append(i18next.t(makeKey("Construct.attribute.", Attribute[talent.attribute])), new FontOptions(fontSize));
                        }
                    } else if (talent.talent.name === TALENT_NAME_MISSION_POD && talent.missionPod != null) {
                        paragraph = paragraph?.nextParagraph(0);
                        if (paragraph) {
                            paragraphs.push(paragraph);
                            paragraph.indent(indent + 10);
                            paragraph.append(i18next.t("Construct.other.missionPod") + ": ", new FontOptions(fontSize, FontType.Bold));
                            paragraph.append(talent.missionPod.localizedName, new FontOptions(fontSize));
                        }
                    }

                    paragraph = paragraph?.nextParagraph();
                    if (paragraph) {
                        paragraph.indent(indent);
                        paragraphs.push(paragraph);
                    }
                }
            }
        });

        paragraphs.forEach(p => p.write());

        if (paragraphs.length) {
            let last = paragraphs.filter(p => p.lines?.length).slice(-1)[0];
            if (last) {
                let bottom = last.bottom;
                return paragraph.endColumn.bottomAfter(bottom.y - paragraph.endColumn.start.y);
            } else {
                return column;
            }
        } else {
            return column;
        }
    }
}