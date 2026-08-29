import { createSlice } from '@reduxjs/toolkit';
import type { Character } from '../common/character';
import { CharacterWithTracking } from '../tracker/model/characterWithTracking';
import {
  addGMTrackedCharacter,
  removeGMTrackedCharacter,
  setGMTrackedCharacterNotes,
  setGMTrackedCharacterStress,
} from './gmTrackerActions';

interface IGMTrackerState {
  characters: CharacterWithTracking[];
}

const initialState: IGMTrackerState = { characters: [] };

export const gmTrackerSlice = createSlice({
  name: 'gmTracker',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGMTrackedCharacter, (state, action) => {
        return {
          ...state,
          characters: [
            ...state.characters,
            new CharacterWithTracking(action.payload.character),
          ],
        };
      })
      .addCase(removeGMTrackedCharacter, (state, action) => {
        const characters = [...state.characters];
        const index = characters
          .map((c, i) => (c.id === action.payload.character?.id ? i : -1))
          .filter((index) => index !== -1);
        if (index.length) {
          characters.splice(index[0], 1);
        }
        return {
          ...state,
          characters: characters,
        };
      })
      .addCase(setGMTrackedCharacterStress, (state, action) => {
        const characters = [...state.characters];
        const index = characters
          .map((c, i) => (c.id === action.payload.character?.id ? i : -1))
          .filter((index) => index !== -1);
        if (index.length) {
          const existing = characters[index[0]];
          const tracking = new CharacterWithTracking(
            existing.character as Character,
          );
          tracking.id = existing.id;
          tracking.currentStress = action.payload.stress;
          tracking.notes = existing.notes;
          characters[index[0]] = tracking;
        }
        return {
          ...state,
          characters: characters,
        };
      })
      .addCase(setGMTrackedCharacterNotes, (state, action) => {
        const characters = [...state.characters];
        const index = characters
          .map((c, i) => (c.id === action.payload.character?.id ? i : -1))
          .filter((index) => index !== -1);
        if (index.length) {
          const existing = characters[index[0]];
          const tracking = new CharacterWithTracking(
            existing.character as Character,
          );
          tracking.id = existing.id;
          tracking.currentStress = existing.currentStress;
          tracking.notes = action.payload.notes;
          characters[index[0]] = tracking;
        }
        return {
          ...state,
          characters: characters,
        };
      });
  },
});

export const gmTracker = gmTrackerSlice.reducer;
