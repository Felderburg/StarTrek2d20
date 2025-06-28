import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { PageIdentity } from '../../pages/pageIdentity';
import { Navigation } from '../../common/navigator';
import { Header } from '../../components/header';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { IStarshipProperties } from '../iStarshipProperties';
import { ShipBuildWorkflow } from '../model/shipBuildWorkflow';
import store from '../../state/store';
import { nextStarshipWorkflowStep, setStarshipSpaceframeTalents } from '../../state/starshipActions';
import ShipBuildingBreadcrumbs from '../view/shipBuildingBreadcrumbs';
import { StarshipDepartmentSelector } from '../../components/simpleDepartmentSelector';
import { SelectedTalent } from '../../common/selectedTalent';
import { TALENT_NAME_DEDICATED_PERSONNEL } from '../../helpers/talents';

interface IExtraStarshipTalentChoicesProperties extends IStarshipProperties {
    workflow: ShipBuildWorkflow;
}

const ExtraStarshipTalentChoicesPage : React.FC<IExtraStarshipTalentChoicesProperties> = ({starship, workflow}) => {

    const { t } = useTranslation();
    const [ selection, setSelection ] = useState(
        starship.spaceframeStep.talents[0] ?? new SelectedTalent(TALENT_NAME_DEDICATED_PERSONNEL));

    const onNext = () => {
        if (starship.spaceframeModel.isMissionPodAvailable) {
            Navigation.navigateToPage(PageIdentity.MissionPodSelection);
        } else {
            let step = workflow.peekNextStep();
            store.dispatch(nextStarshipWorkflowStep());
            Navigation.navigateToPage(step.page);
        }
    }

    const renderDedicatedPersonnnel = () => {
        return (<div className="row">
            <div className="col-12 col-md-6">
                <StarshipDepartmentSelector
                    starship={starship}
                    isChecked={d => selection.department === d}
                    onSelectDepartment={d => {
                        let temp = selection?.copy();
                        if (temp) {
                            temp.department = d;
                        }
                        setSelection(temp);
                        store.dispatch(setStarshipSpaceframeTalents([ temp ]));
                    }}
                />
            </div>
        </div>);
    }

    return (<div className="page container ms-0">
            <ShipBuildingBreadcrumbs />
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
        starship: state.starship.starship,
        workflow: state.starship.workflow
    };
}

export default connect(mapStateToProps)(ExtraStarshipTalentChoicesPage);