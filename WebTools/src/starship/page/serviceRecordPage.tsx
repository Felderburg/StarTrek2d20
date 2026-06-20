import ReactMarkdown from "react-markdown";
import { Starship } from "../../common/starship";
import { Header } from "../../components/header";
import { ShipBuildWorkflow } from "../model/shipBuildWorkflow";
import ShipBuildingBreadcrumbs from "../view/shipBuildingBreadcrumbs";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { nextStarshipWorkflowStep, setStarshipServiceRecord } from "../../state/starshipActions";
import store from "../../state/store";
import { Navigation } from "../../common/navigator";
import { ServiceRecord, ServiceRecordList, ServiceRecordModel } from "../model/serviceRecord";
import { TalentsHelper } from "../../helpers/talents";
import { CheckBox } from "../../components/checkBox";
import { connect } from "react-redux";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import { hasSource } from "../../state/contextFunctions";
import { SimpleSystemSelector } from "../../components/simpleSystemSelector";
import { System } from "../../helpers/systems";
import { PageIdentity } from "../../pages/pageIdentity";
import { SimpleStringSelector } from "../../modify/page/simpleStringSelector";
import Markdown from "react-markdown";
import { StarshipFreeformTalentSelectionView } from "../../components/starshipFreeformTalentSelectionView";
import { SelectedTalent } from "../../common/selectedTalent";
import { Dialog } from "../../components/dialog";
import { determineSelectedTalentExtraErrors } from "../../common/selectedTalentExtraCheck";


interface IServiceRecordPageProperties {
    starship: Starship;
    workflow: ShipBuildWorkflow;
}

const ServiceRecordPage: React.FC<IServiceRecordPageProperties> = ({starship, workflow}) => {
    const { t } = useTranslation();

    const nextPage = () => {
        let ok = true;
        if (starship.serviceRecordStep?.type?.type === ServiceRecord.MajorRefit) {
            if (starship.serviceRecordStep?.system == null) {
                ok = false;
                Dialog.show(t('Common.error.system'));
            } else if (starship.serviceRecordStep?.removedTalent == null
                    || starship.serviceRecordStep?.selectedTalent == null) {
                ok = false;
                Dialog.show(t('ServiceRecordPage.error.talents'));
            } else if (determineSelectedTalentExtraErrors(starship.serviceRecordStep?.selectedTalent) != null) {
                ok = false;
                Dialog.show(determineSelectedTalentExtraErrors(starship.serviceRecordStep?.selectedTalent));
            }
        } else if ([ServiceRecord.BroughtOutOfMothballs, ServiceRecord.StateOfTheArt].includes(starship.serviceRecordStep?.type?.type)) {
            if (starship.serviceRecordStep?.system == null) {
                ok = false;
                Dialog.show(t('Common.error.system'));
            }
        }

        if (ok) {
            store.dispatch(nextStarshipWorkflowStep());
            Navigation.navigateToPage(PageIdentity.StarshipRefits);
        }
    }

    const onExtraDetailChange = (selection?: string|System) => {
        if (starship.serviceRecordStep) {
            store.dispatch(setStarshipServiceRecord(starship.serviceRecordStep.type,
                starship.serviceRecordStep.specialRule, selection,
                starship.serviceRecordStep.removedTalent,
                starship.serviceRecordStep.selectedTalent));
        }
    }

    const onRemovedTalentChange = (selection?: string) => {
        if (starship.serviceRecordStep) {
            store.dispatch(setStarshipServiceRecord(starship.serviceRecordStep.type,
                starship.serviceRecordStep.specialRule, undefined, selection));
        }
    }

    const onSelectedTalentChange = (selection?: SelectedTalent) => {
        if (starship.serviceRecordStep) {
            store.dispatch(setStarshipServiceRecord(starship.serviceRecordStep.type,
                starship.serviceRecordStep.specialRule, undefined,
                starship.serviceRecordStep?.removedTalent,
                selection));
        }
    }

    const onServiceRecordSelection = (serviceRecord: ServiceRecordModel) => {
        if (serviceRecord.type === starship.serviceRecordStep?.type.type) {
            store.dispatch(setStarshipServiceRecord(null, null));
        } else {
            const talent = TalentsHelper.getTalent(serviceRecord.specialRule);
            store.dispatch(setStarshipServiceRecord(serviceRecord, talent));
        }
    }

    const getSpaceframeTalents = () => {
        return starship.spaceframeStep?.model
            ?.talentsEffectiveForDate(starship.serviceYear)
            ?.filter(t => !t.talentModel.isSpecialRule(starship.version))
            ?.map(t => t.name) ?? [];
    }

    let serviceRecords = ServiceRecordList.instance.records
        .filter(r => hasSource(r.source))
        .filter(r => r.starshipType == null || r.starshipType === starship.type)
    serviceRecords.sort((r1, r2) => {
        if (r1.name === r2.name) {
            return r2.type - r1.type;
        } else {
            return r1.name.localeCompare(r2.name);
        }
    });

    const rows = serviceRecords.map((r, i) => {
        const talent = TalentsHelper.getTalent(r.specialRule);

        return (
            <tbody key={i}>
                <tr>
                    <td className=""><div className="selection-header">{r.name}</div></td>
                    <td className="">{r.description}</td>
                    <td className="">{talent.localizedName}</td>
                    <td><CheckBox
                            isChecked={starship.serviceRecordStep?.type?.type === r.type}
                            text=""
                            value={r.type}
                            onChanged={() => { onServiceRecordSelection(r); } }/></td>
                </tr>
                {starship.serviceRecordStep?.type?.type === r.type
                    ? (<tr>
                        <td></td>
                        <td>
                            <div className="markdown-sm">
                                <p><strong>{starship.serviceRecordStep.specialRule.localizedName}</strong></p>
                            </div>
                            <Markdown className="markdown-sm">{starship.serviceRecordStep.specialRule.localizedDescription2e}</Markdown>
                        </td>
                        <td></td>
                    </tr>)
                    : undefined}
                {starship.serviceRecordStep?.type?.type === ServiceRecord.SurvivorOfX &&
                r.type === ServiceRecord.SurvivorOfX
                    ? (<tr>
                        <td></td>
                        <td colSpan={3}><InputFieldAndLabel
                            id="selection"
                            value={starship.serviceRecordStep?.selection ?? ""}
                            labelName={t('ServiceRecordPage.survivorOfX.selection')}
                            onChange={(v) => onExtraDetailChange(v)}
                        /></td>
                    </tr>)
                    : undefined
                }
                {starship.serviceRecordStep?.type?.type === ServiceRecord.BroughtOutOfMothballs &&
                r.type === ServiceRecord.BroughtOutOfMothballs
                    ? (<tr>
                        <td></td>
                        <td colSpan={2}>
                            <div className="row"><div className="col-12 col-md-6">
                                <SimpleSystemSelector
                                starship={starship}
                                isChecked={(s) => starship.serviceRecordStep.system === s}
                                onSelectSystem={(v) => onExtraDetailChange(v)}
                                />
                            </div></div>
                        </td>
                        <td></td>
                    </tr>)
                    : undefined
                }
                {starship.serviceRecordStep?.type?.type === ServiceRecord.StateOfTheArt &&
                r.type === ServiceRecord.StateOfTheArt
                    ? (<tr>
                        <td></td>
                        <td colSpan={2}>
                            <div className="row"><div className="col-12 col-md-6">
                                <SimpleSystemSelector
                                    starship={starship}
                                    isChecked={(s) => starship.serviceRecordStep.system === s}
                                    onSelectSystem={(v) => onExtraDetailChange(v)} />
                            </div></div>
                        </td>
                        <td></td>
                    </tr>)
                    : undefined
                }
                {starship.serviceRecordStep?.type?.type === ServiceRecord.MajorRefit &&
                r.type === ServiceRecord.MajorRefit
                    ? (<>
                        <tr>
                        <td></td>
                            <td colSpan={2}>
                                <div className="row"><div className="col-12 col-md-6">
                                    <p>{t('Construct.other.systems')}</p>
                                    <SimpleSystemSelector
                                        starship={starship}
                                        isChecked={(s) => starship.serviceRecordStep.system === s}
                                        onSelectSystem={(v) => onExtraDetailChange(v)}
                                        />
                                    </div></div>
                                </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan={2}>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <p>{t('ServiceRecordPage.removeTalent')}</p>
                                        <SimpleStringSelector
                                            values={getSpaceframeTalents()}
                                            isChecked={(v) => v === starship.serviceRecordStep?.removedTalent}
                                            onSelect={(v) => onRemovedTalentChange(v)} />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <p>{t('ServiceRecordPage.replacedTalent')}</p>
                                        <StarshipFreeformTalentSelectionView
                                            starship={starship}
                                            selectedTalent={starship.serviceRecordStep?.selectedTalent}
                                            setSelectedTalent={(s) => onSelectedTalentChange(s)} />
                                    </div>
                                </div>
                            </td>
                            <td></td>
                        </tr>
                    </>)
                    : undefined
                }
            </tbody>);
    });

    return (<div className="page container ms-0">
        <ShipBuildingBreadcrumbs />
        <Header>{t('Page.title.starshipServiceRecord')}</Header>
        <ReactMarkdown>{t('ServiceRecordPage.instruction')}</ReactMarkdown>

        <table className="selection-list w-100">
            <thead>
                <tr>
                    <td></td>
                    <td className="d=none d-md-table-cell" >{t('Common.text.description')}</td>
                    <td className="d=none d-md-table-cell" style={{paddingLeft: "0.75rem"}}>{t('Construct.other.specialRules')}</td>
                    <td></td>
                </tr>
            </thead>
            {rows}
        </table>
        <div className="text-end mt-4">
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

export default connect(mapStateToProps)(ServiceRecordPage);
