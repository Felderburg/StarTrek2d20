import { CareerEventStep, CareerStep, Character, CharacterRank, EducationStep, EnvironmentStep, FinishingStep, SelectedTalent, SpeciesStep, UpbringingStep } from "../common/character";
import { Skill } from "../helpers/skills";
import { TALENT_NAME_BORG_IMPLANTS } from "../helpers/talents";
import { Track } from "../helpers/trackEnum";
import { ADD_CHARACTER_BORG_IMPLANT, ADD_CHARACTER_CAREER_EVENT, ADD_CHARACTER_TALENT, ADD_CHARACTER_TALENT_FOCUS, APPLY_NORMAL_MILESTONE_DISCIPLINE, APPLY_NORMAL_MILESTONE_FOCUS, MODIFY_CHARACTER_ATTRIBUTE, MODIFY_CHARACTER_DISCIPLINE, MODIFY_CHARACTER_RANK, MODIFY_CHARACTER_REPUTATION, REMOVE_CHARACTER_BORG_IMPLANT, SET_CHARACTER, SET_CHARACTER_ADDITIONAL_TRAITS, SET_CHARACTER_ASSIGNED_SHIP, SET_CHARACTER_CAREER_LENGTH, SET_CHARACTER_EARLY_OUTLOOK, SET_CHARACTER_EDUCATION, SET_CHARACTER_ENVIRONMENT, SET_CHARACTER_FINISHING_TOUCHES, SET_CHARACTER_FOCUS, SET_CHARACTER_HOUSE, SET_CHARACTER_LINEAGE, SET_CHARACTER_NAME, SET_CHARACTER_PRONOUNS, SET_CHARACTER_RANK, SET_CHARACTER_ROLE, SET_CHARACTER_SPECIES, SET_CHARACTER_TYPE, SET_CHARACTER_VALUE, StepContext } from "./characterActions";

interface CharacterState {
    currentCharacter?: Character;
    isModified: boolean
}

const trackDefaults = (track: Track, step: EducationStep) => {
    switch (track) {
        case Track.EnlistedSecurityTraining:
            step.primaryDiscipline = Skill.Security;
            step.disciplines = [ Skill.Security, Skill.Conn ];
            step.focuses[2] = "Chain of Command";
            break;
        case Track.ShipOperations:
            step.primaryDiscipline = Skill.Conn;
            step.disciplines = [ Skill.Engineering, Skill.Science ];
            break;
        case Track.UniversityAlumni:
            step.primaryDiscipline = Skill.Science;
            step.disciplines = [ Skill.Engineering, Skill.Command ];
            break;
        case Track.ResearchInternship:
            step.primaryDiscipline = Skill.Science;
            step.disciplines = [ Skill.Engineering, Skill.Medicine ];
            break;
        default:
            break;
    }
}

const characterReducer = (state: CharacterState = { currentCharacter: undefined, isModified: false }, action) => {
    switch (action.type) {

        case SET_CHARACTER: {
            let temp = action.payload.character.copy();
            temp.clearMementos();
            return {
                ...state,
                currentCharacter: temp,
                isModified: false
            }
        }
        case SET_CHARACTER_SPECIES: {
            let temp = state.currentCharacter.copy();
            temp.speciesStep = new SpeciesStep(action.payload.species);
            if (action.payload.attributes) {
                temp.speciesStep.attributes = action.payload.attributes;
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
                    temp.educationStep.decrementDiscipline = originalStep.decrementDiscipline;
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

                if (temp.attributeTotal < 56) {
                    temp.finishingStep.attributes = [];
                }
                if (temp.skillTotal < 16) {
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
            const increase = action.payload.increase;
            if (action.payload.context === StepContext.Species && temp.speciesStep) {
                if (increase) {
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
                if (increase) {
                    temp.environmentStep.attribute = action.payload.attribute;
                } else if (temp.environmentStep.attribute === action.payload.attribute) {
                    temp.environmentStep.attribute = undefined;
                }
            } else if (action.payload.context === StepContext.Education && temp.educationStep) {
                if (increase) {
                    temp.educationStep.attributes.push(action.payload.attribute)
                } else if (temp.educationStep.attributes.indexOf(action.payload.attribute) >= 0) {
                    temp.educationStep.attributes.splice(temp.educationStep.attributes.indexOf(action.payload.attribute), 1);
                }
            } else if (action.payload.context === StepContext.CareerEvent1 && temp.careerEvents?.length > 0) {
                temp.careerEvents[0].attribute = increase ? attribute : undefined;
            } else if (action.payload.context === StepContext.CareerEvent2 && temp.careerEvents?.length > 1) {
                temp.careerEvents[1].attribute = increase ? attribute : undefined;
            } else if (action.payload.context === StepContext.FinishingTouches && temp.finishingStep) {
                if (increase) {
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
            if (temp.type !== originalType && temp.educationStep) {
                temp.educationStep = undefined;
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
        case ADD_CHARACTER_TALENT: {
            let temp = state.currentCharacter.copy();
            let talent = new SelectedTalent(action.payload.talent);
            if (action.payload.context === StepContext.Species) {
                temp.speciesStep.talent = talent;
            } else if (action.payload.context === StepContext.EarlyOutlook) {
                temp.upbringingStep.talent = talent;
            } else if (action.payload.context === StepContext.Education) {
                temp.educationStep.talent = talent;
            } else if (action.payload.context === StepContext.Career) {
                temp.careerStep.talent = talent;
            } else if (action.payload.context === StepContext.FinishingTouches) {
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
            temp.rank = new CharacterRank(action.payload.name, action.payload.rank ?? undefined);
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

                    if (action.payload.secondaryRole) {
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
            if (action.payload.context === StepContext.Environment && temp.environmentStep != null) {
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
        case SET_CHARACTER_FOCUS: {
            let temp = state.currentCharacter.copy();
            if (action.payload.context === StepContext.EarlyOutlook && temp.upbringingStep) {
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
        case MODIFY_CHARACTER_DISCIPLINE: {
            let temp = state.currentCharacter.copy();
            const discipline = action.payload.discipline;
            const increase = action.payload.increase;
            if (action.payload.context === StepContext.Environment && temp.environmentStep) {
                if (action.payload.increase) {
                    temp.environmentStep.discipline = action.payload.discipline;
                } else if (temp.environmentStep.discipline === action.payload.discipline) {
                    temp.environmentStep.discipline = undefined;
                }
            } else if (action.payload.context === StepContext.EarlyOutlook && temp.upbringingStep) {
                if (action.payload.increase) {
                    temp.upbringingStep.discipline = action.payload.discipline;
                } else if (temp.upbringingStep.discipline === action.payload.discipline) {
                    temp.upbringingStep.discipline = undefined;
                }
            } else if (action.payload.context === StepContext.Education && temp.educationStep) {
                if (action.payload.increase) {
                    if (action.payload.primaryDisciplines.length > 0) {
                        temp.educationStep.primaryDiscipline = discipline;
                        action.payload.primaryDisciplines.forEach(d => {
                            if (temp.educationStep.disciplines.indexOf(d) >= 0) {
                                temp.educationStep.disciplines.splice(temp.educationStep.disciplines.indexOf(d), 1);
                            }
                        });
                    } else if (temp.educationStep.decrementDiscipline === discipline) {
                        temp.educationStep.decrementDiscipline = null;
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
                    } else {
                        temp.educationStep.decrementDiscipline = discipline;
                    }
                }
            } else if (action.payload.context === StepContext.CareerEvent1 && temp.careerEvents?.length > 0) {
                temp.careerEvents[0].discipline = increase ? discipline : undefined;
            } else if (action.payload.context === StepContext.CareerEvent2 && temp.careerEvents?.length > 1) {
                temp.careerEvents[1].discipline = increase ? discipline : undefined;
            } else if (action.payload.context === StepContext.FinishingTouches && temp.finishingStep) {
                if (increase) {
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
        case MODIFY_CHARACTER_REPUTATION: {
            let temp = state.currentCharacter.copy();
            temp.reputation += action.payload.delta;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case MODIFY_CHARACTER_RANK: {
            let temp = state.currentCharacter.copy();
            temp.rank = action.payload.rank;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case APPLY_NORMAL_MILESTONE_DISCIPLINE: {
            let temp = state.currentCharacter.copy();
            temp.skills[action.payload.decrease].expertise -= 1;
            temp.skills[action.payload.increase].expertise += 1;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case APPLY_NORMAL_MILESTONE_FOCUS: {
            let temp = state.currentCharacter.copy();
            let index = temp.focuses.indexOf(action.payload.removeFocus);
            if (index >= 0) {
                temp.focuses.splice(index, 1);
            }
            temp.focuses.push(action.payload.addFocus);
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