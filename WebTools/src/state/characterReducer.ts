import { CareerEventStep, CareerStep, Character, CharacterRank, EducationStep, EnvironmentStep, FinishingStep, Promotion, SpeciesAbilityOptions, SpeciesStep, CharacterAdvancementStep, SupportingStep, UpbringingStep, NpcGenerationStep } from "../common/character";
import { CharacterType } from "../common/characterType";
import { Stereotype } from "../common/construct";
import { SelectedTalent } from "../common/selectedTalent";
import AgeHelper from "../helpers/age";
import { Department } from "../helpers/department";
import { EquipmentModel } from "../helpers/equipment";
import { ITalent } from "../helpers/italent";
import { SpeciesAbilityList } from "../helpers/speciesAbility";
import { Species } from "../helpers/speciesEnum";
import { TALENT_NAME_BORG_IMPLANTS, TALENT_NAME_UNTAPPED_POTENTIAL } from "../helpers/talents";
import { Track } from "../helpers/trackEnum";
import { CharacterAdvancementChoice } from "../modify/model/characterAdvancementChoice";
import { ADD_CHARACTER_BORG_IMPLANT, ADD_CHARACTER_CAREER_EVENT, ADD_CHARACTER_LOG_ENTRY, ADD_CHARACTER_SPECIES_ABILITY_FOCUS, ADD_CHARACTER_TALENT, ADD_CHARACTER_TALENT_FOCUS,
    ADD_CHARACTER_TALENT_VALUE, ADD_CHARACTER_UNTAPPED_POTENTIAL_ATTRIBUTE, ADD_NPC_CHARACTER_EQUIPMENT, ADD_NPC_CHARACTER_VALUE, ADD_NPC_CHARACTER_WEAPON, MODIFY_CHARACTER_ADD_ADVANCEMENT, MODIFY_CHARACTER_ATTRIBUTE,
    MODIFY_CHARACTER_DISCIPLINE, MODIFY_CHARACTER_RANK, MODIFY_CHARACTER_REPUTATION, REMOVE_CHARACTER_BORG_IMPLANT,
    REMOVE_NPC_CHARACTER_EQUIPMENT,
    REMOVE_NPC_CHARACTER_WEAPON,
    SET_CHARACTER, SET_CHARACTER_ADDITIONAL_TRAITS, SET_CHARACTER_AGE, SET_CHARACTER_ASSIGNED_SHIP,
    SET_CHARACTER_CAREER_EVENT_TRAIT, SET_CHARACTER_CAREER_LENGTH, SET_CHARACTER_EARLY_OUTLOOK, SET_CHARACTER_EDUCATION,
    SET_CHARACTER_ENVIRONMENT, SET_CHARACTER_FINISHING_TOUCHES, SET_CHARACTER_FOCUS, SET_CHARACTER_HOUSE,
    SET_CHARACTER_LINEAGE, SET_CHARACTER_NAME, SET_CHARACTER_PASTIME, SET_CHARACTER_PRONOUNS, SET_CHARACTER_RANK,
    SET_CHARACTER_ROLE, SET_CHARACTER_SPECIES, SET_CHARACTER_TYPE, SET_CHARACTER_VALUE, SET_NPC_CHARACTER_ATTRIBUTES, SET_NPC_CHARACTER_DEPARTMENTS, SET_NPC_CHARACTER_TALENTS, SET_SUPPORTING_CHARACTER_ATTRIBUTES,
    SET_SUPPORTING_CHARACTER_DISCIPLINES, SET_SUPPORTING_CHARACTER_SUPERVISORY, StepContext } from "./characterActions";

interface CharacterState {
    currentCharacter?: Character;
    isModified: boolean;
    replacementHash?: string;
}

const trackDefaults = (track: Track, step: EducationStep) => {
    switch (track) {
        case Track.EnlistedSecurityTraining:
            step.primaryDiscipline = Department.Security;
            step.disciplines = [ Department.Security, Department.Conn ];
            step.focuses[2] = "Chain of Command";
            break;
        case Track.ShipOperations:
            step.primaryDiscipline = Department.Conn;
            step.disciplines = [ Department.Engineering, Department.Science ];
            break;
        case Track.UniversityAlumni:
            step.primaryDiscipline = Department.Science;
            step.disciplines = [ Department.Engineering, Department.Command ];
            break;
        case Track.ResearchInternship:
            step.primaryDiscipline = Department.Science;
            step.disciplines = [ Department.Engineering, Department.Medicine ];
            break;
        default:
            break;
    }
}

const characterReducer = (state: CharacterState = { currentCharacter: undefined, isModified: false }, action) => {
    switch (action.type) {

        case SET_CHARACTER: {
            let temp = action.payload.character.copy();
            return {
                ...state,
                currentCharacter: temp,
                isModified: false,
                replacementHash: action.payload.replacementHash
            }
        }
        case SET_CHARACTER_SPECIES: {
            let temp = state.currentCharacter.copy();
            let originalStep = temp.speciesStep;
            temp.speciesStep = new SpeciesStep(action.payload.species);
            if (action.payload.attributes) {
                temp.speciesStep.attributes = [...action.payload.attributes];
            }
            if (action.payload.decrementAttributes?.length) {
                temp.speciesStep.decrementAttributes = [...action.payload.decrementAttributes];
            }
            if (originalStep) {
                if (originalStep.species === temp.speciesStep.species) {
                    if (originalStep.attributes?.length) {
                        if (originalStep.originalSpecies != null && originalStep.originalSpecies === action.payload.originalSpecies) {
                            temp.speciesStep.attributes = [...originalStep.attributes];
                        } else if (originalStep.mixedSpecies != null && originalStep.mixedSpecies === action.payload.mixedSpecies) {
                            temp.speciesStep.attributes = [...originalStep.attributes];
                        }
                    }
                    if (temp.speciesStep.species === Species.Custom) {
                        temp.speciesStep.customSpeciesName = originalStep.customSpeciesName;
                    }
                    temp.speciesStep.mixedSpecies = originalStep.mixedSpecies;
                    temp.speciesStep.originalSpecies = originalStep.originalSpecies;
                    temp.speciesStep.talent = originalStep.talent?.copy();
                    temp.speciesStep.abilityOptions = originalStep.abilityOptions?.copy();
                }
            }
            if (temp.version > 1) {
                let ability = SpeciesAbilityList.instance.getBySpecies(temp.speciesStep.species);
                if (ability) {
                    temp.speciesStep.ability = ability;
                }
            }

            temp.speciesStep.mixedSpecies = action.payload.mixedSpecies;
            temp.speciesStep.originalSpecies = action.payload.originalSpecies;
            if (temp.speciesStep.species === Species.Custom && action.payload.customSpeciesName) {
                temp.speciesStep.customSpeciesName = action.payload.customSpeciesName;
            }

            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_AGE: {
            let temp = state.currentCharacter.copy();
            temp.age = action.payload.age;
            if (temp.educationStep == null) {
                temp.educationStep = new EducationStep();
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_CAREER_LENGTH: {
            let temp = state.currentCharacter.copy();
            temp.careerStep = new CareerStep(action.payload.careerLength);
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_EDUCATION: {
            let temp = state.currentCharacter.copy();
            let originalStep = temp.educationStep;
            temp.educationStep = new EducationStep(action.payload.track, action.payload.enlisted);
            trackDefaults(action.payload.track, temp.educationStep);
            if (originalStep) {
                if (originalStep.track === temp.educationStep.track) {
                    temp.educationStep.attributes = [...originalStep.attributes];
                    temp.educationStep.primaryDiscipline = originalStep.primaryDiscipline;
                    temp.educationStep.decrementDisciplines = [...originalStep.decrementDisciplines];
                    temp.educationStep.disciplines = [...originalStep.disciplines];
                    temp.educationStep.focuses = [...originalStep.focuses];
                    temp.educationStep.value = originalStep.value;
                    temp.educationStep.talent = originalStep.talent?.copy();
                }
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_FINISHING_TOUCHES: {
            let temp = state.currentCharacter.copy();
            let originalStep = temp.finishingStep;
            temp.finishingStep = new FinishingStep();
            if (originalStep) {
                temp.finishingStep.attributes = [...originalStep.attributes];
                temp.finishingStep.disciplines = [...originalStep.disciplines];
                temp.finishingStep.value = originalStep.value;
                temp.finishingStep.talent = originalStep.talent?.copy();

                if (temp.attributeTotal < Character.totalAttributeSum(temp)) {
                    temp.finishingStep.attributes = [];
                }
                if (temp.skillTotal < Character.totalDepartmentSum(temp)) {
                    temp.finishingStep.disciplines = [];
                }
            }

            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_ENVIRONMENT: {
            let temp = state.currentCharacter.copy();
            let originalStep = temp.environmentStep;
            temp.environmentStep = new EnvironmentStep(action.payload.environment, action.payload.otherSpecies);
            if (originalStep) {
                if (originalStep.environment === temp.environmentStep.environment) {
                    temp.environmentStep.discipline = originalStep.discipline;
                    if (originalStep.otherSpecies === temp.environmentStep.otherSpecies) {
                        temp.environmentStep.attribute = originalStep.attribute;
                    }
                    temp.environmentStep.value = originalStep.value;
                }
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_EARLY_OUTLOOK: {
            let temp = state.currentCharacter.copy();
            let originalStep = temp.upbringingStep;
            temp.upbringingStep = new UpbringingStep(action.payload.earlyOutlook, action.payload.accepted);
            if (originalStep) {
                if (originalStep.upbringing?.id === temp.upbringingStep.upbringing?.id) {
                    temp.upbringingStep.discipline = originalStep.discipline;
                }
                temp.upbringingStep.focus = originalStep.focus;
                temp.upbringingStep.talent = originalStep.talent?.copy();
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case MODIFY_CHARACTER_ATTRIBUTE: {
            let temp = state.currentCharacter.copy();
            const attribute = action.payload.attribute;
            const positive = action.payload.positive;
            if (action.payload.context === StepContext.Species && temp.speciesStep) {
                if (positive) {
                    temp.speciesStep.attributes.push(action.payload.attribute);
                    if (temp.speciesStep.attributes.length > 3) {
                        let attributes = [...temp.speciesStep.attributes];
                        attributes.splice(0, attributes.length - 3);
                        temp.speciesStep.attributes = attributes;
                    }
                } else if (temp.speciesStep.attributes.indexOf(action.payload.attribute) >= 0) {
                    let attributes = [...temp.speciesStep.attributes];
                    attributes.splice(temp.speciesStep.attributes.indexOf(action.payload.attribute), 1);
                    temp.speciesStep.attributes = attributes;
                }
            } else if (action.payload.context === StepContext.Environment && temp.environmentStep) {
                if (positive) {
                    temp.environmentStep.attribute = action.payload.attribute;
                } else if (temp.environmentStep.attribute === action.payload.attribute) {
                    temp.environmentStep.attribute = undefined;
                }
            } else if (action.payload.context === StepContext.Education && temp.educationStep) {
                if (action.payload.forceDecrement && temp.type === CharacterType.Child) {
                    if (positive) {
                        temp.educationStep.decrementAttributes.splice(temp.educationStep.decrementAttributes.indexOf(action.payload.attribute), 1);
                    } else {
                        temp.educationStep.decrementAttributes.push(action.payload.attribute)
                    }
                } else {
                    if (positive) {
                        temp.educationStep.attributes.push(action.payload.attribute)
                    } else if (temp.educationStep.attributes.indexOf(action.payload.attribute) >= 0) {
                        temp.educationStep.attributes.splice(temp.educationStep.attributes.indexOf(action.payload.attribute), 1);
                    }
                }
            } else if (action.payload.context === StepContext.CareerEvent1 && temp.careerEvents?.length > 0) {
                temp.careerEvents[0].attribute = positive ? attribute : undefined;
            } else if (action.payload.context === StepContext.CareerEvent2 && temp.careerEvents?.length > 1) {
                temp.careerEvents[1].attribute = positive ? attribute : undefined;
            } else if (action.payload.context === StepContext.FinishingTouches && temp.finishingStep) {
                if (positive) {
                    temp.finishingStep.attributes.push(attribute);
                } else {
                    let index = temp.finishingStep.attributes.indexOf(attribute);
                    if (index >= 0) {
                        temp.finishingStep.attributes.splice(index, 1);
                    }
                }
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_SUPPORTING_CHARACTER_SUPERVISORY: {
            let temp = state.currentCharacter.copy();
            if (temp.supportingStep == null) {
                temp.supportingStep = new SupportingStep();
            }
            temp.supportingStep.supervisory = action.payload.supervisory;
            if (!temp.supportingStep.supervisory && temp.supportingStep.value?.length) {
                temp.supportingStep.value = null;
            }
            if (!temp.supportingStep.supervisory && temp.supportingStep.focuses.length > 3) {
                temp.supportingStep.focuses.splice(3);
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_SUPPORTING_CHARACTER_DISCIPLINES: {
            let temp = state.currentCharacter.copy();
            if (temp.supportingStep == null) {
                temp.supportingStep = new SupportingStep();
            }
            temp.supportingStep.disciplines = [...action.payload.disciplines];
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_NPC_CHARACTER_DEPARTMENTS: {
            let temp = state.currentCharacter.copy();
            if (temp.npcGenerationStep == null) {
                temp.npcGenerationStep = new NpcGenerationStep();
            }
            temp.npcGenerationStep.departments = [...action.payload.departments];
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_NPC_CHARACTER_ATTRIBUTES: {
            let temp = state.currentCharacter.copy();
            if (temp.npcGenerationStep == null) {
                temp.npcGenerationStep = new NpcGenerationStep();
            }
            temp.npcGenerationStep.attributes = [...action.payload.attributes];
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_NPC_CHARACTER_TALENTS: {
            let temp = state.currentCharacter.copy();
            if (temp.npcGenerationStep == null) {
                temp.npcGenerationStep = new NpcGenerationStep();
            }
            temp.npcGenerationStep.talents = [...action.payload.talents.map(t => t.copy())];
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case ADD_CHARACTER_LOG_ENTRY: {
            let temp = state.currentCharacter.copy();
            if (temp.improvements == null) {
                temp.improvements = [];
            }
            temp.improvements.push(action.payload.logEntry);
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case ADD_NPC_CHARACTER_EQUIPMENT: {
            let temp = state.currentCharacter.copy();
            if (temp.npcGenerationStep == null) {
                temp.npcGenerationStep = new NpcGenerationStep();
            }

            temp.npcGenerationStep.equipment.push(action.payload.equipment);
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case ADD_NPC_CHARACTER_WEAPON: {
            let temp = state.currentCharacter.copy();
            if (temp.npcGenerationStep == null) {
                temp.npcGenerationStep = new NpcGenerationStep();
            }

            temp.npcGenerationStep.weapons.push(action.payload.weapon);
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case REMOVE_NPC_CHARACTER_EQUIPMENT: {
            let temp = state.currentCharacter.copy();
            let equipment = action.payload.equipment;
            if (temp.npcGenerationStep?.equipment != null) {
                temp.npcGenerationStep.equipment = temp.npcGenerationStep.equipment
                    .filter(e => {
                        if (e instanceof EquipmentModel && equipment instanceof EquipmentModel) {
                            return !(e.type === equipment.type
                                && e.name === equipment.name
                                && e.protection === equipment.protection);
                        } else {
                            return e !== equipment;
                        }
                    });
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case REMOVE_NPC_CHARACTER_WEAPON: {
            let temp = state.currentCharacter.copy();
            let weapon = action.payload.weapon;
            if (temp.npcGenerationStep?.weapons != null) {
                temp.npcGenerationStep.weapons = temp.npcGenerationStep.weapons
                    .filter(e => e !== weapon );
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_SUPPORTING_CHARACTER_ATTRIBUTES: {
            let temp = state.currentCharacter.copy();
            if (temp.supportingStep == null) {
                temp.supportingStep = new SupportingStep();
            }
            temp.supportingStep.attributes = [...action.payload.attributes];
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case ADD_CHARACTER_CAREER_EVENT: {
            let temp = state.currentCharacter.copy();
            let event = new CareerEventStep(action.payload.eventId);
            if (action.payload.attribute != null) {
                event.attribute = action.payload.attribute;
            }
            if (action.payload.discipline != null) {
                event.discipline = action.payload.discipline;
            }

            if (action.payload.context === StepContext.CareerEvent1) {
                if (temp.careerEvents?.length) {
                    if (event.id === temp.careerEvents[0].id) {
                        event.focus = temp.careerEvents[0].focus;
                    }
                    temp.careerEvents[0] = event;
                } else {
                    temp.careerEvents.push(event);
                }
            } else if (action.payload.context === StepContext.CareerEvent2) {
                if (temp.careerEvents?.length > 1) {
                    if (event.id === temp.careerEvents[1].id) {
                        event.focus = temp.careerEvents[1].focus;
                    }
                    temp.careerEvents[1] = event;
                } else if (temp.careerEvents?.length === 1) {
                    temp.careerEvents.push(event);
                }
            }

            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_TYPE: {
            let temp = state.currentCharacter.copy();
            let originalType = temp.type;
            temp.type = action.payload.type;
            if (temp.type !== originalType) {
                if (temp.educationStep) {
                    temp.educationStep = undefined;
                }

                if (originalType === CharacterType.Child && temp.type !== CharacterType.Child) {
                    temp.age = AgeHelper.getAdultAge();
                } else if (originalType !== CharacterType.Child && temp.type === CharacterType.Child) {
                    temp.age = AgeHelper.getAllChildAges()[0];
                }
            }
            if (temp.type === CharacterType.Child && temp.supportingStep) {
                temp.supportingStep.supervisory = false;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case ADD_CHARACTER_UNTAPPED_POTENTIAL_ATTRIBUTE: {
            let temp = state.currentCharacter.copy();
            let talent = temp.getTalentByName(TALENT_NAME_UNTAPPED_POTENTIAL);
            if (talent) {
                talent.attribute = action.payload.attribute;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case ADD_CHARACTER_BORG_IMPLANT: {
            let temp = state.currentCharacter.copy();
            let talent = temp.getTalentByName(TALENT_NAME_BORG_IMPLANTS);
            if (talent) {
                talent.implants.push(action.payload.type);
                while (talent.implants.length > 3) {
                    talent.implants.splice(0, 1);
                }
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case REMOVE_CHARACTER_BORG_IMPLANT: {
            let temp = state.currentCharacter.copy();
            let talent = temp.getTalentByName(TALENT_NAME_BORG_IMPLANTS);
            if (talent) {
                const index = talent.implants.indexOf(action.payload.type);
                if (index >= 0) {
                    talent.implants.splice(index, 1);
                }
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case ADD_CHARACTER_SPECIES_ABILITY_FOCUS: {
            let temp = state.currentCharacter.copy();
            if (temp.speciesStep != null && temp.speciesStep?.abilityOptions == null) {
                temp.speciesStep.abilityOptions = new SpeciesAbilityOptions();
            }
            if (temp.speciesStep?.abilityOptions != null) {
                let index = action.payload.index;
                let focus = action.payload.focus;
                while (temp.speciesStep.abilityOptions.focuses.length < index) {
                    temp.speciesStep.abilityOptions.focuses[temp.speciesStep.abilityOptions.focuses.length] = "";
                }
                temp.speciesStep.abilityOptions.focuses[index] = focus;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case ADD_CHARACTER_TALENT_FOCUS: {
            let temp = state.currentCharacter.copy();
            let talent = temp.getTalentByName(action.payload.talent);
            if (talent) {
                const index = action.payload.index;
                for (let i = talent.focuses.length; i <= index; i++) {
                    talent.focuses.push("");
                }
                talent.focuses[index] = action.payload.focus;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case ADD_CHARACTER_TALENT_VALUE: {
            let temp = state.currentCharacter.copy();
            let talent = temp.getTalentByName(action.payload.talent);
            if (talent) {
                talent.value = action.payload.value;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case ADD_CHARACTER_TALENT: {
            let temp = state.currentCharacter.copy();
            let t = action.payload.talent;
            let talent = undefined;
            if (t != null && t instanceof SelectedTalent) {
                talent = (t as SelectedTalent).copy();
            } else if (t != null) {
                talent = new SelectedTalent((t as ITalent).name);
            }
            if (action.payload.context === StepContext.Species) {
                temp.speciesStep.talent = talent;
            } else if (action.payload.context === StepContext.EarlyOutlook) {
                temp.upbringingStep.talent = talent;
            } else if (action.payload.context === StepContext.Education) {
                temp.educationStep.talent = talent;
            } else if (action.payload.context === StepContext.Career) {
                let original = temp.careerStep;
                if (temp.careerStep == null) {
                    temp.careerStep = new CareerStep();
                }
                temp.careerStep.talent = talent;
                if (original?.talent?.talent === talent?.talent && talent != null) {
                    temp.careerStep.talent.attribute = original?.talent?.attribute;
                }
            } else if (action.payload.context === StepContext.FinishingTouches) {
                if (temp.finishingStep == null) {
                    temp.finishingStep = new FinishingStep();
                }
                temp.finishingStep.talent = talent;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_NAME: {
            let temp = state.currentCharacter.copy();
            temp.name = action.payload.name;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_PASTIME: {
            let temp = state.currentCharacter.copy();
            temp.pastime = [ action.payload.pastime ];
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_LINEAGE: {
            let temp = state.currentCharacter.copy();
            temp.lineage = action.payload.lineage;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_HOUSE: {
            let temp = state.currentCharacter.copy();
            temp.house = action.payload.house;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_ASSIGNED_SHIP: {
            let temp = state.currentCharacter.copy();
            temp.assignedShip = action.payload.assignedShip;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_ADDITIONAL_TRAITS: {
            let temp = state.currentCharacter.copy();
            temp.additionalTraits = action.payload.traits;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_RANK: {
            let temp = state.currentCharacter.copy();
            temp._rank = new CharacterRank(action.payload.name, action.payload.rank ?? undefined);
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_ROLE: {
            let temp = state.currentCharacter.copy();
            if (action.payload.role != null) {
                if (typeof action.payload.role === 'string') {
                    temp.role = undefined;
                    temp.secondaryRole = undefined;
                    temp.jobAssignment = action.payload.role;
                } else {
                    temp.role = action.payload.role;
                    temp.jobAssignment = undefined;

                    if (action.payload.secondaryRole != null) {
                        temp.secondaryRole = action.payload.secondaryRole;
                    } else {
                        temp.secondaryRole = undefined;
                    }
                }
            } else {
                temp.role = undefined;
                temp.secondaryRole = undefined;
                temp.jobAssignment = undefined;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_PRONOUNS: {
            let temp = state.currentCharacter.copy();
            temp.pronouns = action.payload.pronouns;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_VALUE: {
            let temp = state.currentCharacter.copy();
            if (temp.stereotype === Stereotype.SupportingCharacter) {
                if (temp.supportingStep == null) {
                    temp.supportingStep = new SupportingStep();
                }
                temp.supportingStep.value = action.payload.value;
            } else if (action.payload.context === StepContext.Environment && temp.environmentStep != null) {
                temp.environmentStep.value = action.payload.value;
            } else if (action.payload.context === StepContext.Education && temp.educationStep != null) {
                temp.educationStep.value = action.payload.value;
            } else if (action.payload.context === StepContext.Career && temp.careerStep != null) {
                temp.careerStep.value = action.payload.value;
            } else if (action.payload.context === StepContext.FinishingTouches && temp.finishingStep != null) {
                temp.finishingStep.value = action.payload.value;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case ADD_NPC_CHARACTER_VALUE: {
            let temp = state.currentCharacter.copy();
            if (temp.stereotype === Stereotype.Npc) {
                if (temp.npcGenerationStep == null) {
                    temp.npcGenerationStep = new NpcGenerationStep();
                }
                let index = action.payload.index ?? 0;
                for (let i = temp.npcGenerationStep.values.length; i <= index; i++) {
                    temp.npcGenerationStep.values.push("");
                }
                temp.npcGenerationStep.values[index] = action.payload.value;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_FOCUS: {
            let temp = state.currentCharacter.copy();
            if (temp.stereotype === Stereotype.SupportingCharacter) {
                if (temp.supportingStep == null) {
                    temp.supportingStep = new SupportingStep();
                }
                let index = action.payload.index ?? 0;
                for (let i = temp.supportingStep.focuses.length; i <= index; i++) {
                    temp.supportingStep.focuses.push("");
                }
                temp.supportingStep.focuses[index] = action.payload.focus;
            } else if (temp.stereotype === Stereotype.Npc) {
                if (temp.npcGenerationStep == null) {
                    temp.npcGenerationStep = new NpcGenerationStep();
                }
                let index = action.payload.index ?? 0;
                for (let i = temp.npcGenerationStep.focuses.length; i <= index; i++) {
                    temp.npcGenerationStep.focuses.push("");
                }
                temp.npcGenerationStep.focuses[index] = action.payload.focus;
            } else if (action.payload.context === StepContext.EarlyOutlook && temp.upbringingStep) {
                temp.upbringingStep.focus = action.payload.focus;
            } else if (action.payload.context === StepContext.Education && temp.educationStep && action.payload.index <= 2) {
                temp.educationStep.focuses[action.payload.index] = action.payload.focus;
            } else if (action.payload.context === StepContext.CareerEvent1 && temp.careerEvents[0]) {
                temp.careerEvents[0].focus = action.payload.focus;
            } else if (action.payload.context === StepContext.CareerEvent2 && temp.careerEvents[1]) {
                temp.careerEvents[1].focus = action.payload.focus;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_CAREER_EVENT_TRAIT: {
            let temp = state.currentCharacter.copy();
            if (action.payload.context === StepContext.CareerEvent1 && temp.careerEvents[0]) {
                temp.careerEvents[0].trait = action.payload.trait;
            } else if (action.payload.context === StepContext.CareerEvent2 && temp.careerEvents[1]) {
                temp.careerEvents[1].trait = action.payload.trait;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case MODIFY_CHARACTER_DISCIPLINE: {
            let temp = state.currentCharacter.copy();
            const discipline = action.payload.discipline;
            const positive = action.payload.positive;
            if (action.payload.context === StepContext.Environment && temp.environmentStep) {
                if (action.payload.positive) {
                    temp.environmentStep.discipline = action.payload.discipline;
                } else if (temp.environmentStep.discipline === action.payload.discipline) {
                    temp.environmentStep.discipline = undefined;
                }
            } else if (action.payload.context === StepContext.EarlyOutlook && temp.upbringingStep) {
                if (action.payload.positive) {
                    temp.upbringingStep.discipline = action.payload.discipline;
                } else if (temp.upbringingStep.discipline === action.payload.discipline) {
                    temp.upbringingStep.discipline = undefined;
                }
            } else if (action.payload.context === StepContext.Education && temp.educationStep) {
                if (action.payload.forceDecrement) {
                    if (positive) {
                        let value = temp.departments[discipline];
                        temp.educationStep.decrementDisciplines.splice(temp.educationStep.decrementDisciplines.indexOf(discipline), 1);
                        // if we're no longer decrementing a discipline that could only be incremented because of
                        // the previous decrement, then remove the increment
                        if (temp.departments[discipline] === value) {
                            if (temp.educationStep.disciplines.indexOf(discipline) >= 0) {
                                temp.educationStep.disciplines.splice(temp.educationStep.disciplines.indexOf(discipline), 1);
                            } else if (temp.educationStep.primaryDiscipline === discipline) {
                                temp.educationStep.primaryDiscipline = undefined;
                            }
                        }
                    } else {
                        temp.educationStep.decrementDisciplines.push(discipline)
                    }
                } else {
                    if (action.payload.positive) {
                        if (action.payload.primaryDisciplines.length > 0) {
                            temp.educationStep.primaryDiscipline = discipline;
                            action.payload.primaryDisciplines.forEach(d => {
                                if (temp.educationStep.disciplines.indexOf(d) >= 0) {
                                    temp.educationStep.disciplines.splice(temp.educationStep.disciplines.indexOf(d), 1);
                                }
                            });
                        } else if (temp.educationStep.decrementDisciplines.indexOf(discipline) >= 0 && temp.type !== CharacterType.Child) {
                            temp.educationStep.decrementDisciplines.splice(temp.educationStep.decrementDisciplines.indexOf(discipline), 1);
                        } else {
                            temp.educationStep.disciplines.push(discipline);
                        }
                    } else {
                        if (temp.educationStep.primaryDiscipline === discipline) {
                            temp.educationStep.primaryDiscipline = null;
                            action.payload.primaryDisciplines.forEach(d => {
                                if (temp.educationStep.disciplines.indexOf(d) >= 0) {
                                    temp.educationStep.disciplines.splice(temp.educationStep.disciplines.indexOf(d), 1);
                                }
                            });
                        } else if (temp.educationStep.disciplines.indexOf(discipline) >= 0) {
                            temp.educationStep.disciplines.splice(temp.educationStep.disciplines.indexOf(discipline), 1);
                        } else if (temp.type !== CharacterType.Child) {
                            temp.educationStep.decrementDisciplines.push(discipline);
                        }
                    }
                }
            } else if (action.payload.context === StepContext.CareerEvent1 && temp.careerEvents?.length > 0) {
                temp.careerEvents[0].discipline = positive ? discipline : undefined;
            } else if (action.payload.context === StepContext.CareerEvent2 && temp.careerEvents?.length > 1) {
                temp.careerEvents[1].discipline = positive ? discipline : undefined;
            } else if (action.payload.context === StepContext.FinishingTouches && temp.finishingStep) {
                if (positive) {
                    temp.finishingStep.disciplines.push(discipline);
                } else {
                    let index = temp.finishingStep.disciplines.indexOf(discipline);
                    if (index >= 0) {
                        temp.finishingStep.disciplines.splice(index, 1);
                    }
                }
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case MODIFY_CHARACTER_RANK: {
            let temp = state.currentCharacter.copy();
            if (temp.improvements == null) {
                temp.improvements = [];
            }
            temp.improvements.push(new Promotion(action.payload.rank, action.payload.type));
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case MODIFY_CHARACTER_ADD_ADVANCEMENT: {
            let temp = state.currentCharacter.copy();
            if (temp.improvements == null) {
                temp.improvements = [];
            }
            let improvement = new CharacterAdvancementStep();
            improvement.choice = action.payload.type;
            if (action.payload.type === CharacterAdvancementChoice.Talent) {
                improvement.value = (action.payload.value as SelectedTalent).copy();
                if (action.payload.remove != null) {
                    improvement.removeValue = (action.payload.remove as SelectedTalent).copy();
                }
                temp.improvements.push(improvement);
            } else {
                improvement.value = action.payload.value;
                if (action.payload.remove != null) {
                    improvement.removeValue = action.payload.remove;
                }
                temp.improvements.push(improvement);
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }

        default:
            return state;
    }
}

export default characterReducer;