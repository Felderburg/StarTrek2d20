import React from 'react';
import Button from 'react-bootstrap/Button';
import { PageIdentity } from '../../pages/pageIdentity';
import { Navigation } from '../../common/navigator';
import CharacterCreationBreadcrumbs from '../../components/characterCreationBreadcrumbs';
import { Header } from '../../components/header';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { IStarshipProperties } from '../iStarshipProperties';

const ExtraStarshipTalentChoicesPage : React.FC<IStarshipProperties> = ({starship}) => {

    const { t } = useTranslation();

    const onNext = () => {
        Navigation.navigateToPage(PageIdentity.Finish);
    }

    const renderDedicatedPersonnnel = () => {
        return undefined;
    }

    return (<div className="page container ms-0">
            <CharacterCreationBreadcrumbs />
            <main>
                <Header>Additional Talent Details</Header>

                <p>Some of your talents require a few extra decisions.</p>

                <div className="row">
                    {renderDedicatedPersonnnel()}
                </div>

                <div className="text-end my-4">
                    <Button onClick={() => onNext()} >{t('Common.button.next')}</Button>
                </div>
            </main>
        </div>);
}

function mapStateToProps(state, ownProps) {
    return {
        starship: state.starship.starship
    };
}

export default connect(mapStateToProps)(ExtraStarshipTalentChoicesPage);