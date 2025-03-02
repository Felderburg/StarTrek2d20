import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeKey } from '../common/translationKey';
import { Department } from '../helpers/department';

interface IDisciplineComponentProperties {
    discipline: Department;
    value: number;
    showIncrease: boolean;
    showDecrease: boolean;
    onDecrease: () => void;
    onIncrease: () => void;
}

const DisciplineComponent: React.FC<IDisciplineComponentProperties> = ({discipline, value, showDecrease, showIncrease, onIncrease, onDecrease}) => {

    const { t } = useTranslation();

    const dec = showDecrease
        ? (<img style={{ float: "left" }} height="20" src="static/img/dec.png" onClick={ () => onDecrease() } alt="-"/>)
        : undefined;

    const inc = showIncrease
        ? (<img style={{ float: "right" }} height="20" src="static/img/inc.png" onClick={ () => onIncrease() }alt="+"/>)
        : undefined;

    return (
        <div className="stat pb-2">
            <div className="stat-entry-name purple">
                {t(makeKey('Construct.discipline.', Department[discipline]))}
            </div>
            <div className="stat-entry-value">
                {dec}
                {value}
                {inc}
            </div>
        </div>
    );
}


export default DisciplineComponent;
