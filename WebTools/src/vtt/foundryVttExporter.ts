import { Character } from "../common/character";
import { CharacterSerializer } from "../common/characterSerializer";
import { ShipBuildType, Starship } from "../common/starship";
import { Attribute, AttributesHelper } from "../helpers/attributes";
import { Role, RoleModel, RolesHelper } from "../helpers/roles";
import { DepartmentsHelper, Department } from "../helpers/department";
import { CHALLENGE_DICE_NOTATION } from "../common/challengeDiceNotation";
import { TALENT_NAME_UNTAPPED_POTENTIAL, TalentModel } from "../helpers/talents";
import { DeliverySystem, EnergyLoadType, InjuryType, PersonalWeapons, Quality, TorpedoLoadType, Weapon, WeaponRange, WeaponType } from "../helpers/weapons";
import { allSystems, System } from "../helpers/systems";
import { Spaceframe } from "../helpers/spaceframeEnum";
import { Species } from "../helpers/speciesEnum";
import { EquipmentModel } from "../helpers/equipment";
import { Construct } from "../common/construct";
import { CareerEventsHelper } from "../helpers/careerEvents";
import { CareersHelper } from "../helpers/careers";
import { CharacterTypeModel } from "../common/characterType";
import { TracksHelper } from "../helpers/tracks";
import { SpeciesAbility } from "../helpers/speciesAbility";
import { markupToHtml } from "./markupToHtml";
import { FoundryPluginType } from "./foundryPluginType";
import { marshaller } from "../helpers/marshaller";
import { SelectedTalent } from "../common/selectedTalent";

const DEFAULT_STARSHIP_ICON = "systems/sta/assets/icons/ship_icon.png";
const DEFAULT_EQUIPMENT_ICON = "systems/sta/assets/icons/voyagercombadgeicon.svg";

export class FoundryVttExporter {

    private static _instance: FoundryVttExporter;

    static get instance() {
        if (FoundryVttExporter._instance == null) {
            FoundryVttExporter._instance = new FoundryVttExporter();
        }
        return FoundryVttExporter._instance;
    }

    exportStarship(starship: Starship, type: FoundryPluginType) {
        let now = Date.now();

        let result = {
            "name": starship.name || "Unnamed Starship",
            "type": "starship",
            "img": this.determineStarshipIcon(starship),
            "system": {
                "notes": "",
                "crew": {
                    "value": starship.crewSupport,
                    "max": starship.crewSupport
                },
                "departments": {
                },
                "designation": starship.registry ?? "",
                "missionprofile": starship.missionProfileStep?.type?.localizedName ?? "",
                "power": {
                  "value": starship.power,
                  "max": starship.power
                },
                "refit": starship.refitsAsString(),
                "resistance": starship.resistance,
                "scale": starship.scale,
                "shields": {
                  "value": starship.shields,
                  "max": starship.shields
                },
                "servicedate": starship.serviceYear ?? "",
                "spaceframe": starship.className ?? "",
                "systems": {
                },
                "traits": starship.getAllTraits()
            },
            "items": [],
            "effects": [],
            "flags": {
              "exportSource": {
                "world": "sta-bcholmes-org",
                "system": "sta",
                "coreVersion": "10.291",
                "systemVersion": "1.1.9"
              }
            },
            "_stats": {
              "systemId": "sta",
              "systemVersion": "1.1.9",
              "coreVersion": "10.291",
              "createdTime": now,
              "modifiedTime": now,
              "lastModifiedBy": "xuN9JpdcyRd60ZEJ"
            }
        }

        DepartmentsHelper.instance.getDepartments().forEach(d => {
            let name = Department[d].toLowerCase();
            result.system.departments[name] = {
                "label": "sta.actor.starship.department." + name,
                "value": ("" + starship.departments[d]),
                "selected": false
            };
        });

        allSystems().forEach(s => {
            let name = System[s].toLowerCase();
            if (s === System.Comms) {
                name = "communications";
            } else if (s === System.Computer) {
                name = "computers";
            }
            result.system.systems[name] = {
                "label": "sta.actor.starship.system." + name,
                "value": ("" + starship.systems[s]),
                "selected": false
            };
        });

        let handledTalents = [];
        Object.values(starship.talents).forEach(t => {
            let rank = starship.getRankForTalent(t.name);
            if (t.talentModel.maxRank === 1 || !handledTalents.includes(t.name)) {
                result.items.push({
                    "name": t.displayName + ((t.talentModel.maxRank > 1 && rank > 1) ? " [x" + rank + "]" : ""),
                    "type": "talent",
                    "img": this.determineTalentIcon(t.talentModel),
                    "system": {
                        "description": this.convertDescription(t, starship),
                        "talenttype": {
                            "typeenum": "general",
                            "description": "",
                            "minimum": 0
                        }
                    },
                    "effects": [],
                    "flags": {},
                    "_stats": {
                        "systemId": "sta",
                        "systemVersion": "1.1.9",
                        "coreVersion": "10.291",
                        "createdTime": now,
                        "modifiedTime": now,
                        "lastModifiedBy": "xuN9JpdcyRd60ZEJ"
                    },
                    "folder": null,
                    "sort": 0,
                    "ownership": {
                        "default": 0,
                        "xuN9JpdcyRd60ZEJ": 3
                    }
                });
            }
            handledTalents.push(t.name);
        });

        starship.determineWeapons().forEach(w => {
            if (w.type !== WeaponType.CAPTURE) {
                result.items.push({
                    "name": w.name,
                    "type": "starshipweapon",
                    "img": this.determineStarshipWeaponIcon(w),
                    "effects": [],
                    "folder": null,
                    "sort": 0,
                    "system": {
                        "description": "",
                        "damage": w.dice,
                        "range": w.range != null ? WeaponRange[w.range].toLowerCase() : null,
                        "qualities": {
                        "area": w.isQualityPresent(Quality.Area),
                        "spread": false,
                        "dampening": w.isQualityPresent(Quality.Dampening),
                        "calibration": w.isQualityPresent(Quality.Calibration),
                        "devastating": w.isQualityPresent(Quality.Devastating),
                        "highyield": w.isQualityPresent(Quality.HighYield),
                        "persistentx": w.isQualityPresent(Quality.PersistentX) ? starship.scale : 0,
                        "piercingx": w.getRankForQuality(Quality.Piercing),
                        "viciousx": w.getRankForQuality(Quality.Vicious),
                        "hiddenx": w.getRankForQuality(Quality.Hidden),
                        "versatilex": w.getRankForQuality(Quality.Versatile)
                        },
                        "opportunity": null,
                        "escalation": null
                    },
                    "ownership": {
                    "default": 0,
                    "xuN9JpdcyRd60ZEJ": 3
                    },
                    "_stats": {
                    "systemId": "sta",
                    "systemVersion": "1.1.9",
                    "coreVersion": "10.291",
                    "createdTime": now,
                    "modifiedTime": now,
                    "lastModifiedBy": "xuN9JpdcyRd60ZEJ"
                    }
                });
            }
        });

        return result;
    }


    determineStarshipIcon(starship: Starship) {
        if (starship.buildType === ShipBuildType.Runabout) {
            return "systems/sta/assets/compendia/ships/starfleet/danube-runabout-token.webp";

        } else if (starship.spaceframeModel?.id === Spaceframe.Akira ||
            starship.spaceframeModel?.id === Spaceframe.Akira_UP) {
            return "systems/sta/assets/compendia/ships/starfleet/akira-token.webp";
        } else if (starship.spaceframeModel?.id === Spaceframe.Constitution ||
            starship.spaceframeModel?.id === Spaceframe.Constitution_UP) {
                return "systems/sta/assets/compendia/ships/starfleet/constitution-token.webp";
        } else if (starship.spaceframeModel?.id === Spaceframe.Constellation ||
            starship.spaceframeModel?.id === Spaceframe.Constellation_UP) {
                return "systems/sta/assets/compendia/ships/starfleet/constellation-token.webp";
        } else if (starship.spaceframeModel?.id === Spaceframe.Defiant ||
            starship.spaceframeModel?.id === Spaceframe.Defiant_UP) {
                return "systems/sta/assets/compendia/ships/starfleet/defiant-token.webp";
        } else if (starship.spaceframeModel?.id === Spaceframe.Excelsior ||
            starship.spaceframeModel?.id === Spaceframe.Excelsior_UP) {
                return "systems/sta/assets/compendia/ships/starfleet/excelsior-token.webp";
        } else if (starship.spaceframeModel?.id === Spaceframe.Galaxy) {
            return "systems/sta/assets/compendia/ships/starfleet/galaxy-token.webp";
        } else if (starship.spaceframeModel?.id === Spaceframe.Intrepid ||
            starship.spaceframeModel?.id === Spaceframe.Intrepid_UP) {
            return "systems/sta/assets/compendia/ships/starfleet/intrepid-token.webp";
        } else if (starship.spaceframeModel?.id === Spaceframe.Miranda ||
            starship.spaceframeModel?.id === Spaceframe.Miranda_UP) {
            return "systems/sta/assets/compendia/ships/starfleet/miranda-token.webp";
        } else if (starship.spaceframeModel?.id === Spaceframe.Nova) {
            return "systems/sta/assets/compendia/ships/starfleet/nova-token.webp";

        } else if (starship.spaceframeModel?.id === Spaceframe.Brel) {
            return "systems/sta/assets/compendia/ships/klingon/b-rel-token.webp";
        } else if (starship.spaceframeModel?.id === Spaceframe.D7) {
            return "systems/sta/assets/compendia/ships/klingon/d7-battle-cruiser-token.webp";
        } else if (starship.spaceframeModel?.id === Spaceframe.KVort) {
            return "systems/sta/assets/compendia/ships/klingon/k-vort-token.webp";
        } else if (starship.spaceframeModel?.id === Spaceframe.VorCha) {
            return "systems/sta/assets/compendia/ships/klingon/vor-cha-token.webp";
        } else if (starship.spaceframeModel?.id === Spaceframe.DKora) {
            return "systems/sta/assets/compendia/ships/ferengi/d-kora-token.webp";

        } else if (starship.spaceframeModel?.id === Spaceframe.Tliss) {
            return "systems/sta/assets/compendia/ships/romulan/bird-of-prey-token.webp";
        } else if (starship.spaceframeModel?.id === Spaceframe.DDeridex) {
            return "systems/sta/assets/compendia/ships/romulan/d-deridex-token.webp";

        } else if (starship.spaceframeModel?.id === Spaceframe.Galor) {
            return "systems/sta/assets/compendia/ships/cardassian/galor-token.webp";
        } else {
            return DEFAULT_STARSHIP_ICON;
        }
    }

    determineStarshipWeaponIcon(weapon: Weapon) {
        let filename = '';
        if (weapon.type === WeaponType.ENERGY) {
            if (weapon.loadType.type === EnergyLoadType.Disruptor) {
                filename = "weapon-disruptor";
            } else if (weapon.loadType.type === EnergyLoadType.Phaser) {
                filename = "weapon-phaser";
            } else if (weapon.loadType.type === EnergyLoadType.PhasedPolaron) {
                filename = "weapon-polaron";
            }
            if (filename !== '') {
                if (weapon.deliveryType.type === DeliverySystem.Arrays) {
                    filename += "-array";
                } else if (weapon.deliveryType.type === DeliverySystem.Banks) {
                    filename += "-bank";
                } else if (weapon.deliveryType.type === DeliverySystem.Cannons) {
                    filename += "-cannon";
                }
                return "systems/sta/assets/compendia/icons/starshipweapons-core/" + filename + ".svg";
            } else {
                return DEFAULT_EQUIPMENT_ICON;
            }
        } else if (weapon.type === WeaponType.TORPEDO) {
            if (weapon.loadType.type === TorpedoLoadType.Photon) {
                return "systems/sta/assets/compendia/icons/starshipweapons-core/weapon-photon-torpedo.svg";
            } else if (weapon.loadType.type === TorpedoLoadType.Plasma) {
                return "systems/sta/assets/compendia/icons/starshipweapons-core/weapon-plasma-torpedo.svg";
            } else if (weapon.loadType.type === TorpedoLoadType.Quantum) {
                return "systems/sta/assets/compendia/icons/starshipweapons-core/weapon-quantum-torpedo.svg";
            } else {
                return DEFAULT_EQUIPMENT_ICON;
            }
        } else {
            return DEFAULT_EQUIPMENT_ICON;
        }
    }


    exportCharacter(character: Character, type: FoundryPluginType) {
        let now = Date.now();
        let result = {
            "name": character.name || "Unnamed Character",
            "type": "character",
            "img": "icons/svg/mystery-man.svg",
            "system": {
                "notes": this.convertCharacterDescription(character),
                "assignment": character.assignedShip,
                "attributes": {
                },
                "careerevents": character
                    .careerEvents
                    .map(e => CareerEventsHelper.getCareerEvent(e.id, character.type, character.version)?.localizedName)
                    .filter(e => e?.length)
                    .join(", "),
                "characterrole": character.assignmentWithoutShip,
                "careerpath": this.convertCareerPath(character),
                "determination": {
                    "value": 1,
                    "max": 3
                },
                "disciplines": {
                },
                "experience": character.careerStep?.career != null
                    ? (CareersHelper.instance.getCareer(character.careerStep?.career, character)?.localizedName ?? "")
                    : "",
                "milestones": "",
                "pastimes": character.pastime?.length ? character.pastime.join(", ") : "",
                "pronouns": character.pronouns ?? "",
                "rank": character.rank?.name ?? "",
                "reputation": character.reputation,
                "stress": {
                    "value": character.stress,
                    "max": character.stress
                },
                "traits": character.getAllTraits()
            },
            "items": [],
            "effects": [],
            "flags": {
              "exportSource": {
                "world": "sta-bcholmes-org",
                "system": "sta",
                "coreVersion": "10.291",
                "systemVersion": "1.1.9"
              }
            },
            "_stats": {
              "systemId": "sta",
              "systemVersion": "1.1.9",
              "coreVersion": "10.291",
              "createdTime": now,
              "modifiedTime": now,
              "lastModifiedBy": "xuN9JpdcyRd60ZEJ"
            }
        }

        DepartmentsHelper.instance.getDepartments().forEach(d => {
            let name = Department[d].toLowerCase();
            result.system.disciplines[name] = {
                "label": "sta.actor.character.discipline." + name,
                "value": ("" + character.departments[d]),
                "selected": false
            };
        });

        AttributesHelper.getAllAttributes().forEach(a => {
            let name = Attribute[a].toLowerCase();
            result.system.attributes[name] = {
                "label": "sta.actor.character.attribute." + name,
                "value": ("" + character.attributes[a]),
                "selected": false
            };
        });

        if (character.environmentStep) {
            result.system["environment"] = CharacterSerializer.serializeEnvironment(character.environmentStep?.environment, character.environmentStep?.otherSpecies, character.type);
        } else {
            result.system["environment"] = "";
        }
        result.system["species"] = character.speciesName;

        if (character.upbringingStep) {
            result.system["upbringing"] = character.upbringingStep?.description;
        } else {
            result.system["upbringing"] = "";
        }

        character.values?.forEach(v => {
            result.items.push({
                "name": v,
                "type": "value",
                "img": this.determineValueIcon(v),
                "system": {
                  "description": "",
                  "used": false
                },
                "effects": [],
                "folder": null,
                "sort": 0,
                "ownership": {
                  "default": 0,
                  "xuN9JpdcyRd60ZEJ": 3
                },
                "flags": {},
                "_stats": {
                  "systemId": "sta",
                  "systemVersion": "1.1.9",
                  "coreVersion": "10.291",
                  "createdTime": now,
                  "modifiedTime": now,
                  "lastModifiedBy": "xuN9JpdcyRd60ZEJ"
                }
              },)
        });

        character.focuses?.forEach(f => {
            result.items.push({
                "name": f,
                "type": "focus",
                "img": this.determineFocusIcon(f),
                "system": {
                  "description": ""
                },
                "effects": [],
                "folder": null,
                "sort": 0,
                "ownership": {
                  "default": 0,
                  "xuN9JpdcyRd60ZEJ": 3
                },
                "flags": {},
                "_stats": {
                  "systemId": "sta",
                  "systemVersion": "1.1.9",
                  "coreVersion": "10.291",
                  "createdTime": now,
                  "modifiedTime": now,
                  "lastModifiedBy": "xuN9JpdcyRd60ZEJ"
                }
              },)
        });

        character.equipmentAndImplants?.forEach(e => {
            let item = {
                "name": e.name,
                "type": (e instanceof EquipmentModel && e.isArmour) ? "armor" : "item",
                "img": this.determineItemIcon(e.name),
                "system": {
                  "description": "",
                  "quantity": 1,
                  "opportunity": 0,
                  "escalation": 0
                },
                "effects": [],
                "folder": null,
                "sort": 0,
                "ownership": {
                  "default": 0,
                  "xuN9JpdcyRd60ZEJ": 3
                },
                "flags": {},
                "_stats": {
                  "systemId": "sta",
                  "systemVersion": "1.1.9",
                  "coreVersion": "10.291",
                  "createdTime": now,
                  "modifiedTime": now,
                  "lastModifiedBy": "xuN9JpdcyRd60ZEJ"
                }
            };

            if (item.type === "armor") {
                item.system["protection"] = 1;
            }
            result.items.push(item);
        });

        if (character.role != null) {
            let role = RolesHelper.instance.getRoleModelByName(character.role, character.type);
            if (role) {
                result.items.push({
                    "name": role.name,
                    "type": "talent",
                    "img": this.determineRoleIcon(role),
                    "system": {
                      "description": "<p>" + role.description + "</p>",
                      "talenttype": {
                        "typeenum": "general",
                        "description": "",
                        "minimum": 0
                      }
                    },
                    "effects": [],
                    "flags": {},
                    "_stats": {
                      "systemId": "sta",
                      "systemVersion": "1.1.9",
                      "coreVersion": "10.291",
                      "createdTime": now,
                      "modifiedTime": now,
                      "lastModifiedBy": "xuN9JpdcyRd60ZEJ"
                    },
                    "folder": null,
                    "sort": 0,
                    "ownership": {
                      "default": 0,
                      "xuN9JpdcyRd60ZEJ": 3
                    }
                });
            }
        }

        let talents = character.rankedTalents;
        talents.forEach(s => {
            let talent = s.talentModel;
            if (talent) {
                result.items.push({
                    "name": s.displayNameWithMultiple,
                    "type": "talent",
                    "img": this.determineTalentIcon(talent),
                    "system": {
                        "description": this.convertDescription(s, character),
                        "talenttype": {
                            "typeenum": this.determineTalentType(talent),
                            "description": this.determineTalentRequirement(talent),
                            "minimum": 0
                        }
                    },
                    "effects": [],
                    "flags": {},
                    "_stats": {
                        "systemId": "sta",
                        "systemVersion": "1.1.9",
                        "coreVersion": "10.291",
                        "createdTime": now,
                        "modifiedTime": now,
                        "lastModifiedBy": "xuN9JpdcyRd60ZEJ"
                    },
                    "folder": null,
                    "sort": 0,
                    "ownership": {
                        "default": 0,
                        "xuN9JpdcyRd60ZEJ": 3
                    }
                });
            }
        });

        if (character.speciesStep?.ability) {
            const ability = character.speciesStep?.ability;
            result.items.push({
                "name": ability.name + " (Species Ability)",
                "type": "talent",
                "img": this.determineTalentIcon(ability),
                "system": {
                    "description": this.convertDescription(ability, character),
                    "talenttype": {
                        "typeenum": "Species",
                        "description": "",
                        "minimum": 0
                    }
                },
                "effects": [],
                "flags": {},
                "_stats": {
                    "systemId": "sta",
                    "systemVersion": "1.1.9",
                    "coreVersion": "10.291",
                    "createdTime": now,
                    "modifiedTime": now,
                    "lastModifiedBy": "xuN9JpdcyRd60ZEJ"
                },
                "folder": null,
                "sort": 0,
                "ownership": {
                    "default": 0,
                    "xuN9JpdcyRd60ZEJ": 3
                }
            });
        }

        character.determineWeapons().forEach(w => {
            result.items.push({
                "name": w.name,
                "type": (character.version === 1 || type === FoundryPluginType.ELH)
                    ? "characterweapon"
                    : "characterweapon2e",
                "img": this.determineWeaponIcon(w, character),
                "effects": [],
                "folder": null,
                "sort": 0,
                "system": {
                  "description": "",
                  "damage": w.dice,
                  "severity": w.dice,
                  "range": w.type === WeaponType.ENERGY ? "Ranged" : "Melee",
                  "hands": w.hands ?? 1,
                  "qualities": {
                    "area": false,
                    "intense": false,
                    "knockdown": w.isQualityPresent(Quality.Knockdown),
                    "accurate": false,
                    "charge": w.isQualityPresent(Quality.Charge),
                    "cumbersome": false,
                    "deadly": w.injuryType === InjuryType.Deadly || w.injuryType === InjuryType.StunOrDeadly,
                    "debilitating": false,
                    "grenade": false,
                    "inaccurate": false,
                    "nonlethal": w.isQualityPresent(Quality.NonLethal),
                    "hiddenx": w.getRankForQuality(Quality.Hidden),
                    "piercingx": w.getRankForQuality(Quality.Piercing),
                    "viciousx": w.getRankForQuality(Quality.Vicious),
                    "opportunity": 0,
                    "escalation": 0,
                    "stun": w.injuryType === InjuryType.Stun || w.injuryType === InjuryType.StunOrDeadly
                  },
                  "opportunity": null,
                  "escalation": null
                },
                "ownership": {
                  "default": 0,
                  "xuN9JpdcyRd60ZEJ": 3
                },
                "_stats": {
                  "systemId": "sta",
                  "systemVersion": "1.1.9",
                  "coreVersion": "10.291",
                  "createdTime": now,
                  "modifiedTime": now,
                  "lastModifiedBy": "xuN9JpdcyRd60ZEJ"
                }
            });
        });

        return result;
    }

    convertCharacterDescription(character: Character) {
        let result = "";
        if (character.description?.length) {
            let paragraphs = character.description.split("\n").filter(s => s?.length);
            paragraphs.forEach(p => {
                result += "<p>";
                result += p;
                result += "</p>";
            });
        }

        result += "<p><a href=\""
            + "https://sta.bcholmes.org/view?s="
            + marshaller.encodeCharacter(character)
            + "\">Original sheet.</a></p>";
        return result;
    }

    convertCareerPath(character: Character) {
        let path = CharacterTypeModel.getByType(character.type)?.localizedName ?? "";
        if (character.educationStep) {
            path += " / " + TracksHelper.instance.getTrack(character.educationStep?.track, character.type, character.version).localizedName;
        }
        return path;
    }

    determineFocusIcon(focus: string) {
        return "systems/sta/assets/compendia/icons/focuses-core/focus-core.svg";
    }

    determineItemIcon(item: string) {
        if (item === "Communicator") {
            return "systems/sta/assets/compendia/icons/items-core/communicator.webp";
        } else if (item === "Tricorder") {
            return "systems/sta/assets/compendia/icons/items-core/tricorder.webp";
        } else if (item === "MedKit") {
            return "systems/sta/assets/compendia/icons/items-core/medkit.webp";
        } else if (item === "Engineering Kit") {
            return "systems/sta/assets/compendia/icons/items-core/engineering_kit.webp";
        } else {
            return "systems/sta/assets/compendia/icons/items-core/placeholder.webp";
        }
    }

    determineRoleIcon(role: RoleModel) {
        if (role.id === Role.ChiefEngineer) {
            return "systems/sta/assets/compendia/icons/roles-core/role-chief-engineer.svg";
        } else if (role.id === Role.ChiefMedicalOfficer) {
            return "systems/sta/assets/compendia/icons/roles-core/role-chief-medical-officer.svg";
        } else if (role.id === Role.ChiefOfSecurity) {
            return "systems/sta/assets/compendia/icons/roles-core/role-chief-of-security.svg";
        } else if (role.id === Role.CommandingOfficer) {
            return "systems/sta/assets/compendia/icons/roles-core/role-commanding-officer.svg";
        } else if (role.id === Role.CommunicationsOfficer) {
            return "systems/sta/assets/compendia/icons/roles-core/role-communications-officer.svg";
        } else if (role.id === Role.ExecutiveOfficer) {
            return "systems/sta/assets/compendia/icons/roles-core/role-executive-officer.svg";
        } else if (role.id === Role.FlightController) {
            return "systems/sta/assets/compendia/icons/roles-core/role-flight-controller.svg";
        } else if (role.id === Role.OperationsManager) {
            return "systems/sta/assets/compendia/icons/roles-core/role-operations-manager.svg";
        } else if (role.id === Role.ScienceOfficer) {
            return "systems/sta/assets/compendia/icons/roles-core/role-science-officer.svg";
        } else if (role.id === Role.ShipsCounselor) {
            return "systems/sta/assets/compendia/icons/roles-core/role-ships-counsellor.svg";
        } else {
            return DEFAULT_EQUIPMENT_ICON;
        }
    }

    determineTalentIcon(talent: TalentModel|SpeciesAbility) {
        if (talent instanceof TalentModel) {

            if (talent.category === "Command") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-command.svg";
            } else if (talent.category === "Conn") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-conn.svg";
            } else if (talent.category === "Security") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-security.svg";
            } else if (talent.category === "Science") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-science.svg";
            } else if (talent.category === "Medical") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-medical.svg";
            } else if (talent.category === "Andorian") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-andorian.svg";
            } else if (talent.category === "Bajoran") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-bajoran.svg";
            } else if (talent.category === "Betazoid") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-betazoid.svg";
            } else if (talent.category === "Borg") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-borg.svg";
            } else if (talent.category === "Cardassian") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-cardassian.svg";
            } else if (talent.category === "Denobulan") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-denobulan.svg";
            } else if (talent.category === "Ferengi") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-ferengi.svg";
            } else if (talent.category === "Human") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-human.svg";
            } else if (talent.category === "Klingon") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-klingon.svg";
            } else if (talent.category === "Romulan") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-romulan.svg";
            } else if (talent.category === "Tellarite") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-tellarite.svg";
            } else if (talent.category === "Trill") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-trill.svg";
            } else if (talent.category === "Vulcan") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-vulcan.svg";
            } else if (talent.category === "Starship") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-ship.svg";
            } else if (talent.name === TALENT_NAME_UNTAPPED_POTENTIAL) {
                return "systems/sta/assets/compendia/icons/talents-core/talent-career-young.svg";
            } else if (talent.name === "Veteran") {
                return "systems/sta/assets/compendia/icons/talents-core/talent-veteran.svg";
            } else {
                return "systems/sta/assets/compendia/icons/talents-core/talent-core.svg";
            }
        } else {
            const abiility = talent as SpeciesAbility;
            if (abiility.species === Species.Andorian) {
                return "systems/sta/assets/compendia/icons/talents-core/talent-andorian.svg";
            } else if (abiility.species === Species.Bajoran) {
                return "systems/sta/assets/compendia/icons/talents-core/talent-bajoran.svg";
            } else if (abiility.species === Species.Betazoid) {
                return "systems/sta/assets/compendia/icons/talents-core/talent-betazoid.svg";
            } else if (abiility.species === Species.Cardassian) {
                return "systems/sta/assets/compendia/icons/talents-core/talent-cardassian.svg";
            } else if (abiility.species === Species.Denobulan) {
                return "systems/sta/assets/compendia/icons/talents-core/talent-denobulan.svg";
            } else if (abiility.species === Species.Ferengi) {
                return "systems/sta/assets/compendia/icons/talents-core/talent-ferengi.svg";
            } else if (abiility.species === Species.Human) {
                return "systems/sta/assets/compendia/icons/talents-core/talent-human.svg";
            } else if (abiility.species === Species.Klingon) {
                return "systems/sta/assets/compendia/icons/talents-core/talent-klingon.svg";
            } else if (abiility.species === Species.Romulan) {
                return "systems/sta/assets/compendia/icons/talents-core/talent-romulan.svg";
            } else if (abiility.species === Species.Tellarite) {
                return "systems/sta/assets/compendia/icons/talents-core/talent-tellarite.svg";
            } else if (abiility.species === Species.Trill) {
                return "systems/sta/assets/compendia/icons/talents-core/talent-trill.svg";
            } else if (abiility.species === Species.Vulcan) {
                return "systems/sta/assets/compendia/icons/talents-core/talent-vulcan.svg";
            } else {
                return "systems/sta/assets/compendia/icons/talents-core/talent-core.svg";
            }
        }
    }

    determineValueIcon(value: string) {
        return "systems/sta/assets/compendia/icons/values-core/value-core.svg";
    }

    determineWeaponIcon(weapon: Weapon, character: Character) {
        if (weapon.name === PersonalWeapons.instance(character.version).unarmedStrike.name) {
            return "systems/sta/assets/compendia/icons/weapons-core/unarmed-strike.webp";
        } else if (weapon.name === PersonalWeapons.instance(character.version).phaser1.name) {
            return "systems/sta/assets/compendia/icons/weapons-core/phaser-type-1.webp";
        } else if (weapon.name === PersonalWeapons.instance(character.version).phaser2.name) {
            return "systems/sta/assets/compendia/icons/weapons-core/phaser-type-2.webp";
        } else if (weapon.name === PersonalWeapons.instance(character.version).batLeth.name) {
            return "systems/sta/assets/compendia/icons/weapons-core/bat-leth.webp";
        } else if (weapon.name === PersonalWeapons.instance(character.version).disruptorPistol.name) {
            if (character.speciesStep.species === Species.Romulan) {
                return "systems/sta/assets/compendia/icons/weapons-core/romulan-disruptor-pistol.webp";
            } else if(character.speciesStep.species === Species.Klingon) {
                return "systems/sta/assets/compendia/icons/weapons-core/klingon-disruptor-pistol.webp";
            } else {
                return "systems/sta/assets/compendia/icons/items-core/placeholder.webp";
            }
        } else {
            return "systems/sta/assets/compendia/icons/items-core/placeholder.webp";
        }
    }

    determineTalentRequirement(talent: TalentModel) {
        if (this.determineTalentType(talent) === "general") {
            return "";
        } else if (this.determineTalentType(talent) === "discipline") {
            return talent.category.toLowerCase();
        } else {
            return talent.category;
        }
    }

    determineTalentType(talent: TalentModel) {
        if (talent.category == null || talent.category === "Esoteric" || talent.category === "General"
                || talent.category === "Career" || talent.category === "Starship" || talent.category === "Starbase" || talent.category === "") {
            return "general";
        } else if (DepartmentsHelper.instance.getDepartmentByName(talent.category) !== undefined) {
            return "discipline";
        } else {
            return "species";
        }
    }

    convertDescription(talent: SelectedTalent|SpeciesAbility, construct: Construct) {
        let description = "";
        if (talent instanceof SpeciesAbility) {
            description = (talent as SpeciesAbility).description;
        } else if (talent.isCustom) {
            description = talent.customTalentDescription;
        } else {
            description = construct.version === 1
                ? talent.talentModel.localizedDescription.replace(CHALLENGE_DICE_NOTATION, "CD")
                : talent.talentModel.localizedDescription2e.replace(CHALLENGE_DICE_NOTATION, "CD");
        }

        let prerequisites = (talent instanceof TalentModel) ? talent.requirement : "";
        return markupToHtml(description) + (prerequisites ? "<p><strong>" + prerequisites + "</strong></p>" : "");
    }
}