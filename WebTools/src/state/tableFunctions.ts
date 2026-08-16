import { TableMarshaller } from '../table/model/tableMarshaller';
import { store } from './store';

export const isTableCollectionAlreadyImported = (
  uuid: string,
  encodedCollection: string,
) => {
  const collections = store.getState().table?.collections;
  const matches = collections
    .filter((c) => c.uuid === uuid)
    .filter((c) => TableMarshaller.instance.marshall(c) === encodedCollection);
  return matches.length > 0;
};
