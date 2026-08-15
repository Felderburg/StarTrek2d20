import { Attribute, AttributesHelper } from './attributes';
import { Department } from './department';
import { SpeciesHelper } from './species';
import { Character } from '../common/character';
import { CharacterType } from '../common/characterType';
import { isKlingonWarrior1e, isKlingonWarriorType } from './klingonWarrior';
import { Species } from './speciesEnum';
import i18next from 'i18next';
import { makeKey } from '../common/translationKey';
import { Era } from './erasEnum';
import { hasSource } from '../state/contextFunctions';
import { Source } from './sources';
import { Construct, Stereotype } from '../common/construct';

export enum Environment {
  // Core
  Homeworld,
  BusyColony,
  IsolatedColony,
  FrontierColony,
  StarshipOrStarbase,
  AnotherSpeciesWorld,

  Andoria23rd,
  Betazed23rd,
  Denobula23rd,
  Earth23rd,
  Qonos23rd,
  Risa23rd,
  Romulus23rd,
  TellarPrime23rd,
  Trill23rd,
  Vulcan23rd,

  UtopianParadise,
  Cosmopolitan,
  RigorousDiscipline,
  AscetismAndIntrospection,
  StruggleAndHardship,
  OccupationOrWar,
}

export class EnvironmentModel {
  id: Environment;
  key: string;
  name: string;
  attributes: Attribute[];
  disciplines: Department[];
  values: string[];

  constructor(
    id: Environment,
    key: string,
    name: string,
    attributes: Attribute[],
    disciplines: Department[],
    values: string[] = [],
  ) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.attributes = attributes;
    this.disciplines = disciplines;
    this.values = values;
  }

  getAttributesForCharacter(character: Character) {
    if (this.id === Environment.Homeworld) {
      const speciesAttributes =
        character.speciesStep?.species == null ||
        character.speciesStep?.species === Species.Custom
          ? AttributesHelper.getAllAttributes()
          : SpeciesHelper.getSpeciesByType(character.speciesStep?.species)
              .attributes;
      return speciesAttributes;
    } else {
      return this.attributes;
    }
  }

  get localizedName() {
    if (this.key === 'special') {
      return this.name;
    } else {
      return i18next.t(
        makeKey('Environment.' + this.key + '.', Environment[this.id], '.name'),
      );
    }
  }

  get localizedDescription() {
    return i18next.t(
      makeKey(
        'Environment.' + this.key + '.',
        Environment[this.id],
        '.description',
      ),
    );
  }
}

class Environments {
  private _environments: { [id: number]: EnvironmentModel } = {
    [Environment.Homeworld]: new EnvironmentModel(
      Environment.Homeworld,
      'common',
      'Homeworld',
      [],
      [Department.Command, Department.Science, Department.Security],
    ),
    [Environment.BusyColony]: new EnvironmentModel(
      Environment.BusyColony,
      'common',
      'Busy Colony',
      [Attribute.Daring, Attribute.Presence],
      [Department.Command, Department.Science, Department.Security],
    ),
    [Environment.IsolatedColony]: new EnvironmentModel(
      Environment.IsolatedColony,
      'common',
      'Isolated Colony',
      [Attribute.Insight, Attribute.Reason],
      [Department.Engineering, Department.Medicine, Department.Science],
    ),
    [Environment.FrontierColony]: new EnvironmentModel(
      Environment.FrontierColony,
      'common',
      'Frontier Colony',
      [Attribute.Control, Attribute.Fitness],
      [Department.Conn, Department.Medicine, Department.Security],
    ),
    [Environment.StarshipOrStarbase]: new EnvironmentModel(
      Environment.StarshipOrStarbase,
      'common',
      'Starship or Starbase',
      [Attribute.Control, Attribute.Insight],
      [Department.Command, Department.Conn, Department.Engineering],
    ),
    [Environment.AnotherSpeciesWorld]: new EnvironmentModel(
      Environment.AnotherSpeciesWorld,
      'common',
      "Another Species' World",
      [], // Another Species
      [
        Department.Command,
        Department.Conn,
        Department.Engineering,
        Department.Medicine,
        Department.Science,
        Department.Security,
      ],
    ),
  };

  private _century23: { [id: number]: EnvironmentModel } = {
    [Environment.Andoria23rd]: new EnvironmentModel(
      Environment.Andoria23rd,
      'common',
      'Andoria',
      [Attribute.Control, Attribute.Presence],
      [Department.Command, Department.Science, Department.Security],
      [
        "Ice runs in my veins, but that doesn't mean I'm cold-hearted",
        'Stubborn as a glacier',
      ],
    ),
    [Environment.Betazed23rd]: new EnvironmentModel(
      Environment.Betazed23rd,
      'common',
      'Betazed',
      [Attribute.Insight, Attribute.Presence],
      [Department.Command, Department.Science, Department.Medicine],
      [
        'Openness and honesty are just easier ways to live',
        'Privacy is a luxury among telepaths',
      ],
    ),
    [Environment.Denobula23rd]: new EnvironmentModel(
      Environment.Denobula23rd,
      'common',
      'Denobula',
      [Attribute.Insight, Attribute.Reason],
      [Department.Engineering, Department.Medicine, Department.Science],
      [
        'A new neighbour is a potential friend',
        'Everyone is connected somehow',
      ],
    ),
    [Environment.Earth23rd]: new EnvironmentModel(
      Environment.Earth23rd,
      'common',
      'Earth',
      [Attribute.Daring, Attribute.Control],
      [Department.Command, Department.Security, Department.Science],
      [
        'The Federation has brought peace to countless worlds',
        'Earth is a paradise, but not everywhere is so fortunate',
      ],
    ),
    [Environment.Qonos23rd]: new EnvironmentModel(
      Environment.Qonos23rd,
      'common',
      "Qo'nos",
      [Attribute.Daring, Attribute.Presence],
      [Department.Command, Department.Security, Department.Engineering],
      [
        'The strong will prosper, but what they do with that strength is what matters',
        'The Galaxy is a dangerous place for the unwary',
      ],
    ),
    [Environment.Risa23rd]: new EnvironmentModel(
      Environment.Risa23rd,
      'common',
      'Risa',
      [Attribute.Insight, Attribute.Presence],
      [Department.Conn, Department.Engineering, Department.Medicine],
      [
        'Joy is as noble a pursuit as truth, duty, or glory',
        'Everyone deserves relief from their burdens',
      ],
    ),
    [Environment.Romulus23rd]: new EnvironmentModel(
      Environment.Romulus23rd,
      'common',
      'Romulus',
      [Attribute.Insight, Attribute.Presence],
      [Department.Conn, Department.Engineering, Department.Medicine],
      [
        'To survive, I must keep my secrets and discover yours',
        'For the triumph of the Romulan Empire',
      ],
    ),
    [Environment.TellarPrime23rd]: new EnvironmentModel(
      Environment.TellarPrime23rd,
      'common',
      'Tellar Prime',
      [Attribute.Insight, Attribute.Reason],
      [Department.Command, Department.Engineering, Department.Science],
      [
        'Even the best ideas need to be re-examined occasionally',
        'The truth can be painful, but I take no joy in your pain',
      ],
    ),
    [Environment.Trill23rd]: new EnvironmentModel(
      Environment.Trill23rd,
      'common',
      'Trill',
      [Attribute.Insight, Attribute.Presence],
      [Department.Command, Department.Science, Department.Medicine],
      [
        'Why argue when you can seek understanding',
        'The Galaxy contains more than you can see in a lifetime',
      ],
    ),
    [Environment.Vulcan23rd]: new EnvironmentModel(
      Environment.Vulcan23rd,
      'common',
      'Vulcan',
      [Attribute.Control, Attribute.Presence],
      [
        Department.Command,
        Department.Conn,
        Department.Science,
        Department.Medicine,
      ],
      [
        'Service to the betterment of all gives purpose',
        'We may choose to be guided by logic, but the real world isn’t always reasonable',
      ],
    ),
  };

  private _alternateEnvironments: { [id: number]: EnvironmentModel } = {
    [Environment.UtopianParadise]: new EnvironmentModel(
      Environment.UtopianParadise,
      'alternate',
      'Utopian Paradise',
      [Attribute.Control, Attribute.Reason, Attribute.Presence],
      [
        Department.Command,
        Department.Conn,
        Department.Engineering,
        Department.Medicine,
        Department.Science,
        Department.Security,
      ],
    ),
    [Environment.Cosmopolitan]: new EnvironmentModel(
      Environment.Cosmopolitan,
      'alternate',
      'Cosmopolitan',
      [Attribute.Daring, Attribute.Insight, Attribute.Presence],
      [Department.Command, Department.Conn, Department.Science],
    ),
    [Environment.RigorousDiscipline]: new EnvironmentModel(
      Environment.RigorousDiscipline,
      'alternate',
      'Rigorous Discipline',
      [Attribute.Control, Attribute.Fitness, Attribute.Reason],
      [Department.Command, Department.Security, Department.Medicine],
    ),
    [Environment.AscetismAndIntrospection]: new EnvironmentModel(
      Environment.AscetismAndIntrospection,
      'alternate',
      'Ascetism and Introspection',
      [Attribute.Control, Attribute.Insight, Attribute.Reason],
      [Department.Science, Department.Engineering, Department.Medicine],
    ),
    [Environment.StruggleAndHardship]: new EnvironmentModel(
      Environment.StruggleAndHardship,
      'alternate',
      'Struggle and Hardship',
      [Attribute.Control, Attribute.Daring, Attribute.Insight],
      [Department.Conn, Department.Engineering, Department.Science],
    ),
    [Environment.OccupationOrWar]: new EnvironmentModel(
      Environment.OccupationOrWar,
      'alternate',
      'Occupation or War',
      [Attribute.Daring, Attribute.Fitness, Attribute.Presence],
      [Department.Command, Department.Security, Department.Medicine],
    ),
  };

  private _klingonEnvironments: { [id: number]: EnvironmentModel } = {
    [Environment.Homeworld]: new EnvironmentModel(
      Environment.Homeworld,
      'klingon',
      "Qo'noS",
      [Attribute.Daring, Attribute.Fitness, Attribute.Presence],
      [Department.Command, Department.Science, Department.Security],
    ),
    [Environment.BusyColony]: new EnvironmentModel(
      Environment.BusyColony,
      'klingon',
      'Core Worlds',
      [Attribute.Daring, Attribute.Presence],
      [Department.Command, Department.Science, Department.Security],
    ),
    [Environment.IsolatedColony]: new EnvironmentModel(
      Environment.IsolatedColony,
      'klingon',
      'Isolated Colony',
      [Attribute.Insight, Attribute.Reason],
      [Department.Engineering, Department.Medicine, Department.Science],
    ),
    [Environment.FrontierColony]: new EnvironmentModel(
      Environment.FrontierColony,
      'klingon',
      'Frontier Colony',
      [Attribute.Control, Attribute.Daring],
      [Department.Conn, Department.Medicine, Department.Security],
    ),
    [Environment.StarshipOrStarbase]: new EnvironmentModel(
      Environment.StarshipOrStarbase,
      'klingon',
      'Starship or Starbase',
      [Attribute.Control, Attribute.Insight],
      [Department.Command, Department.Conn, Department.Engineering],
    ),
    [Environment.AnotherSpeciesWorld]: new EnvironmentModel(
      Environment.AnotherSpeciesWorld,
      'klingon',
      "Another Species' World",
      [], // Another Species
      [
        Department.Command,
        Department.Conn,
        Department.Engineering,
        Department.Medicine,
        Department.Science,
        Department.Security,
      ],
    ),
  };

  getEnvironmentOptions(construct: Construct) {
    const result = [];
    if (construct.stereotype === Stereotype.SoloCharacter) {
      result.push(...Object.values(this._environments));
    } else {
      const list = isKlingonWarrior1e(construct.type, construct.version)
        ? this._klingonEnvironments
        : this._environments;
      for (const environment in list) {
        result.push(list[environment]);
      }
      if (
        construct.era === Era.OriginalSeries &&
        construct.version > 1 &&
        hasSource(Source.Century23)
      ) {
        result.push(...Object.values(this._century23));
      }
      if (hasSource(Source.PlayersGuide)) {
        result.push(...Object.values(this._alternateEnvironments));
      }
    }
    return result;
  }

  getEnvironments(type: CharacterType) {
    let environments: EnvironmentModel[] = [];
    const environmentList = isKlingonWarriorType(type)
      ? this._klingonEnvironments
      : this._environments;
    for (const environment in environmentList) {
      const env = environmentList[environment];
      if (env.id !== Environment.AnotherSpeciesWorld) {
        environments.push(env);
      }
    }

    environments = environments.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    SpeciesHelper.getSpecies(CharacterType.Starfleet).forEach((s) => {
      environments.push(
        new EnvironmentModel(
          Environment.AnotherSpeciesWorld,
          'special',
          i18next.t('Environment.special.name', {
            name: environmentList[Environment.AnotherSpeciesWorld]
              .localizedName,
            species: s.name,
            interpolation: { escapeValue: false },
          }),
          s.attributes,
          environmentList[Environment.AnotherSpeciesWorld].disciplines,
        ),
      );
    });

    return environments;
  }

  getEnvironment(env: Environment, construct: Construct) {
    const environmentList = this.getEnvironmentOptions(construct);
    const matches = environmentList.filter((e) => e.id === env);
    return matches?.length ? matches[0] : undefined;
  }

  getEnvironmentByTypeName(
    typeName: string,
    type: CharacterType,
    version: number,
  ) {
    const list = isKlingonWarrior1e(type, version)
      ? Object.values(this._klingonEnvironments)
      : Object.values(this._environments);
    let filtered = list.filter((e) => Environment[e.id] === typeName);
    if (filtered.length === 0) {
      filtered = Object.values(this._alternateEnvironments).filter(
        (e) => Environment[e.id] === typeName,
      );
    }
    if (filtered.length === 0) {
      filtered = Object.values(this._century23).filter(
        (e) => Environment[e.id] === typeName,
      );
    }
    return filtered.length === 0 ? undefined : filtered[0];
  }

  isSetting(environment: Environment) {
    return (
      [
        Environment.Homeworld,
        Environment.BusyColony,
        Environment.IsolatedColony,
        Environment.FrontierColony,
        Environment.StarshipOrStarbase,
        Environment.AnotherSpeciesWorld,
      ].indexOf(environment) >= 0
    );
  }

  isHomeworld(environment: Environment) {
    return (
      [
        Environment.Andoria23rd,
        Environment.Betazed23rd,
        Environment.Denobula23rd,
        Environment.Earth23rd,
        Environment.Qonos23rd,
        Environment.Risa23rd,
        Environment.Romulus23rd,
        Environment.TellarPrime23rd,
        Environment.Trill23rd,
        Environment.Vulcan23rd,
      ].indexOf(environment) >= 0
    );
  }

  isCondition(environment: Environment) {
    return (
      [
        Environment.UtopianParadise,
        Environment.Cosmopolitan,
        Environment.RigorousDiscipline,
        Environment.AscetismAndIntrospection,
        Environment.StruggleAndHardship,
        Environment.OccupationOrWar,
      ].indexOf(environment) >= 0
    );
  }

  generateEnvironment() {
    return Math.floor(Math.random() * 6);
  }

  generateAlternateEnvironment() {
    const roll = Math.floor(Math.random() * 6);
    return roll + 6;
  }
}

export const EnvironmentsHelper = new Environments();
