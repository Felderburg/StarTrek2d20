import type { CharacterType } from './characterType';

export interface IConstruct {
  name?: string;
  type: CharacterType;
  hasTalent(talentName: string);
}
