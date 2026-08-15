import { PageIdentity } from '../pages/pageIdentity';
import { ShipBuildWorkflow } from '../starship/model/shipBuildWorkflow';

const FLOW_START_PAGES: PageIdentity[] = [
  PageIdentity.Home,
  PageIdentity.SourceSelection,
  PageIdentity.SoloConstructType,
  PageIdentity.StarshipToolSelection,
];

export function isFlowStartPage(page: PageIdentity): boolean {
  return FLOW_START_PAGES.includes(page);
}

export function pushPage(
  history: PageIdentity[],
  currentPage: PageIdentity,
  nextPage: PageIdentity,
): PageIdentity[] {
  if (isFlowStartPage(nextPage)) {
    return [];
  }
  if (nextPage === currentPage) {
    return history;
  }
  return [...history, currentPage];
}

export function popPage(
  history: PageIdentity[],
): { page: PageIdentity; history: PageIdentity[] } | undefined {
  if (history.length === 0) {
    return undefined;
  }
  const page = history[history.length - 1];
  return { page, history: history.slice(0, -1) };
}

export function workflowStepIndexForPage(
  workflow: ShipBuildWorkflow | undefined,
  page: PageIdentity,
): number | undefined {
  if (!workflow) {
    return undefined;
  }
  const index = workflow.steps.findIndex((s) => s.page === page);
  return index >= 0 ? index : undefined;
}
