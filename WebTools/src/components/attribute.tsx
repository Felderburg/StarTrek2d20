import React from 'react';

interface IAttributeProperties {
  name: string;
  value?: number;
  points: number;
}

export class AttributeView extends React.Component<IAttributeProperties, {}> {
  render() {
    const { name, value, points } = this.props;
    let pointsAsString = points < 0 ? '-' + Math.abs(points) : '+' + points;
    if (value != null) {
      pointsAsString = '(' + pointsAsString + ')';
    }

    return (
      <div>
        <div className="attribute-container">{name}</div>
        <div className="attribute-value">
          {value != null ? (
            <span>
              {pointsAsString}&nbsp;{value}
            </span>
          ) : (
            pointsAsString
          )}
        </div>
      </div>
    );
  }
}
