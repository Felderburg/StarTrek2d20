import React, { useEffect, useState } from 'react';
import { characterMapStateToProperties, ICharacterProperties } from '../../solo/page/soloCharacterProperties';
import { useTranslation } from 'react-i18next';
import { Department, DepartmentsHelper } from '../../helpers/department';
import store from '../../state/store';
import { setNpcCharacterDepartments } from '../../state/characterActions';
import { makeKey } from '../../common/translationKey';
import { connect } from 'react-redux';
import { NpcTypes } from '../model/npcType';
import { ValueView } from '../../components/valueView';

const NpcDepartmentView: React.FC<ICharacterProperties> = ({character}) => {

    const { t } = useTranslation();
    const [selectedDiscipline, setSelectedDiscipline] = useState(undefined);

    useEffect(() => {
        if (!(character.npcGenerationStep?.departments?.filter(d => !d)?.length)) {
            store.dispatch(setNpcCharacterDepartments(NpcTypes.departmentPoints(character.npcGenerationStep?.type)));
        }
    }, []);


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
        let departments = [...character.npcGenerationStep?.departments];
        let fromValue = departments[from];
        let toValue = departments[to];
        departments[from] = toValue;
        departments[to] = fromValue;
        store.dispatch(setNpcCharacterDepartments(departments));
        setSelectedDiscipline(undefined);
    }

    const departments = DepartmentsHelper.instance.getDepartments().map((s, i) => {
        return (
            <tr key={i}>
                <td className="selection-header">{t(makeKey('Construct.discipline.', Department[s]))}</td>
                <td className="text-end">
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
                    <td className="text-end pe-4">{t('SupportingCharacter.numericalValue')}</td>
                </tr>
            </thead>
            <tbody>
                {departments}
            </tbody>
        </table>
    );
}

export default connect(characterMapStateToProperties)(NpcDepartmentView)