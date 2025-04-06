import React from 'react';
import { CheckBox } from '../components/checkBox';
import Button from 'react-bootstrap/Button';
import { PageIdentity } from './pageIdentity';
import { Navigation } from '../common/navigator';
import CharacterCreationBreadcrumbs from '../components/characterCreationBreadcrumbs';
import { Header } from '../components/header';
import replaceDiceWithArrowhead from '../common/arrowhead';
import store from '../state/store';
import { addCharacterBorgImplant, addCharacterTalentFocus, addCharacterTalentValue, removeCharacterBorgImplant } from '../state/characterActions';
import { BorgImplants, Implant } from '../helpers/borgImplant';
import { ICharacterProperties, characterMapStateToProperties } from '../solo/page/soloCharacterProperties';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { TALENT_NAME_BORG_IMPLANTS, TALENT_NAME_WISDOM_OF_YEARS } from '../helpers/talents';
import { InputFieldAndLabel } from '../common/inputFieldAndLabel';
import D20IconButton from '../solo/component/d20IconButton';
import { ValueRandomTable } from '../solo/table/valueRandomTable';
import { FocusRandomTable } from '../solo/table/focusRandomTable';

const ExtraTalentChoicesPage : React.FC<ICharacterProperties> = ({character}) => {

    const { t } = useTranslation();

    const selectImplant = (implant: Implant) => {
        if (character.implants.indexOf(implant.type) >= 0) {
            store.dispatch(removeCharacterBorgImplant(implant.type));
        } else {
            store.dispatch(addCharacterBorgImplant(implant.type));
        }
    }

    const onNext = () => {
        Navigation.navigateToPage(PageIdentity.Finish);
    }

    const selectRandomValue = (talent: string) => {
        let done = false;
        while (!done) {
            let value = ValueRandomTable(character.speciesStep?.species, character.educationStep?.primaryDiscipline);
            if (character.values.indexOf(value) < 0) {
                done = true;
                store.dispatch(addCharacterTalentValue(value, talent));
            }
        }
    }

    const selectRandomFocus = (talent: string, index: number) => {
        let done = false;
        while (!done) {
            let focus = FocusRandomTable(character.educationStep?.primaryDiscipline);
            if (character.focuses.indexOf(focus) < 0) {
                done = true;
                store.dispatch(addCharacterTalentFocus(focus, talent, index));
            }
        }
    }

    const renderImplants = () => {
        if (character.hasTalent(TALENT_NAME_BORG_IMPLANTS)) {
            const implants = BorgImplants.instance.implants.map((implant, i) => {
                return (
                    <tr>
                        <td>
                            <CheckBox
                                isChecked={character.implants.indexOf(implant.type) > -1}
                                onChanged={(val) => { selectImplant(implant); }}
                                value={implant.name} />
                        </td>
                        <td className="selection-header-small">{implant.name}</td>
                        <td>{replaceDiceWithArrowhead(implant.description)}</td>
                    </tr>
                );
            });

            return (
                <div className="col-lg-12 my-4">
                    <Header level={2}>Borg Implants</Header>
                    <p>
                        You have the talent "Borg Implants", which allows you to select up to 3 implants.
                        Each implant increases the difficulty of Medicine Tasks performed on you.
                    </p>
                    <table className="selection-list">
                        <tbody>
                            {implants}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return undefined;
        }
    }

    const selectValue = (value, talentName) => {
        store.dispatch(addCharacterTalentValue(value, talentName));
    }
    const addFocus = (focus, talentName, index) => {
        store.dispatch(addCharacterTalentFocus(focus, talentName, index));
    }

    const renderWisdomOfYears = () => {
        if (character.hasTalent(TALENT_NAME_WISDOM_OF_YEARS)) {
            let talent = character.getTalentByName(TALENT_NAME_WISDOM_OF_YEARS);
            return (<div className="mt-4 col-lg-6">
                    <Header level={2}>Wisdom of Years</Header>
                    <p>Characters with the talent "Wisdom of Years" may choose 1 additional focus.</p>
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <InputFieldAndLabel id="wisdom-focus1" labelName={t('Construct.other.focus')}
                            value={talent?.focuses[0] || ""} className="mt-1"
                            onChange={(v) => addFocus(v, TALENT_NAME_WISDOM_OF_YEARS, 0)} />
                        <div style={{ flexShrink: 0 }} className="mt-1">
                            <D20IconButton onClick={() => selectRandomFocus(TALENT_NAME_WISDOM_OF_YEARS, 0)}/>
                        </div>
                    </div>
                    <div><small className="text-white">
                        Choose a focus reflecting the insights you received from your long life
                    </small></div>

                    <p className="mt-4">They may also choose 1 additional value.</p>
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <InputFieldAndLabel id="wisdom-value" labelName={t('Construct.other.value')}
                            value={talent?.value || ""} className="mt-1"
                            onChange={(v) => selectValue(v, TALENT_NAME_WISDOM_OF_YEARS)} />
                        <div style={{ flexShrink: 0 }} className="mt-1">
                            <D20IconButton onClick={() => selectRandomValue(TALENT_NAME_WISDOM_OF_YEARS)}/>
                        </div>
                    </div>

                </div>);
        } else {
            return undefined;
        }
    }

    return (<div className="page container ms-0">
            <CharacterCreationBreadcrumbs />
            <main>
                <Header>Additional Talent Details</Header>

                <p>Some of your talents require a few extra decisions.</p>

                <div className="row">
                    {renderImplants()}
                    {renderWisdomOfYears()}
                </div>

                <div className="text-end my-4">
                    <Button onClick={() => onNext()} >{t('Common.button.next')}</Button>
                </div>
            </main>
        </div>);
}

export default connect(characterMapStateToProperties)(ExtraTalentChoicesPage);