import React from 'react';
import { Buffer } from 'buffer';
import { Starship } from '../common/starship';
import { SpaceframeOutline } from '../helpers/spaceframeOutlineHelper';
import { Station } from '../common/station';

interface IOutlineImageProperties {
  starship?: Starship | Station;
  size?: string;
}

const OutlineImage: React.FC<IOutlineImageProperties> = ({
  starship,
  size,
}) => {
  let dimensionX = 327;
  let dimensionY = 84;

  if (starship instanceof Station) {
    dimensionX = 216;
    dimensionY = 260;
  }

  const width = size === 'lg' ? dimensionX * 1.8 : dimensionX;
  const height = size === 'lg' ? dimensionY * 1.8 : dimensionY;

  if (starship) {
    const svg = SpaceframeOutline.renderFullSvg(starship);
    return svg ? (
      <div className="d-none d-md-block text-center mb-3">
        <img
          src={
            'data:image/svg+xml;base64,' +
            Buffer.from(svg, 'utf8').toString('base64')
          }
          alt={starship instanceof Starship ? starship.className : 'Station'}
          width={width}
          height={height}
          style={{ maxWidth: '100%' }}
        />
      </div>
    ) : null;
  } else {
    return null;
  }
};

export default OutlineImage;
