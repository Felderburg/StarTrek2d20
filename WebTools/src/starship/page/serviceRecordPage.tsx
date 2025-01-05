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


interface IServiceRecordPageProperties {
    starship: Starship;
    workflow: ShipBuildWorkflow;
}

const ServiceRecordPage: React.FC<IServiceRecordPageProperties> = ({starship, workflow}) => {
    const { t } = useTranslation();

    const nextPage = () => {
        let step = workflow.peekNextStep();
        store.dispatch(nextStarshipWorkflowStep());
        Navigation.navigateToPage(step.page);
    }

    const onExtraDetailChange = (selection?: string) => {
        if (starship.serviceRecordStep) {
            store.dispatch(setStarshipServiceRecord(starship.serviceRecordStep.type,
                starship.serviceRecordStep.specialRule, selection));
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

    let serviceRecords = ServiceRecordList.instance.records
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
                {starship.serviceRecordStep?.type?.type === ServiceRecord.SurvivorOfX &&
                r.type === ServiceRecord.SurvivorOfX
                    ? (<tr>
                        <td></td>
                        <td rowSpan={4}><InputFieldAndLabel
                            id="selection"
                            value={starship.serviceRecordStep?.selection ?? ""}
                            labelName={t('ServiceRecordPage.survivorOfX.selection')}
                            onChange={(v) => onExtraDetailChange(v)}
                        /></td>
                    </tr>)
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
