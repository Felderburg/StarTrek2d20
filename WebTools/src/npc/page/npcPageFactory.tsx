import type { IPageFactoryRegistry } from '../../pages/pageFactory';
import { PageIdentity } from '../../pages/pageIdentity';
import { NpcConfigurationPage } from './npcConfigurationPage';

export class NpcPageFactory implements IPageFactoryRegistry {
  private static singleton;

  static get instance() {
    if (NpcPageFactory.singleton == null) {
      NpcPageFactory.singleton = new NpcPageFactory();
    }
    return NpcPageFactory.singleton;
  }

  private factories = {};

  constructor() {
    this.factories = {};

    this.factories[PageIdentity.NpcConfiguration] = () => (
      <NpcConfigurationPage />
    );
  }

  findFactory(page: PageIdentity) {
    return this.factories[page];
  }
}
