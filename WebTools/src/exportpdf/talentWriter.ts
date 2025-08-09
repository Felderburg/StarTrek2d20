import { PDFPage } from "@cantoo/pdf-lib";
import { FontLibrary, FontType } from "./fontLibrary";
import { SimpleColor } from "../common/colour";
import { TALENT_NAME_ADDITIONAL_PROPULSION_SYSTEM, TALENT_NAME_AUGMENTED_ABILITY, TALENT_NAME_BOLD, TALENT_NAME_BORG_IMPLANTS, TALENT_NAME_CAUTIOUS, TALENT_NAME_COLLABORATION, TALENT_NAME_CUSTOM_TALENT, TALENT_NAME_DEDICATED_PERSONNEL, TALENT_NAME_DEFENSIVE_TRAINING, TALENT_NAME_EXTRAORDINARY_ATTRIBUTE_X, TALENT_NAME_MISSION_POD, TALENT_NAME_REDUNDANT_SYSTEMS, TALENT_NAME_UNTAPPED_POTENTIAL, TALENT_NAME_WARRIORS_SPIRIT, TalentModel } from "../helpers/talents";
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
import { SpecialWeapon } from "../common/specialWeapon";
import { AttackType } from "../common/attackType";
import { Department } from "../helpers/department";
import { PropulsionSystemModel, PropulsionSystemType } from "../helpers/propulsionSystem";
import { OtherSelection } from "../common/selectedTalent";
import { System } from "../helpers/systems";

export class ReadableTalentModel {
    characterType: CharacterType;
    rank: number;
    talent: TalentModel;
    implants: Implant[];
    attributes: Attribute[];
    departments: Department[];
    missionPod: MissionPodModel;
    x?: number;
    selection?: string|SpecialWeapon|AttackType|PropulsionSystemType|OtherSelection;
    additionalInformation?: string;
    system?: System;
    customTalentName?: string;
    customTalentDescription?: string;

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

                    let talentName = talent.talent.localizedName;
                    let description = this.version === 1 ? talent.talent.localizedDescription : talent.talent.localizedDescription2e;
                    if (talentName === TALENT_NAME_CUSTOM_TALENT) {
                        talentName = talent.customTalentName;
                        description = talent.customTalentDescription;
                    }
                    if (this.capitalizeName) {
                        talentName = talentName.toLocaleUpperCase();
                    }
                    if (talent && talent.talent.maxRank > 1) {
                        let rank = talent.rank;
                        talentName = i18next.t("Talent.text.rank", {talentName: talentName, rank: rank});
                    }
                    if (talent.talent.isXQualified) {
                        if (talent.x != null) {
                            let xLocation = talentName.lastIndexOf(" X");
                            talentName = talentName.substring(0, xLocation + 1) + talent.x + talentName.substring(xLocation + 2)
                            description = description.replace(/ X /g, " " + talent.x + " ")
                            description = description.replace(/ X\./g, " " + talent.x + ".")
                        }

                    }
                    if (talent.additionalInformation?.length) {
                        talentName += (" [" + talent.additionalInformation + "]");
                    }
                    paragraph?.append(talentName + ": ", new FontOptions(nameFontSize, FontType.Bold), this.headingColour);

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
                    } else if (talent.talent.name === TALENT_NAME_UNTAPPED_POTENTIAL && talent.attributes?.length) {
                        paragraph = paragraph?.nextParagraph(0);
                        if (paragraph) {
                            paragraphs.push(paragraph);
                            paragraph.indent(indent + 10);
                            paragraph.append(i18next.t("Construct.other.attribute") + ": ", new FontOptions(fontSize, FontType.Bold));
                            paragraph.append(talent.attributes.map(a =>
                                i18next.t(makeKey("Construct.attribute.", Attribute[a]))).join(", "), new FontOptions(fontSize));
                        }
                    } else if (talent.talent.name === TALENT_NAME_MISSION_POD && talent.missionPod != null) {
                        paragraph = paragraph?.nextParagraph(0);
                        if (paragraph) {
                            paragraphs.push(paragraph);
                            paragraph.indent(indent + 10);
                            paragraph.append(i18next.t("Construct.other.missionPod") + ": ", new FontOptions(fontSize, FontType.Bold));
                            paragraph.append(talent.missionPod.localizedName, new FontOptions(fontSize));
                        }
                    } else if (talent.talent.name === TALENT_NAME_ADDITIONAL_PROPULSION_SYSTEM && talent.selection != null) {
                        let propulsion = PropulsionSystemModel.getByType(talent.selection as PropulsionSystemType);
                        paragraph = paragraph?.nextParagraph(0);
                        if (paragraph) {
                            paragraphs.push(paragraph);
                            paragraph.indent(indent + 10);
                            paragraph.append(propulsion?.localizedName, new FontOptions(fontSize));
                        }
                    } else if (talent.talent.name === TALENT_NAME_WARRIORS_SPIRIT && talent.selection != null) {
                        paragraph = paragraph?.nextParagraph(0);
                        if (paragraph) {
                            paragraphs.push(paragraph);
                            paragraph.indent(indent + 10);
                            paragraph.append(i18next.t("Construct.other.weapon") + ": ", new FontOptions(fontSize, FontType.Bold));
                            paragraph.append(i18next.t(makeKey('SpecialWeapon.', SpecialWeapon[talent.selection as SpecialWeapon])), new FontOptions(fontSize));
                        }
                    } else if ([TALENT_NAME_AUGMENTED_ABILITY, TALENT_NAME_EXTRAORDINARY_ATTRIBUTE_X].includes(talent.talent.name) && talent.attributes?.length) {
                        paragraph = paragraph?.nextParagraph(0);
                        if (paragraph) {
                            paragraphs.push(paragraph);
                            paragraph.indent(indent + 10);
                            paragraph.append(i18next.t("Construct.other.attribute") + ": ", new FontOptions(fontSize, FontType.Bold));
                            paragraph.append(talent.attributes.map(a =>
                                i18next.t(makeKey("Construct.attribute.", Attribute[a]))).join(", "), new FontOptions(fontSize));
                        }
                    } else if (talent.talent.name === TALENT_NAME_DEFENSIVE_TRAINING && talent.selection != null) {
                        paragraph = paragraph?.nextParagraph(0);
                        if (paragraph) {
                            paragraphs.push(paragraph);
                            paragraph.indent(indent + 10);
                            paragraph.append(i18next.t("Construct.other.attackType") + ": ", new FontOptions(fontSize, FontType.Bold));
                            paragraph.append(i18next.t(makeKey('Weapon.common.', AttackType[talent.selection as AttackType])), new FontOptions(fontSize));
                        }
                    } else if ([TALENT_NAME_COLLABORATION, TALENT_NAME_BOLD, TALENT_NAME_CAUTIOUS].includes(talent.talent.name) && talent.departments?.length) {
                        paragraph = paragraph?.nextParagraph(0);
                        if (paragraph) {
                            paragraphs.push(paragraph);
                            paragraph.indent(indent + 10);
                            paragraph.append(i18next.t("Construct.other.department") + ": ", new FontOptions(fontSize, FontType.Bold));
                            paragraph.append(talent.departments.map(d =>
                                i18next.t(makeKey('Construct.discipline.', Department[d]))).join(", "), new FontOptions(fontSize));
                        }
                    } else if (talent.talent.name === TALENT_NAME_DEDICATED_PERSONNEL && talent.departments?.length) {
                        paragraph = paragraph?.nextParagraph(0);
                        if (paragraph) {
                            paragraphs.push(paragraph);
                            paragraph.indent(indent + 10);
                            paragraph.append(i18next.t("Construct.other.department") + ": ", new FontOptions(fontSize, FontType.Bold));
                            paragraph.append(talent.departments.map(d =>
                                i18next.t(makeKey('Construct.department.', Department[d]))).join(", "), new FontOptions(fontSize));
                        }
                    } else if (talent.talent.name === TALENT_NAME_REDUNDANT_SYSTEMS && talent.selection != null) {
                        paragraph = paragraph?.nextParagraph(0);
                        if (paragraph) {
                            paragraphs.push(paragraph);
                            paragraph.indent(indent + 10);
                            paragraph.append("Selection: ", new FontOptions(fontSize, FontType.Bold));
                            paragraph.append(talent.selection as string, new FontOptions(fontSize));
                        }
                    } else if (talent.talent.name === TALENT_NAME_REDUNDANT_SYSTEMS && talent.system != null) {
                        paragraph = paragraph?.nextParagraph(0);
                        if (paragraph) {
                            paragraphs.push(paragraph);
                            paragraph.indent(indent + 10);
                            paragraph.append("Selection: ", new FontOptions(fontSize, FontType.Bold));
                            paragraph.append(i18next.t(makeKey('Construct.system.', System[talent.system])), new FontOptions(fontSize));
                        }
                    } else if (["Peak Performance (Service Record)", "The Last Generation (Service Record)"].includes(talent.talent.name)) {
                        if (talent.system != null) {
                            paragraph = paragraph?.nextParagraph(0);
                            if (paragraph) {
                                paragraphs.push(paragraph);
                                paragraph.indent(indent + 10);
                                paragraph.append(i18next.t("Construct.other.systems") + ": ", new FontOptions(fontSize, FontType.Bold));
                                paragraph.append(i18next.t(makeKey('Construct.system.', System[talent.system])), new FontOptions(fontSize));
                            }
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
                return last.endColumn.bottomAfter(bottom.y - last.endColumn.start.y);
            } else {
                return column;
            }
        } else {
            return column;
        }
    }
}