import React from 'react';

interface ICheckBoxProperties<T> {
  value: T;
  onChanged: (val: T) => void;
  isChecked: boolean;
  text?: string;
  disabled?: boolean;
}

export class CheckBox<T> extends React.Component<ICheckBoxProperties<T>, {}> {
  render() {
    const { value, onChanged, isChecked, text, disabled } = this.props;

    return (
      <div style={{ paddingTop: '0.25rem', paddingBottom: '0.25rem' }}>
        <label>
          <input
            type="checkbox"
            value={value as string | number}
            onChange={(e) => onChanged(value)}
            checked={isChecked}
            onClick={(e) => {
              e.stopPropagation();
            }}
            disabled={disabled === true}
          />
          <span
            className={
              disabled === true ? 'checkbox-text disabled' : 'checkbox-text'
            }
          >
            {text}
          </span>
        </label>
      </div>
    );
  }
}
