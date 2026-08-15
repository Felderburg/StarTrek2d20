import { Station } from '../common/station';

export interface IStationPageProperties {
  station: Station;
}

export const stationMapStateToProperties = (state, ownProps) => {
  return {
    station: state.station?.station,
  };
};
