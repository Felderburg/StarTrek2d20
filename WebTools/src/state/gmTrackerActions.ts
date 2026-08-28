import { createAction } from '@reduxjs/toolkit';
import type { Character } from '../common/character';
import type { CharacterWithTracking } from '../tracker/model/characterWithTracking';

export const ADD_GM_TRACKED_CHARACTER = 'ADD_GM_TRACKED_CHARACTER';
export const REMOVE_GM_TRACKED_CHARACTER = 'REMOVE_GM_TRACKED_CHARACTER';
export const SET_GM_TRACKED_CHARACTER_STRESS =
  'SET_GM_TRACKED_CHARACTER_STRESS';
export const SET_GM_TRACKED_CHARACTER_NOTES = 'SET_GM_TRACKED_CHARACTER_NOTES';

export const addGMTrackedCharacter = createAction(
  ADD_GM_TRACKED_CHARACTER,
  (character: Character) => ({
    payload: { character: character },
  }),
);

export const removeGMTrackedCharacter = createAction(
  REMOVE_GM_TRACKED_CHARACTER,
  (character: CharacterWithTracking) => ({
    payload: { character: character },
  }),
);

export const setGMTrackedCharacterStress = createAction(
  SET_GM_TRACKED_CHARACTER_STRESS,
  (character: CharacterWithTracking, stress: number) => ({
    payload: { character: character, stress: stress },
  }),
);

export const setGMTrackedCharacterNotes = createAction(
  SET_GM_TRACKED_CHARACTER_NOTES,
  (character: CharacterWithTracking, notes: string) => ({
    payload: { character: character, notes: notes },
  }),
);
