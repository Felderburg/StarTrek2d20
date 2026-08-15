import { Species } from './speciesEnum';

export class SpeciesUpgrade {
  isSpeciesUpdateAvailable(species: Species) {
    return this.reviseSpecies(species) !== species;
  }

  reviseSpecies(species: Species) {
    switch (species) {
      case Species.ElAurian:
        return Species.ElAurian_2E;
      case Species.Exocomp:
        return Species.Exocomp_2E;
      case Species.Horta:
        return Species.Horta_2E;
      case Species.KlingonQuchHa:
        return Species.KlingonQuchHa_2E;
      case Species.Illyrian:
        return Species.Illyrian_2E;
      case Species.Yridian:
        return Species.Yridian_2E;
      default:
        return species;
    }
  }
}
