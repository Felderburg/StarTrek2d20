import { test, expect, describe } from '@jest/globals';
import { Character } from '../../src/common/character';
import { Role } from '../../src/helpers/roles';

describe('Character', () => {
  describe('copy', () => {
    test('copies the primary role', () => {
      const character = new Character();
      character.role = Role.ScienceOfficer;

      const result = character.copy();

      expect(result.role).toBe(Role.ScienceOfficer);
    });

    test('copies the secondary role', () => {
      const character = new Character();
      character.role = Role.ScienceOfficer;
      character.secondaryRole = Role.ChiefMedicalOfficer;

      const result = character.copy();

      expect(result.role).toBe(Role.ScienceOfficer);
      expect(result.secondaryRole).toBe(Role.ChiefMedicalOfficer);
    });
  });
});
