import React from 'react';

interface INumericValueChangeViewProperties {
    value: number;
    deltaValue?: number;
    label: string;
    showIncrease: boolean;
    showDecrease: boolean;
    onDecrease: () => void;
    onIncrease: () => void;
}

export const NumericValueChangeView: React.FC<INumericValueChangeViewProperties> = ({value, deltaValue, showIncrease, showDecrease, onIncrease, onDecrease, label}) => {

    const dec = showDecrease
        ? (<img style={{ float: "left" }} height="20" src="/static/img/dec.png" onClick={ () => { onDecrease() } } alt="-"/>)
        : undefined;

    const inc = showIncrease
        ? (<img style={{ float: "right" }} height="20" src="/static/img/inc.png" onClick={ () => { onIncrease() } }alt="+"/>)
        : undefined;

    return (
        <div className="stat pb-2">
            <div className="stat-entry-name purple">
                {label}
            </div>
            <div className="stat-entry-value">
                {dec}
                {value}
                {(deltaValue == null || deltaValue === 0) ? "" : (" (" + (deltaValue > 0 ? "+" : "") + deltaValue + ")")}
                {inc}
            </div>
        </div>
    );
}
