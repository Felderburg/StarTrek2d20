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
import { TALENT_NAME_DEDICATED_PERSONNEL, TALENT_NAME_REDUNDANT_SYSTEMS, TalentsHelper } from '../../helpers/talents';
import Markdown from 'react-markdown';
import { SimpleSystemSelector } from '../../components/simpleSystemSelector';
import { Dialog } from '../../components/dialog';

interface IExtraStarshipTalentChoicesProperties extends IStarshipProperties {
    workflow: ShipBuildWorkflow;
}

const ExtraStarshipTalentChoicesPage : React.FC<IExtraStarshipTalentChoicesProperties> = ({starship, workflow}) => {

    let defaultTalent = null;

    if (starship.spaceframeStep.model.talents.filter(t => t.name === TALENT_NAME_DEDICATED_PERSONNEL)?.length) {
        defaultTalent = new SelectedTalent(TALENT_NAME_DEDICATED_PERSONNEL);
    } else if (starship.spaceframeStep.model.talents.filter(t => t.name === TALENT_NAME_REDUNDANT_SYSTEMS)?.length) {
        defaultTalent = new SelectedTalent(TALENT_NAME_REDUNDANT_SYSTEMS);
    }

    const { t } = useTranslation();
    const [ selection, setSelection ] = useState(starship.spaceframeStep.talents[0] ?? defaultTalent);

    const onNext = () => {
        if (selection.name === TALENT_NAME_REDUNDANT_SYSTEMS && selection.system == null) {
            Dialog.show(t('Common.error.system'));
        } else if (selection.name === TALENT_NAME_DEDICATED_PERSONNEL && selection.department == null) {
            Dialog.show(t('Common.error.department'));
        } else if (starship.spaceframeModel.isMissionPodAvailable) {
            Navigation.navigateToPage(PageIdentity.MissionPodSelection);
        } else {
            let step = workflow.peekNextStep();
            store.dispatch(nextStarshipWorkflowStep());
            Navigation.navigateToPage(step.page);
        }
    }

    const renderDedicatedPersonnnel = () => {
        const talent = TalentsHelper.getTalent(TALENT_NAME_DEDICATED_PERSONNEL);
        return (<div className="row">
            <div className="col-12 col-md-6 mt-4">
                <Header level={2}>{talent.localizedName}</Header>
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

    const renderRedundantSystems = () => {
        const talent = TalentsHelper.getTalent(TALENT_NAME_REDUNDANT_SYSTEMS);
        return (<div className="row">
            <div className="col-12 col-md-6 mt-4">
                <Header level={2}>{talent.localizedName}</Header>
                <SimpleSystemSelector
                    starship={starship}
                    isChecked={s => selection.system === s}
                    onSelectSystem={s => {
                        let temp = selection?.copy();
                        if (temp) {
                            temp.system = s;
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
                <Header>{t('Page.title.extraTalentDetails')}</Header>

                <Markdown>{t('ExtraStarshipTalentChoice.instruction')}</Markdown>

                <div className="row">
                    {selection.name === TALENT_NAME_DEDICATED_PERSONNEL ? renderDedicatedPersonnnel() : undefined}
                    {selection.name === TALENT_NAME_REDUNDANT_SYSTEMS ? renderRedundantSystems() : undefined}
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