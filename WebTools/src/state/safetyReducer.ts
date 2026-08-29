import { createSlice } from '@reduxjs/toolkit';
import type { SafetyEvaluationType } from '../safety/model/safetyEvaluation';
import { setSafetyEvaluation } from './safetyActions';

const initialState: { [key: string]: SafetyEvaluationType } = {};

export const safetySlice = createSlice({
  name: 'safety',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSafetyEvaluation, (state, action) => {
      const category = action.payload.category;
      const evaluation = action.payload.evaluation;

      const temp = { ...state };
      temp[category] = evaluation;

      return temp;
    });
  },
});

export const safety = safetySlice.reducer;
