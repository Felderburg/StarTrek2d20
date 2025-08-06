import { PDFDocument, PDFFont, PDFPage } from "@cantoo/pdf-lib";
import { ICharacterSheet, SheetTag } from "./icharactersheet";
import fontkit from '@pdf-lib/fontkit'
import { Construct } from "../common/construct";
import { ReadableTalentModel } from "./talentWriter";
import { RoleModel, RolesHelper } from "../helpers/roles";
import { SpeciesAbility } from "../helpers/speciesAbility";
import { Character } from "../common/character";
import { TALENT_NAME_ADDITIONAL_PROPULSION_SYSTEM, TALENT_NAME_AUGMENTED_ABILITY, TALENT_NAME_BOLD, TALENT_NAME_BORG_IMPLANTS, TALENT_NAME_CAUTIOUS, TALENT_NAME_COLLABORATION, TALENT_NAME_DEDICATED_PERSONNEL, TALENT_NAME_EXPANSIVE_DEPARTMENT, TALENT_NAME_EXTRAORDINARY_ATTRIBUTE_X, TALENT_NAME_MISSION_POD, TALENT_NAME_REDUNDANT_SYSTEMS, TALENT_NAME_UNTAPPED_POTENTIAL, TALENT_NAME_WARRIORS_SPIRIT } from "../helpers/talents";
import { BorgImplants } from "../helpers/borgImplant";
import { Starship } from "../common/starship";
import { Column } from "./column";
import { SimpleColor } from "../common/colour";
import { TextBlock } from "./textBlock";
import { FontSpecification } from "./fontSpecification";

export abstract class BasicGeneratedSheet implements ICharacterSheet {

    formFont: PDFFont;

    getLanguage(): string {
        return "en";
    }
    getName(): string {
        throw new Error('Method not implemented.');
    }
    getThumbnailUrl(): string {
        throw new Error('Method not implemented.');
    }
    getPdfUrl(): string {
        throw new Error('Method not implemented.');
    }

    getDefaultFontPath() {
        return "/static/font/OpenSansCondensed-Light.ttf";
    }

    getTags(): SheetTag[] {
        return [];
    }

    async initializeFonts(pdf: PDFDocument) {

        pdf.registerFontkit(fontkit);
        const baseFontBytes = await fetch(this.getDefaultFontPath()).then(res => res.arrayBuffer());
        const baseFont =  await pdf.embedFont(baseFontBytes)
        this.formFont = baseFont;
        const form = pdf.getForm()
        if (form) {
            const rawUpdateFieldAppearances = form.updateFieldAppearances.bind(form);
            form.updateFieldAppearances = function () {
                return rawUpdateFieldAppearances(baseFont);
            };
        }
    }

    async populate(pdf: PDFDocument, construct: Construct) {
        await this.initializeFonts(pdf);
    }

    createFileName(suffix: string, construct: Construct): string {
        if (construct.name == null || construct.name.length === 0) {
            return suffix + ".pdf";
        } else {
            var escaped = construct.name.replace(/\\/g, '_').replace(/\//g, '_').replace(/\s/g, '_');
            return escaped + '-'  + suffix + ".pdf";
        }
    }


    determineIdealFontWidth(text: string[], maxWidth: number, idealFontSize: number, minimumFontSize: number, font: PDFFont) {
        let fontSize = idealFontSize;
        text.forEach(t => {
            let width = font.widthOfTextAtSize(t, fontSize);
            while (width > maxWidth) {
                fontSize -= 0.25;
                width = font.widthOfTextAtSize(t, fontSize);
                if (fontSize <= minimumFontSize) {
                    break;
                }
            }
        });
        return fontSize;
    }


    writeName(page: PDFPage, name: string, colour: SimpleColor, headingFont: PDFFont, nameColumn: Column) {
        if (name?.length) {
            const textBlock = TextBlock.create(name.toLocaleUpperCase(), new FontSpecification(headingFont, 10), false);
            let y = nameColumn.end.y - 3 - ((nameColumn.height - textBlock.height) / 2);
            let x = nameColumn.start.x;

            const triangle = "M 59.14167,59.12397 V 49.110298 l 8.671875,5.009766 z m 0.580078,-1.001953 6.9375,-4.001953 -6.9375,-4.007813 z";

            let width = textBlock.width;
            let widthOfTab = Math.max(120, width + 50);
            let startOffset = 42.537;

            let farthestEdge = widthOfTab + startOffset;
            let circle1 = farthestEdge - (226.5918 - 221.51591);
            let circle2 = farthestEdge - (226.5918 - 215.25391);

            let curvePath = "M 53.876953 44.523438 C 47.614953 44.523438 42.537109 49.601281 42.537109 55.863281 L 42.537109 83.523438 L 42.958984 83.523438 L 42.958984 74.53125 C 42.958984 68.55425 47.821828 63.693359 53.798828 63.693359 "
                + "L " + farthestEdge + " 63.693359 L " + farthestEdge + " 55.863281 C "
                + farthestEdge + " 49.601281 " + circle1 + " 44.523438 " + circle2 + " 44.523438 L 53.876953 44.523438 z";

            page.moveTo(0, page.getHeight());
            page.drawSvgPath(curvePath, {
                color: colour.asPdfRbg(),
                borderWidth: 0
            });


            page.drawSvgPath(triangle, {
                borderColor: SimpleColor.from("#000000").asPdfRbg(),
                color: SimpleColor.from("#ffffff").asPdfRbg(),
                borderWidth: 0
            });

            textBlock.writeToPage(x, page.getHeight() - y, page, SimpleColor.from("#ffffff"));
        }
    }

}

export const assembleWritableItems = (character: Character) => {
    let result: (ReadableTalentModel|RoleModel|SpeciesAbility)[] = [];

    if (character.role != null) {
        let role = RolesHelper.instance.getRole(character.role, character.type);
        if (role) {
            result.push(role);
        }

        if (character.secondaryRole != null) {
            let role = RolesHelper.instance.getRole(character.secondaryRole, character.type);
            if (role) {
                result.push(role);
            }
        }
    }

    if (character.speciesStep?.ability) {
        result.push(character.speciesStep.ability);
    }

    let handledTalents = [];
    character.talents.forEach(t => {

        const talent = t.talentModel;
        if (talent && !handledTalents.includes(t.talent)) {
            handledTalents.push(t.talent);
            const readableTalent = new ReadableTalentModel(character.type, talent);

            if (talent.maxRank > 1) {
                readableTalent.rank = character.getRankForTalent(t.talent);
            }

            if (talent.name === TALENT_NAME_BORG_IMPLANTS) {
                readableTalent.implants = character.implants.map(implantType =>
                    BorgImplants.instance.getImplantByType(implantType)
                );
            } else if (talent.name === TALENT_NAME_UNTAPPED_POTENTIAL && character.version > 1) {
                readableTalent.attributes = [ character.careerStep?.talent?.attribute ];
            } else if (talent.name === TALENT_NAME_WARRIORS_SPIRIT && t.selection != null) {
                readableTalent.selection = t.selection;
            } else if (talent.name === TALENT_NAME_AUGMENTED_ABILITY) {
                readableTalent.attributes = character.talents
                    .filter(s => s.talent === TALENT_NAME_AUGMENTED_ABILITY && s.attribute != null)
                    .map(s => s.attribute);
            } else if ([TALENT_NAME_COLLABORATION, TALENT_NAME_BOLD, TALENT_NAME_CAUTIOUS].includes(talent.name)) {
                readableTalent.departments = character.talents
                    .filter(s => s.talent === talent.name && s.department != null)
                    .map(s => s.department);
            } else if (talent.name === TALENT_NAME_EXTRAORDINARY_ATTRIBUTE_X) {
                readableTalent.attributes = character.talents
                    .filter(s => s.talent === talent.name && s.attribute != null)
                    .map(s => s.attribute);
                let temp =character.talents
                    .filter(s => s.talent === talent.name && s.x != null)
                if (temp.length) {
                    readableTalent.x = temp[0].x;
                }
            } else if (talent.isXQualified) {
                let temp =character.talents
                    .filter(s => s.talent === talent.name && s.x != null)
                if (temp.length) {
                    readableTalent.x = temp[0].x;
                }
            }
            result.push(readableTalent);
        }
    });

    return result;
}

export const assembleStarshipTalents = (starship: Starship, includeSpecialRules: boolean = false) => {
    let result: (ReadableTalentModel|RoleModel|SpeciesAbility)[] = [];
    let specialRules: (ReadableTalentModel|RoleModel|SpeciesAbility)[] = [];

    let handledTalents = [];
    starship.talents.forEach(t => {
        const talent = t.talentModel;
        if (talent && !handledTalents.includes(t.talent)) {
            handledTalents.push(talent.name);
            const readableTalent = new ReadableTalentModel(starship.type, talent);

            if (talent.maxRank > 1) {
                readableTalent.rank = starship.getRankForTalent(t.name);
            }

            if (talent.name === TALENT_NAME_MISSION_POD) {
                readableTalent.missionPod = starship.missionPodModel;
            } else if (talent.name === TALENT_NAME_REDUNDANT_SYSTEMS) {
                readableTalent.selection = t.selection;
                readableTalent.system = t.system;
            } else if (talent.name === TALENT_NAME_ADDITIONAL_PROPULSION_SYSTEM) {
                readableTalent.selection = t.selection;
            } else if ([TALENT_NAME_DEDICATED_PERSONNEL, TALENT_NAME_EXPANSIVE_DEPARTMENT].includes(talent.name)) {
                readableTalent.departments = starship.talents
                    .filter(s => s.talent === talent.name && s.department != null)
                    .map(s => s.department);
            } else if (["Peak Performance (Service Record)", "The Last Generation (Service Record)"].includes(talent.name)) {
                let temp = starship.talents
                    .filter(s => s.talent === talent.name && s.system != null)
                if (temp.length) {
                    readableTalent.system = temp[0].system;
                }
            }
            if (talent.specialRule) {
                specialRules.push(readableTalent);
            } else {
                result.push(readableTalent);
            }
        }
    });

    if (includeSpecialRules) {
        return specialRules;
    } else {
        return result;
    }
}