import { IPageFactoryRegistry } from '../../pages/pageFactory';
import { PageIdentity } from '../../pages/pageIdentity';
import FinalStarshipDetailsPage from './finalStarshipDetailsPage';
import MissionPodSelectionPage from './missionPodSelectionPage';
import MissionProfileSelectionPage from './missionProfileSelectionPage';
import MissionProfileTalentSelectionPage from './missionProfileTalentSelectionPage';
import RefitsPage from './refitsPage';
import SelectStarshipToolPage from './selectStarshipToolPage';
import SimpleStarshipPage from './simpleStarshipPage';
import SmallCraftStatsPage from './smallCraftStatsPage';
import SpaceframeSelectionPage from './spaceframeSelectionPage';
import StarshipTalentsPage from './starshipTalentsPage';
import StarshipTypeSelectionPage from './starshipTypeSelectionPage';
import StarshipWeaponsPage from './starshipWeaponsPage';
import ServiceRecordPage from './serviceRecordPage';
import ExtraStarshipTalentChoicesPage from './extraStarshipTalentChoicesPage';

export class StarshipPageFactory implements IPageFactoryRegistry {
  private static _instance;

  static get instance() {
    if (StarshipPageFactory._instance == null) {
      StarshipPageFactory._instance = new StarshipPageFactory();
    }
    return StarshipPageFactory._instance;
  }

  private factories = {};

  constructor() {
    this.factories = {};

    this.factories[PageIdentity.ExtraStarshipTalentChoice] = () => (
      <ExtraStarshipTalentChoicesPage />
    );
    this.factories[PageIdentity.MissionPodSelection] = () => (
      <MissionPodSelectionPage />
    );
    this.factories[PageIdentity.MissionProfileSelection] = () => (
      <MissionProfileSelectionPage />
    );
    this.factories[PageIdentity.MissionProfileTalentSelection] = () => (
      <MissionProfileTalentSelectionPage />
    );
    this.factories[PageIdentity.SimpleStarship] = () => <SimpleStarshipPage />;
    this.factories[PageIdentity.SmallCraftStats] = () => (
      <SmallCraftStatsPage />
    );
    this.factories[PageIdentity.SpaceframeSelection] = () => (
      <SpaceframeSelectionPage />
    );
    this.factories[PageIdentity.StarshipRefits] = () => <RefitsPage />;
    this.factories[PageIdentity.StarshipServiceRecord] = () => (
      <ServiceRecordPage />
    );
    this.factories[PageIdentity.StarshipToolSelection] = () => (
      <SelectStarshipToolPage />
    );
    this.factories[PageIdentity.StarshipTypeSelection] = () => (
      <StarshipTypeSelectionPage />
    );
    this.factories[PageIdentity.StarshipTalentSelection] = () => (
      <StarshipTalentsPage />
    );
    this.factories[PageIdentity.StarshipWeaponsSelection] = () => (
      <StarshipWeaponsPage />
    );
    this.factories[PageIdentity.FinalStarshipDetails] = () => (
      <FinalStarshipDetailsPage />
    );
  }

  findFactory(page: PageIdentity) {
    return this.factories[page];
  }
}
