import i18next from "i18next";
import { Species } from "./speciesEnum";
import { makeKey } from "../common/translationKey";
import { Source } from "./sources";

export class SpeciesAbility {
    readonly species: Species;
    readonly talentNames: string[];

    constructor(species: Species, source: Source = Source.Core2ndEdition, talentNames: string[] = []) {
        this.species = species;
        this.talentNames = talentNames;
    }

    get name() {
        let key = makeKey("SpeciesAbility.", Species[this.species]);
        return i18next.t(key);
    }

    get description() {
        let key = makeKey("SpeciesAbility.", Species[this.species], ".description");
        return i18next.t(key);
    }
}

export class SpeciesAbilityList {

    private static _instance: SpeciesAbilityList;

    private items: { [id: number] : SpeciesAbility} = {
        [Species.Aenar]: new SpeciesAbility(Species.Aenar),
        [Species.Arbazan]: new SpeciesAbility(Species.Arbazan, Source.AlphaQuadrant),
        [Species.Arkarian]: new SpeciesAbility(Species.Arkarian, Source.AlphaQuadrant),
        [Species.Ardanan]: new SpeciesAbility(Species.Ardanan, Source.BetaQuadrant),
        [Species.Andorian]: new SpeciesAbility(Species.Andorian),
        [Species.Bajoran]: new SpeciesAbility(Species.Bajoran),
        [Species.Betazoid]: new SpeciesAbility(Species.Betazoid, Source.Core2ndEdition, ["Telepathy2e", "Empathy2e"]),
        [Species.Cardassian]: new SpeciesAbility(Species.Cardassian),
        [Species.Denobulan]: new SpeciesAbility(Species.Denobulan),
        [Species.Ferengi]: new SpeciesAbility(Species.Ferengi),
        [Species.Haliian]: new SpeciesAbility(Species.Haliian, Source.AlphaQuadrant),
        [Species.Human]: new SpeciesAbility(Species.Human),
        [Species.Klingon]: new SpeciesAbility(Species.Klingon),
        [Species.Napean]: new SpeciesAbility(Species.Napean, Source.ContinuingMissions),
        [Species.Orion]: new SpeciesAbility(Species.Orion),
        [Species.Romulan]: new SpeciesAbility(Species.Romulan),
        [Species.Tellarite]: new SpeciesAbility(Species.Tellarite),
        [Species.Trill]: new SpeciesAbility(Species.Trill),
        [Species.Vulcan]: new SpeciesAbility(Species.Vulcan),
        [Species.Zaranite]: new SpeciesAbility(Species.Zaranite, Source.AlphaQuadrant),
    }

    static get instance() {
        if (SpeciesAbilityList._instance == null) {
            SpeciesAbilityList._instance = new SpeciesAbilityList();
        }
        return SpeciesAbilityList._instance;
    }

    getBySpecies(species: Species) {
        return this.items[species];
    }
}