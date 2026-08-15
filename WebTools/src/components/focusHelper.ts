import i18next from 'i18next';
import { toCamelCase } from '../common/camelCaseUtil';

export const localizedFocus = (focus: string) => {
  const key = 'Focus.' + toCamelCase(focus);
  const result = i18next.t(key);
  return key === result ? focus : result;
};
