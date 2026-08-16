import { D20 } from '../../common/die';
import type { TableRoll } from '../../common/tableRoll';
import { WorldClass } from './worldClass';

export const innerWorldShackletonExpanseTable: TableRoll<WorldClass> = () => {
  let result = [];
  switch (D20.roll()) {
    case 1:
      result = [WorldClass.Y];
      break;
    case 2:
    case 3:
      result = [WorldClass.B];
      break;
    case 4:
    case 5:
    case 6:
      result = [WorldClass.N];
      break;
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      result = [WorldClass.J];
      break;
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
      result = [WorldClass.D, WorldClass.AsteroidBelt];
      break;
    case 17:
    case 18:
    case 19:
      result = [WorldClass.H];
      break;
    case 20:
    default:
      result = [WorldClass.L, WorldClass.K, WorldClass.M];
      break;
  }

  return result[Math.floor(Math.random() * result.length)];
};

export const innerWorldExplorationGuideTable: TableRoll<WorldClass> = () => {
  let result = [];
  switch (D20.roll()) {
    case 1:
      result = [WorldClass.A, WorldClass.Y];
      break;
    case 2:
    case 3:
      result = [WorldClass.B];
      break;
    case 4:
    case 5:
    case 6:
      result = [WorldClass.N];
      break;
    case 7:
    case 8:
    case 9:
    case 10:
      result = [WorldClass.I];
      break;
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      result = [WorldClass.D, WorldClass.AsteroidBelt];
      break;
    case 18:
    case 19:
      result = [WorldClass.H];
      break;
    case 20:
    default:
      result = [WorldClass.L, WorldClass.K, WorldClass.M];
      break;
  }

  return result[Math.floor(Math.random() * result.length)];
};

export const primaryWorldShackletonExpanseTable: TableRoll<WorldClass> = () => {
  let result = [];
  switch (D20.roll()) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      result = [WorldClass.L, WorldClass.E];
      break;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      result = [WorldClass.M];
      break;
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
      result = [WorldClass.K];
      break;
    case 19:
    case 20:
    default:
      result = [WorldClass.O, WorldClass.P];
      break;
  }

  return result[Math.floor(Math.random() * result.length)];
};

export const primaryWorldExplorationGuideTable: TableRoll<WorldClass> = () => {
  let result = [];
  switch (D20.roll()) {
    case 1:
      result = [WorldClass.J];
      break;
    case 2:
    case 3:
    case 4:
    case 5:
      result = [WorldClass.L, WorldClass.E];
      break;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      result = [WorldClass.M];
      break;
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
      result = [WorldClass.K];
      break;
    case 19:
    case 20:
    default:
      result = [WorldClass.O, WorldClass.P];
      break;
  }

  return result[Math.floor(Math.random() * result.length)];
};

export const outerWorldShackletonExpanseTable: TableRoll<WorldClass> = () => {
  let result = [];
  switch (D20.roll()) {
    case 1:
      result = [WorldClass.L];
      break;
    case 2:
    case 3:
    case 4:
    case 5:
      result = [WorldClass.C];
      break;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
      result = [WorldClass.J];
      break;
    case 15:
    case 16:
    case 17:
    case 18:
      result = [WorldClass.D, WorldClass.AsteroidBelt];
      break;
    case 19:
      result = [WorldClass.I];
      break;
    case 20:
    default:
      result = [WorldClass.P];
      break;
  }

  return result[Math.floor(Math.random() * result.length)];
};

export const outerWorldExplorationGuideTable: TableRoll<WorldClass> = () => {
  let result = [];
  switch (D20.roll()) {
    case 1:
      result = [WorldClass.L];
      break;
    case 2:
    case 3:
    case 4:
    case 5:
      result = [WorldClass.C];
      break;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
      result = [WorldClass.J];
      break;
    case 15:
    case 16:
    case 17:
    case 18:
      result = [WorldClass.D, WorldClass.AsteroidBelt];
      break;
    case 19:
      result = [WorldClass.O, WorldClass.T];
      break;
    case 20:
    default:
      result = [WorldClass.O, WorldClass.P];
      break;
  }

  return result[Math.floor(Math.random() * result.length)];
};
