import { CharacterType } from '../../common/characterType';
import { Construct, Stereotype } from '../../common/construct';
import { SelectedTalent } from '../../common/selectedTalent';
import {
  TALENT_NAME_AMPHIBIOUS,
  TALENT_NAME_AQUATIC_LIQUID_ENVIRONMENT,
  TALENT_NAME_CORROSIVE_SPIT,
  TALENT_NAME_ENERGY_BASED,
  TALENT_NAME_FLIGHT,
  TALENT_NAME_IMMUNE_TO_COLD,
  TALENT_NAME_IMMUNE_TO_VACUUM,
  TALENT_NAME_INCORPOREAL,
  TALENT_NAME_MASSIVE,
  TALENT_NAME_SPIKED_TAIL,
  TALENT_NAME_WHIP_LIKE_TAIL,
} from '../../helpers/talents';
import { Weapon } from '../../helpers/weapons';
import { CreatureSize, CreatureSizeModel } from './creatureSize';
import { CreatureType, CreatureTypeModel } from './creatureType';
import { DietTypeModel } from './diet';
import { Habitat, HabitatModel } from './habitat';
import { LocomotionModel, LocomotionType } from './locomotion';
import { NaturalAttacks, NaturalAttacksHelper } from './naturalAttacks';

export class Creature extends Construct {
  description?: string;
  habitat?: HabitatModel;
  creatureType?: CreatureTypeModel;
  diet?: DietTypeModel;
  size?: CreatureSizeModel;
  naturalAttacks?: NaturalAttacks;
  locomotion: LocomotionModel[] = [];
  additionalTalents: SelectedTalent[] = [];
  additionalTraits: string[] = [];
  form?: string;
  attributes: number[] = [1, 1, 1, 1, 1, 0];
  departments: number[] = [0, 0, 0, 0, 0, 0];

  constructor() {
    super(Stereotype.Creature);
    this.type = CharacterType.Creature;
  }

  get talents() {
    const result: SelectedTalent[] = [];
    if (this.creatureType?.id === CreatureType.Fish) {
      result.push(new SelectedTalent(TALENT_NAME_AQUATIC_LIQUID_ENVIRONMENT));
    } else if (this.creatureType?.id === CreatureType.Amphibian) {
      result.push(new SelectedTalent(TALENT_NAME_AMPHIBIOUS));
    } else if (this.creatureType?.id === CreatureType.Energy) {
      result.push(new SelectedTalent(TALENT_NAME_ENERGY_BASED));
    }

    if (this.size?.id === CreatureSize.Swarm) {
      result.push(new SelectedTalent(TALENT_NAME_INCORPOREAL));
    } else if (this.size?.id === CreatureSize.Gigantic) {
      result.push(new SelectedTalent(TALENT_NAME_MASSIVE));
    }

    if (this.habitat?.id === Habitat.Space) {
      result.push(new SelectedTalent(TALENT_NAME_IMMUNE_TO_COLD));
      result.push(new SelectedTalent(TALENT_NAME_IMMUNE_TO_VACUUM));
      result.push(new SelectedTalent(TALENT_NAME_FLIGHT));
    } else if (this.habitat?.id === Habitat.UpperAtmosphere) {
      result.push(new SelectedTalent(TALENT_NAME_IMMUNE_TO_COLD));
      result.push(new SelectedTalent(TALENT_NAME_FLIGHT));
    }

    result.push(...this.additionalTalents);

    return result;
  }

  getDistinctTalentNameList(): string[] {
    return this.talents.map((t) => t.talent);
  }

  hasTalent(talentName: string): boolean {
    return this.getDistinctTalentNameList().includes(talentName);
  }

  getRankForTalent() {
    return 1;
  }

  get isFlightlessBird() {
    return (
      this.creatureType?.id === CreatureType.Bird &&
      !this.hasTalent(TALENT_NAME_FLIGHT)
    );
  }

  get isSlithering() {
    return this.locomotion?.filter(
      (l) => l.type?.id === LocomotionType.Slithering,
    )?.length
      ? true
      : false;
  }

  get isTentacled() {
    return this.locomotion?.filter(
      (l) => l.type?.id === LocomotionType.Tentacles,
    )?.length
      ? true
      : false;
  }

  get isFlippered() {
    return this.locomotion?.filter(
      (l) => l.type?.id === LocomotionType.Flippers,
    )?.length
      ? true
      : false;
  }

  get isLegged() {
    return this.locomotion?.filter((l) => l.type?.id === LocomotionType.Legs)
      ?.length
      ? true
      : false;
  }

  get isFourOrMoreLegged() {
    return this.locomotion?.filter(
      (l) => l.type?.id === LocomotionType.Legs && l.count >= 4,
    )?.length
      ? true
      : false;
  }

  determineWeapons(): Weapon[] {
    const result: Weapon[] = [];
    if (this.naturalAttacks != null) {
      result.push(
        NaturalAttacksHelper.instance.getAttackById(this.naturalAttacks),
      );
    }
    if (this.hasTalent(TALENT_NAME_SPIKED_TAIL)) {
      result.push(NaturalAttacksHelper.instance.getSpikedTailAttack());
    }
    if (this.hasTalent(TALENT_NAME_WHIP_LIKE_TAIL)) {
      result.push(NaturalAttacksHelper.instance.getWhipLikeTailAttack());
    }
    if (this.hasTalent(TALENT_NAME_CORROSIVE_SPIT)) {
      result.push(NaturalAttacksHelper.instance.getCorrosiveSpit());
    }

    return result;
  }

  getAllTraits() {
    let result = [...this.additionalTraits];
    if (this.creatureType?.id === CreatureType.Plant) {
      result.push('Flora');
    } else {
      result.push('Fauna');
    }
    if (this.isFlightlessBird) {
      result.push('Flightless');
    }
    return result.join(', ');
  }
}
