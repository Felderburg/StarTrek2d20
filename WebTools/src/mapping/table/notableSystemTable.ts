import { D20 } from '../../common/die';
import type { TableRoll } from '../../common/tableRoll';

// determine the number of interesting systems in a sector of space.
// This table has really changed since the original version in
// the Shackleton Expanse book
export const notableSystemTable: TableRoll<number> = () => {
  const roll = D20.roll();

  switch (roll) {
    case 1:
    case 2:
    case 3:
      return 3;
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return 5;
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      return 7;
    case 16:
    case 17:
    case 18:
    case 19:
      return 9;
    case 20:
      return 11;
  }
};
