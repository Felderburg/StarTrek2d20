import { test, expect, describe } from '@jest/globals';
import { Character } from '../../src/common/character';
import { CharacterType } from '../../src/common/characterType';
import { Era } from '../../src/helpers/erasEnum';
import { CharacterWithTracking } from '../../src/tracker/model/characterWithTracking';
import { gmTracker } from '../../src/state/gmTrackerReducer';
import {
  addGMTrackedCharacter,
  removeGMTrackedCharacter,
  setGMTrackedCharacterStress,
  setGMTrackedCharacterNotes,
} from '../../src/state/gmTrackerActions';

function makeCharacter(): Character {
  return Character.createMainCharacter(
    CharacterType.Starfleet,
    Era.NextGeneration,
    2,
  );
}

function makeTracking(): CharacterWithTracking {
  const tracking = new CharacterWithTracking(makeCharacter());
  tracking.id = 'tracking-1';
  return tracking;
}

describe('gmTrackerReducer', () => {
  test('returns initial state for an unknown action', () => {
    const result = gmTracker(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual({ characters: [] });
  });

  test('ADD_GM_TRACKED_CHARACTER appends a wrapped character', () => {
    const character = makeCharacter();
    const result = gmTracker(undefined, addGMTrackedCharacter(character));
    expect(result.characters).toHaveLength(1);
    expect(result.characters[0].character).toBe(character);
    expect(result.characters[0].currentStress).toBe(0);
    expect(result.characters[0].notes).toBe('');
  });

  test('REMOVE_GM_TRACKED_CHARACTER removes the matching character', () => {
    const first = makeTracking();
    const second = new CharacterWithTracking(makeCharacter());
    second.id = 'tracking-2';
    const state = { characters: [first, second] };
    const result = gmTracker(state, removeGMTrackedCharacter(first));
    expect(result.characters).toHaveLength(1);
    expect(result.characters[0].id).toBe('tracking-2');
  });

  test('REMOVE_GM_TRACKED_CHARACTER is a no-op when the character is not present', () => {
    const first = makeTracking();
    const notPresent = makeTracking();
    notPresent.id = 'tracking-99';
    const state = { characters: [first] };
    const result = gmTracker(state, removeGMTrackedCharacter(notPresent));
    expect(result.characters).toHaveLength(1);
  });

  test('SET_GM_TRACKED_CHARACTER_STRESS updates stress and preserves id and notes', () => {
    const tracking = makeTracking();
    tracking.notes = 'some notes';
    const result = gmTracker(
      { characters: [tracking] },
      setGMTrackedCharacterStress(tracking, 7),
    );
    expect(result.characters[0].id).toBe('tracking-1');
    expect(result.characters[0].currentStress).toBe(7);
    expect(result.characters[0].notes).toBe('some notes');
  });

  test('SET_GM_TRACKED_CHARACTER_STRESS is a no-op when the character is not present', () => {
    const tracking = makeTracking();
    const state = { characters: [] };
    const result = gmTracker(state, setGMTrackedCharacterStress(tracking, 5));
    expect(result.characters).toHaveLength(0);
  });

  test('SET_GM_TRACKED_CHARACTER_NOTES updates notes and preserves id and stress', () => {
    const tracking = makeTracking();
    tracking.currentStress = 4;
    const result = gmTracker(
      { characters: [tracking] },
      setGMTrackedCharacterNotes(tracking, 'updated notes'),
    );
    expect(result.characters[0].id).toBe('tracking-1');
    expect(result.characters[0].currentStress).toBe(4);
    expect(result.characters[0].notes).toBe('updated notes');
  });

  test('SET_GM_TRACKED_CHARACTER_NOTES is a no-op when the character is not present', () => {
    const tracking = makeTracking();
    const state = { characters: [] };
    const result = gmTracker(state, setGMTrackedCharacterNotes(tracking, 'x'));
    expect(result.characters).toHaveLength(0);
  });
});
