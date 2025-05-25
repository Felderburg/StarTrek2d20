import React, { useState } from 'react';
import { Department, DepartmentsHelper } from '../helpers/department';
import { useTranslation } from 'react-i18next';
import { makeKey } from '../common/translationKey';
import { ICharacterProperties, characterMapStateToProperties } from '../solo/page/soloCharacterProperties';
import { connect } from 'react-redux';
import store from '../state/store';
import { setSupportingCharacterDepartments } from '../state/characterActions';
import { ValueView } from '../components/valueView';

const SupportingCharacterDisciplines: React.FC<ICharacterProperties> = ({character}) => {

    const { t } = useTranslation();
    const [selectedDiscipline, setSelectedDiscipline] = useState(undefined);

    const selectValue = (index: Department) => {
        if (index > -1) {
            if (selectedDiscipline === undefined) {
                setSelectedDiscipline(index);
            } else {
                swapValues(selectedDiscipline, index);
            }
        } else {
            setSelectedDiscipline(undefined);
        }
    }

    const swapValues = (from: Department, to: Department) => {
        let disciplineList = [...character.supportingStep?.disciplines];
        let newList = disciplineList.map(d => {
            if (d === from) {
                return to;
            } else if (d === to) {
                return from;
            } else {
                return d;
            }
        })

        updateCharacterDisciplines(newList);
        setSelectedDiscipline(undefined);
    }

    const updateCharacterDisciplines = (disciplines: Department[]) => {
        store.dispatch(setSupportingCharacterDepartments(disciplines));
    }

    const disciplines = DepartmentsHelper.instance.getDepartments().map((s, i) => {
        return (
            <tr key={i}>
                <td className="selection-header">{t(makeKey('Construct.discipline.', Department[s]))}</td>
                <td>
                    <ValueView
                        index={s}
                        value={character.departments[s]}
                        onSelect={(index) => selectValue(s) }
                        isSelected={selectedDiscipline === s} />
                </td>
            </tr>
        );
    });

    return (
        <table className="selection-list">
            <thead>
                <tr>
                    <td>{t('Construct.other.discipline')}</td>
                    <td>{t('SupportingCharacter.numericalValue')}</td>
                </tr>
            </thead>
            <tbody>
                {disciplines}
            </tbody>
        </table>
    );
}

export default connect(characterMapStateToProperties)(SupportingCharacterDisciplines)