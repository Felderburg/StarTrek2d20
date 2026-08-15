import { useTranslation } from 'react-i18next';
import StationScale from '../../helpers/stationScale';
import { CustomStationSpaceframeStep } from '../../common/station';

export interface IScaleSelectorProperties {
  scale: number;
  onChange: (number) => void;
}

export const ScaleSelector: React.FC<IScaleSelectorProperties> = ({
  scale,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="d-sm-flex align-items-stretch">
        <label htmlFor="scale" className="textinput-label">
          {t('Construct.other.scale')}
        </label>
        <input
          style={{ width: '4rem' }}
          id="scale"
          type="number"
          min={CustomStationSpaceframeStep.MIN_SCALE}
          max={25}
          defaultValue={scale.toString()}
          onChange={(e) => {
            const value = e.target.value;
            onChange(parseInt(value));
          }}
        />
      </div>
      <div className="small text-white mt-2" style={{ maxWidth: '365px' }}>
        {StationScale.instance().getTextHint(scale)}
      </div>
    </>
  );
};
