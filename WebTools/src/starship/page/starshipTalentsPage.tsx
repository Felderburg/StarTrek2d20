import React from "react";
import { connect } from "react-redux";
import { Navigation } from "../../common/navigator";
import { Starship } from "../../common/starship";
import Button from "react-bootstrap/Button";
import { Dialog } from "../../components/dialog";
import { Header } from "../../components/header";
import { TalentsHelper } from "../../helpers/talents";
import { nextStarshipWorkflowStep, setAdditionalTalents } from "../../state/starshipActions";
import store from "../../state/store";
import { ShipBuildWorkflow } from "../model/shipBuildWorkflow";
import ShipBuildingBreadcrumbs from "../view/shipBuildingBreadcrumbs";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { SelectedTalent } from "../../common/selectedTalent";
import MultiTalentSelectionView from "../../components/multiTalentSelectionView";
import { RankedTalent } from "../../helpers/rankedTalent";
import { isMultiSelectionTalent } from "../../helpers/isMultiSelectionTalent";
import { determineSelectedTalentExtraErrors } from "../../common/selectedTalentExtraCheck";

interface ISimpleStarshipPageProperties {
    starship: Starship;
    workflow: ShipBuildWorkflow;
}

const StarshipTalentsPage: React.FC<ISimpleStarshipPageProperties> = ({starship, workflow}) => {

    const { t } = useTranslation();

    const nextPage = () => {
        let message = undefined;
        for (let i = 0; i < starship.additionalTalents?.length && message == null; i++) {
            message = determineSelectedTalentExtraErrors(starship.additionalTalents[i], starship);
        }

        if (starship.freeTalentSlots > starship.additionalTalents.length) {
            Dialog.show("Please select " + starship.freeTalentSlots + ((starship.freeTalentSlots === 1) ? ' talent ' : ' talents ') + " before proceeding.");
        } else if (message) {
            Dialog.show(message);
        } else {
            let step = workflow.peekNextStep();
            store.dispatch(nextStarshipWorkflowStep());
            Navigation.navigateToPage(step.page);
        }
    }

    const updateSelectedTalent = (rankedTalent: RankedTalent, selection?: SelectedTalent) => {

        let temp = [...(starship.additionalTalents ?? [])];
        if (selection == null) {
            if (rankedTalent.rank === undefined) {
                temp = temp.filter(t => t.talent !== rankedTalent.name);
            } else {
                let count = 0;
                temp = temp.filter(t => {
                    let result = t.talent !== rankedTalent.name || (count+1) !== rankedTalent.rank
                    if (t.name === rankedTalent.name) {
                        count++;
                    }
                    return result;
                });
            }
        } else {
            if (rankedTalent.rank === undefined) {
                temp = temp.filter(t => t.talent !== rankedTalent.name);
                temp.push(selection);
            } else {
                let count = 0;
                let index = undefined;
                temp.forEach((t,i) => {
                    if (t.talent === rankedTalent.name && (count+1) === rankedTalent.rank) {
                        index = i;
                    }
                    if (t.talent === rankedTalent.name) {
                        count++;
                    }
                });

                if (index === undefined) {
                    temp.push(selection);
                } else {
                    temp[index] = selection;
                }
            }
        }
        const numberOfTalents = starship.freeTalentSlots;
        if (temp.length > numberOfTalents) {
            temp.splice(0, temp.length-numberOfTalents);
        }
        store.dispatch(setAdditionalTalents(temp));
    }

    const talentList = () => {
        let talents = starship
            ? TalentsHelper.getStarshipOrStationTalents(starship, true)
            : [];

        let rankedTalents = [];
        talents.forEach(t => {
            if (t.maxRank > 1 || isMultiSelectionTalent(t)) {

                let initialCount = starship.talentsWithoutAdditional?.filter(s => s.talent === t.name)?.length ?? 0;
                let count = starship.talents?.filter(s => s.talent === t.name)?.length ?? 0;
                for (let i = initialCount; i < count+1; i++) {
                    rankedTalents.push(new RankedTalent(t, i + 1));
                }

            } else {
                let count = starship.talentsWithoutAdditional?.filter(s => s.talent === t.name)?.length ?? 0;
                if (count === 0) {
                    rankedTalents.push(new RankedTalent(t));
                }
            }
        });
        return rankedTalents;
    }

    return (<div className="page container ms-0">
        <ShipBuildingBreadcrumbs />
        <Header>{t('Page.title.starshipTalentSelection')}</Header>
        <ReactMarkdown>{t('StarshipTalentSelection.instruction_one', {count: starship.freeTalentSlots})}</ReactMarkdown>
        {starship.freeTalentSlots > 0
            ? (<MultiTalentSelectionView
                selections={starship.talents}
                talents={talentList()}
                construct={starship}
                onSelection={(talent, selectedTalent) => updateSelectedTalent(talent, selectedTalent)} />)
            : null}
        <div className="text-end mt-3">
            <Button onClick={() => nextPage()}>{t('Common.button.next')}</Button>
        </div>
    </div>);

}

function mapStateToProps(state, ownProps) {
    return {
        starship: state.starship.starship,
        workflow: state.starship.workflow
    };
}

export default connect(mapStateToProps)(StarshipTalentsPage);