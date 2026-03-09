import { useTranslation } from "react-i18next";
import { IStationPageProperties, stationMapStateToProperties } from "../iStationPageProperties";
import { determineSelectedTalentExtraErrors } from "../../common/selectedTalentExtraCheck";
import { Dialog } from "../../components/dialog";
import { RankedTalent } from "../../helpers/rankedTalent";
import { SelectedTalent } from "../../common/selectedTalent";
import { isMultiSelectionTalent } from "../../helpers/isMultiSelectionTalent";
import { TalentsHelper } from "../../helpers/talents";
import { Header } from "../../components/header";
import Markdown from "react-markdown";
import { Button } from "react-bootstrap";
import MultiTalentSelectionView from "../../components/multiTalentSelectionView";
import { connect } from "react-redux";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import store from "../../state/store";
import { setStationAdditionalTalents } from "../../state/stationActions";
import { useNavigate } from "react-router";
import StationBreadcrumbs from "../view/stationBreadcrumbs";
import { StationFrame } from "../../helpers/stationFrame";

const StationTalentsPage: React.FC<IStationPageProperties> = ({station}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const nextPage = () => {
        let message = undefined;
        for (let i = 0; i < station.additionalTalents?.length && message == null; i++) {
            message = determineSelectedTalentExtraErrors(station.additionalTalents[i], station);
        }

        if (station.freeTalentSlots > station.additionalTalents.length) {
            Dialog.show("Please select " + station.freeTalentSlots + ((station.freeTalentSlots === 1) ? ' talent ' : ' talents ') + " before proceeding.");
        } else if (message) {
            Dialog.show(message);
        } else if (station.stationFrameStep?.type !== StationFrame.Custom) {
            navigate("/station/final");
        } else {
            navigate("/station/weapons");
        }
    }

    const updateSelectedTalent = (rankedTalent: RankedTalent, selection?: SelectedTalent) => {

        let temp = [...(station.additionalTalents ?? [])];
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
        const numberOfTalents = station.freeTalentSlots;
        if (temp.length > numberOfTalents) {
            temp.splice(0, temp.length-numberOfTalents);
        }
        store.dispatch(setStationAdditionalTalents(temp));
    }

    const talentList = () => {
        let talents = station
            ? TalentsHelper.getStarshipOrStationTalents(station, true)
            : [];

        let rankedTalents = [];
        talents.forEach(t => {
            if (t.maxRank > 1 || isMultiSelectionTalent(t)) {

                let initialCount = station.baseTalents?.filter(s => s.talent === t.name)?.length ?? 0;
                let count = station.talents?.filter(s => s.talent === t.name)?.length ?? 0;
                for (let i = initialCount; i < count+1; i++) {
                    rankedTalents.push(new RankedTalent(t, i + 1));
                }

            } else {
                let count = station.baseTalents?.filter(s => s.talent === t.name)?.length ?? 0;
                if (count === 0) {
                    rankedTalents.push(new RankedTalent(t));
                }
            }
        });
        return rankedTalents;
    }

    return (<LcarsFrame activePage={PageIdentity.StationTalents}>
        <div id="app">
            <StationBreadcrumbs pageIdentity={PageIdentity.StationTalents} station={station} />
            <main className="page container ms-0">

                <Header>{t('Page.title.stationTalents')}</Header>
                <Markdown>{t('StarshipTalentSelection.instruction_one', {count: station.freeTalentSlots})}</Markdown>
                {station.freeTalentSlots > 0
                    ? (<MultiTalentSelectionView
                        selections={station.talents}
                        talents={talentList()}
                        construct={station}
                        onSelection={(talent, selectedTalent) => updateSelectedTalent(talent, selectedTalent)} />)
                    : null}

                <div className="text-end mt-3">
                    <Button onClick={() => nextPage()}>{t('Common.button.next')}</Button>
                </div>
            </main>
        </div>
    </LcarsFrame>);

}

export default connect(stationMapStateToProperties)(StationTalentsPage);