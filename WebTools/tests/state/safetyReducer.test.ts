import { test, expect, describe } from '@jest/globals';
import { SafetyEvaluationType } from '../../src/safety/model/safetyEvaluation';
import { safety } from '../../src/state/safetyReducer';
import { setSafetyEvaluation } from '../../src/state/safetyActions';

describe('safetyReducer', () => {
  test('returns initial state for an unknown action', () => {
    const result = safety(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual({});
  });

  test('returns the previous state for an unknown action when state is set', () => {
    const current = { bridge: SafetyEvaluationType.YellowAlert };
    const result = safety(current, { type: 'UNKNOWN' });
    expect(result).toBe(current);
  });

  test('stores an evaluation under its category', () => {
    const action = setSafetyEvaluation('bridge', SafetyEvaluationType.RedAlert);
    const result = safety(undefined, action);
    expect(result).toEqual({ bridge: SafetyEvaluationType.RedAlert });
  });

  test('adds a new category while preserving existing categories', () => {
    const current = { bridge: SafetyEvaluationType.YellowAlert };
    const action = setSafetyEvaluation(
      'engineering',
      SafetyEvaluationType.RedAlert,
    );
    const result = safety(current, action);
    expect(result).toEqual({
      bridge: SafetyEvaluationType.YellowAlert,
      engineering: SafetyEvaluationType.RedAlert,
    });
    expect(result).not.toBe(current);
  });

  test('overwrites an existing category', () => {
    const current = { bridge: SafetyEvaluationType.YellowAlert };
    const action = setSafetyEvaluation('bridge', SafetyEvaluationType.AlwaysOk);
    const result = safety(current, action);
    expect(result).toEqual({ bridge: SafetyEvaluationType.AlwaysOk });
  });
});
