import * as React from 'react';

import { Starship } from '../../common/starship';
import { CheckBox } from '../../components/checkBox';
import { Department } from '../../helpers/department';
import { MissionProfileHelper, MissionProfileModel } from '../../helpers/missionProfiles';
import { withTranslation, WithTranslation } from 'react-i18next';
import { StatView } from '../../components/StatView';

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
                        <td className=""><div className="selection-header">{m.localizedName}</div> {notes}</td>
                        <td className="d-none d-md-table-cell">
                            <div className="row row-cols-1 row-cols-lg-3" style={{maxWidth: "32rem"}}>
                                <StatView name={t('Construct.department.command')} value={m.departments[Department.Command]}
                                    className="col mb-1" showZero={true} />
                                <StatView name={t('Construct.department.security')} value={m.departments[Department.Security]}
                                    className="col mb-1" showZero={true} />
                                <StatView name={t('Construct.department.science')} value={m.departments[Department.Science]}
                                    className="col mb-1" showZero={true} />
                                <StatView name={t('Construct.department.conn')} value={m.departments[Department.Conn]}
                                    className="col mb-1" showZero={true} />
                                <StatView name={t('Construct.department.engineering')} value={m.departments[Department.Engineering]}
                                    className="col mb-1" showZero={true} />
                                <StatView name={t('Construct.department.medicine')} value={m.departments[Department.Medicine]}
                                    className="col mb-1" showZero={true} />
                            </div>
                        </td>
                        <td className="d-none d-md-table-cell" style={{ verticalAlign: "top", paddingLeft: "0.75rem" }}>
                            <div style={{minHeight: "5rem" }}>{talents}</div>
                        </td>
                        <td>
                            <CheckBox
                                isChecked={this.props.initialSelection != null && this.props.initialSelection.id === m.id}
                                text=""
                                value={m.id}
                                onChanged={() => { this.props.onSelection(m); } }/>
                        </td>
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
                            <th className="d-none d-md-table-cell">{t('Construct.other.departments')}</th>
                            <th className="d-none d-md-table-cell" style={{ paddingLeft: "0.75rem"}}>Talent options</th>
                            <th></th>
                        </tr>
                    </thead>
                    {missionProfiles}
                </table>
            </div>);
    }

}

export default withTranslation()(MissionProfileSelection);