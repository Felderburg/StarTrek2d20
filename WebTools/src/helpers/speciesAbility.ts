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
        [Species.Andorian]: new SpeciesAbility(Species.Andorian),
        [Species.Android]: new SpeciesAbility(Species.Android, Source.SpeciesSourcebook),
        [Species.Arbazan]: new SpeciesAbility(Species.Arbazan, Source.AlphaQuadrant),
        [Species.Arkarian]: new SpeciesAbility(Species.Arkarian, Source.AlphaQuadrant),
        [Species.Ardanan]: new SpeciesAbility(Species.Ardanan, Source.BetaQuadrant),
        [Species.Aurelian]: new SpeciesAbility(Species.Aurelian, Source.SpeciesSourcebook),
        [Species.Bajoran]: new SpeciesAbility(Species.Bajoran),
        [Species.Barzan]: new SpeciesAbility(Species.Barzan, Source.SpeciesSourcebook),
        [Species.Benzite]: new SpeciesAbility(Species.Benzite, Source.SpeciesSourcebook),
        [Species.Betazoid]: new SpeciesAbility(Species.Betazoid, Source.Core2ndEdition, ["Telepathy2e", "Empathy2e"]),
        [Species.Betelgeusian]: new SpeciesAbility(Species.Betelgeusian, Source.SpeciesSourcebook),
        [Species.Bolian]: new SpeciesAbility(Species.Bolian, Source.SpeciesSourcebook),
        [Species.Breen]: new SpeciesAbility(Species.Breen, Source.SpeciesSourcebook),
        [Species.Brikar]: new SpeciesAbility(Species.Brikar, Source.SpeciesSourcebook),
        [Species.Bynar]: new SpeciesAbility(Species.Bynar, Source.SpeciesSourcebook),
        [Species.Caitian]: new SpeciesAbility(Species.Caitian, Source.SpeciesSourcebook),
        [Species.Chameloid]: new SpeciesAbility(Species.Chameloid, Source.SpeciesSourcebook),
        [Species.ChangelingGamma]: new SpeciesAbility(Species.ChangelingGamma, Source.SpeciesSourcebook),
        [Species.Cardassian]: new SpeciesAbility(Species.Cardassian, Source.SpeciesSourcebook),
        [Species.Deltan]: new SpeciesAbility(Species.Deltan, Source.SpeciesSourcebook),
        [Species.Denobulan]: new SpeciesAbility(Species.Denobulan),
        [Species.Edosian]: new SpeciesAbility(Species.Edosian, Source.SpeciesSourcebook),
        [Species.Efrosian]: new SpeciesAbility(Species.Efrosian, Source.SpeciesSourcebook),
        [Species.ElAurian_2E]: new SpeciesAbility(Species.ElAurian_2E, Source.SpeciesSourcebook),
        [Species.Exocomp]: new SpeciesAbility(Species.Exocomp, Source.SpeciesSourcebook),
        [Species.Ferengi]: new SpeciesAbility(Species.Ferengi),
        [Species.Grazerite]: new SpeciesAbility(Species.Grazerite, Source.SpeciesSourcebook),
        [Species.Haliian]: new SpeciesAbility(Species.Haliian, Source.AlphaQuadrant),
        [Species.Hologram]: new SpeciesAbility(Species.Hologram, Source.SpeciesSourcebook),
        [Species.Horta_2E]: new SpeciesAbility(Species.Horta_2E, Source.SpeciesSourcebook),
        [Species.Human]: new SpeciesAbility(Species.Human),
        [Species.HumanAugment]: new SpeciesAbility(Species.HumanAugment, Source.SpeciesSourcebook),
        [Species.Illyrian_2E]: new SpeciesAbility(Species.Illyrian_2E, Source.SpeciesSourcebook),
        [Species.Klingon]: new SpeciesAbility(Species.Klingon),
        [Species.Napean]: new SpeciesAbility(Species.Napean, Source.ContinuingMissions),
        [Species.Orion]: new SpeciesAbility(Species.Orion),
        [Species.Romulan]: new SpeciesAbility(Species.Romulan),
        [Species.Tamarian]: new SpeciesAbility(Species.Tamarian, Source.SpeciesSourcebook),
        [Species.Tellarite]: new SpeciesAbility(Species.Tellarite),
        [Species.Trill]: new SpeciesAbility(Species.Trill),
        [Species.Vulcan]: new SpeciesAbility(Species.Vulcan),
        [Species.VauNAkat]: new SpeciesAbility(Species.VauNAkat, Source.SpeciesSourcebook),
        [Species.Vorta]: new SpeciesAbility(Species.Vorta, Source.SpeciesSourcebook),
        [Species.Xahean]: new SpeciesAbility(Species.Xahean, Source.SpeciesSourcebook),
        [Species.XindiAquatic]: new SpeciesAbility(Species.XindiAquatic, Source.SpeciesSourcebook),
        [Species.XindiArboreal]: new SpeciesAbility(Species.XindiArboreal, Source.SpeciesSourcebook),
        [Species.XindiInsectoid]: new SpeciesAbility(Species.XindiInsectoid, Source.SpeciesSourcebook),
        [Species.XindiPrimate]: new SpeciesAbility(Species.XindiPrimate, Source.SpeciesSourcebook),
        [Species.XindiReptilian]: new SpeciesAbility(Species.XindiReptilian, Source.SpeciesSourcebook),
        [Species.Yridian_2E]: new SpeciesAbility(Species.Yridian_2E, Source.SpeciesSourcebook),
        [Species.Zakdorn]: new SpeciesAbility(Species.Zakdorn, Source.SpeciesSourcebook),
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