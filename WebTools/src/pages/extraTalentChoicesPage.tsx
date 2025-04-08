import React from 'react';
import { CheckBox } from '../components/checkBox';
import Button from 'react-bootstrap/Button';
import { PageIdentity } from './pageIdentity';
import { Navigation } from '../common/navigator';
import CharacterCreationBreadcrumbs from '../components/characterCreationBreadcrumbs';
import { Header } from '../components/header';
import replaceDiceWithArrowhead from '../common/arrowhead';
import store from '../state/store';
import { addCharacterBorgImplant, removeCharacterBorgImplant } from '../state/characterActions';
import { BorgImplants, Implant } from '../helpers/borgImplant';
import { ICharacterProperties, characterMapStateToProperties } from '../solo/page/soloCharacterProperties';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { TALENT_NAME_BORG_IMPLANTS } from '../helpers/talents';

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

    return (<div className="page container ms-0">
            <CharacterCreationBreadcrumbs />
            <main>
                <Header>Additional Talent Details</Header>

                <p>Some of your talents require a few extra decisions.</p>

                <div className="row">
                    {renderImplants()}
                </div>

                <div className="text-end my-4">
                    <Button onClick={() => onNext()} >{t('Common.button.next')}</Button>
                </div>
            </main>
        </div>);
}

export default connect(characterMapStateToProperties)(ExtraTalentChoicesPage);