import * as React from 'react';

import { Starship } from '../../common/starship';
import { CheckBox } from '../../components/checkBox';
import { Department } from '../../helpers/departments';
import { MissionProfileHelper, MissionProfileModel } from '../../helpers/missionProfiles';
import { withTranslation, WithTranslation } from 'react-i18next';

interface IMissionProfileSelectionProperties extends WithTranslation {
    initialSelection?: MissionProfileModel;
    starship: Starship;
    onSelection: (s: MissionProfileModel) => void;
}

class MissionProfileSelection extends React.Component<IMissionProfileSelectionProperties, {}> {

    render() {
        const { t } = this.props;

        const starship = this.props.starship;
        const missionProfiles = MissionProfileHelper.getMissionProfiles(this.props.starship).map((m, i) => {
            const talents = m.talents.map((t, ti) => {
                if (t.isSourcePrerequisiteFulfilled(starship)) {
                    return (<div key={ti} style={{ padding: "2px"}}>{t.localizedDisplayName}</div>);
                } else {
                    return undefined;
                }
            });
            const notes = m.notes !== "" ? (<div className="p-1">{m.notes}</div>) : undefined;

            return (
                <tbody key={i}>
                    <tr>
                        <td className="" rowSpan={2}><div className="selection-header">{m.localizedName}</div> {notes}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{t('Construct.department.command')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{m.departments[Department.Command]}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{t('Construct.department.security')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{m.departments[Department.Security]}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{t('Construct.department.science')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{m.departments[Department.Science]}</td>
                        <td className="d=none d-md-table-cell" style={{ verticalAlign: "top", paddingLeft: "0.75rem" }} rowSpan={2}><div style={{minHeight: "80px" }}>{talents}</div></td>
                        <td rowSpan={2}>
                            <CheckBox
                                isChecked={this.props.initialSelection != null && this.props.initialSelection.id === m.id}
                                text=""
                                value={m.id}
                                onChanged={() => { this.props.onSelection(m); } }/>
                        </td>
                    </tr>
                    <tr>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{t('Construct.department.conn')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{m.departments[Department.Conn]}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{t('Construct.department.engineering')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{m.departments[Department.Engineering]}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{t('Construct.department.medicine')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{m.departments[Department.Medicine]}</td>
                    </tr>
                </tbody>
            );
        });

        return (
            <div>
                <table className="selection-list w-100">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="d=none d-md-table-cell" style={{ textAlign: "left"}} colSpan={6}>{t('Construct.other.departments')}</th>
                            <th className="d=none d-md-table-cell" style={{ textAlign: "left",  paddingLeft: "0.75rem"}}>Talent options</th>
                            <th></th>
                        </tr>
                    </thead>
                    {missionProfiles}
                </table>
            </div>);
    }

}

export default withTranslation()(MissionProfileSelection);