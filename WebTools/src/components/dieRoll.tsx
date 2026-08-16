import React from 'react';

interface IDieRollProperties {
  roll: number;
  index: number;
  isSelected?: boolean;
  onSelect: (index: number) => void;
}

export class DieRoll extends React.Component<IDieRollProperties, {}> {
  private isSelected: boolean;

  constructor(props: IDieRollProperties) {
    super(props);

    this.isSelected = this.props.isSelected;
  }

  componentDidUpdate(prevProps: IDieRollProperties) {
    this.isSelected = this.props.isSelected;
  }

  render() {
    const className = this.isSelected ? 'die die-selected' : 'die';

    return (
      <div className={className} onClick={() => this.toggleSelection()}>
        {this.props.roll}
      </div>
    );
  }

  private toggleSelection() {
    this.isSelected = !this.isSelected;
    this.props.onSelect(this.isSelected ? this.props.index : -1);
    this.forceUpdate();
  }
}
