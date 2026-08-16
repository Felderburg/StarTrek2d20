import { Source } from '../helpers/sources';
import { store } from './store';

export function isSecondEdition() {
  return hasSource(Source.Core2ndEdition);
}

export function hasSource(s: Source) {
  return store.getState().context.sources.indexOf(s) >= 0;
}

export function hasAnySource(sources: Source[]) {
  let result: boolean = false;
  for (const s of sources) {
    result =
      result ||
      hasSource(s) ||
      (isSecondEdition() ? s === Source.Core2ndEdition : s === Source.Core);
  }
  return result;
}
