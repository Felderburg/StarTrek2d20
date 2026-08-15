import { test, expect, describe } from '@jest/globals';
import { PageIdentity } from '../../src/pages/pageIdentity';
import { ShipBuildWorkflow } from '../../src/starship/model/shipBuildWorkflow';
import {
  isFlowStartPage,
  popPage,
  pushPage,
  workflowStepIndexForPage,
} from '../../src/common/pageHistory';

describe('isFlowStartPage', () => {
  test('returns true for flow start pages', () => {
    expect(isFlowStartPage(PageIdentity.Home)).toBeTruthy();
    expect(isFlowStartPage(PageIdentity.SourceSelection)).toBeTruthy();
    expect(isFlowStartPage(PageIdentity.SoloConstructType)).toBeTruthy();
    expect(isFlowStartPage(PageIdentity.StarshipToolSelection)).toBeTruthy();
  });

  test('returns false for in-flow pages', () => {
    expect(isFlowStartPage(PageIdentity.Era)).toBeFalsy();
    expect(isFlowStartPage(PageIdentity.ToolSelection)).toBeFalsy();
    expect(isFlowStartPage(PageIdentity.Species)).toBeFalsy();
    expect(isFlowStartPage(PageIdentity.SoloFinishingTouches)).toBeFalsy();
  });
});

describe('pushPage', () => {
  test('appends the current page when navigating to a different page', () => {
    const history = [PageIdentity.Home, PageIdentity.SourceSelection];
    expect(
      pushPage(history, PageIdentity.Era, PageIdentity.ToolSelection),
    ).toEqual([
      PageIdentity.Home,
      PageIdentity.SourceSelection,
      PageIdentity.Era,
    ]);
  });

  test('does not change history when navigating to the current page', () => {
    const history = [PageIdentity.Home];
    expect(
      pushPage(history, PageIdentity.Species, PageIdentity.Species),
    ).toEqual([PageIdentity.Home]);
  });

  test('clears history when navigating to a flow start page', () => {
    const history = [
      PageIdentity.Home,
      PageIdentity.SourceSelection,
      PageIdentity.Era,
    ];
    expect(
      pushPage(history, PageIdentity.ToolSelection, PageIdentity.Home),
    ).toEqual([]);
  });

  test('does not mutate the original history array', () => {
    const history = [PageIdentity.Home];
    pushPage(history, PageIdentity.Home, PageIdentity.SourceSelection);
    expect(history).toEqual([PageIdentity.Home]);
  });
});

describe('popPage', () => {
  test('returns undefined for an empty history', () => {
    expect(popPage([])).toBeUndefined();
  });

  test('returns the last page and the remaining history', () => {
    const history = [
      PageIdentity.Home,
      PageIdentity.SourceSelection,
      PageIdentity.Era,
    ];
    expect(popPage(history)).toEqual({
      page: PageIdentity.Era,
      history: [PageIdentity.Home, PageIdentity.SourceSelection],
    });
  });

  test('does not mutate the original history array', () => {
    const history = [PageIdentity.Home, PageIdentity.SourceSelection];
    popPage(history);
    expect(history).toEqual([PageIdentity.Home, PageIdentity.SourceSelection]);
  });
});

describe('workflowStepIndexForPage', () => {
  test('returns undefined when there is no workflow', () => {
    expect(
      workflowStepIndexForPage(undefined, PageIdentity.SpaceframeSelection),
    ).toBeUndefined();
  });

  test('returns undefined when the page is not a workflow step', () => {
    const workflow = ShipBuildWorkflow.createStarshipBuildWorkflow(2);
    expect(
      workflowStepIndexForPage(workflow, PageIdentity.Species),
    ).toBeUndefined();
  });

  test('returns the matching workflow step index', () => {
    const workflow = ShipBuildWorkflow.createStarshipBuildWorkflow(2);
    expect(
      workflowStepIndexForPage(workflow, PageIdentity.SpaceframeSelection),
    ).toBe(1);
    expect(
      workflowStepIndexForPage(workflow, PageIdentity.FinalStarshipDetails),
    ).toBe(6);
  });
});
