import { createAction } from '@reduxjs/toolkit';
import type { SafetyEvaluationType } from '../safety/model/safetyEvaluation';

export const SET_SAFETY_EVALUATION = 'SET_SAFETY_EVALUATION';

export const setSafetyEvaluation = createAction(
  SET_SAFETY_EVALUATION,
  (category: string, evaluation: SafetyEvaluationType) => ({
    payload: { category: category, evaluation: evaluation },
  }),
);
