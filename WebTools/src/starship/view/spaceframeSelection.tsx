import * as React from 'react';

import { CharacterType } from '../../common/characterType';
import formatAsDelta from '../../common/formatAsDelta';
import { Starship } from '../../common/starship';
import { CheckBox } from '../../components/checkBox';
import { Department } from '../../helpers/departments';
import { Source } from '../../helpers/sources';
import { SpaceframeModel } from '../../helpers/spaceframeModel';
import { SpaceframeHelper } from '../../helpers/spaceframes';
import { System } from '../../helpers/systems';
import { hasAnySource } from '../../state/contextFunctions';
import { withTranslation, WithTranslation } from 'react-i18next';
import i18next from 'i18next';

interface ISpaceframeSelectionProperties extends WithTranslation {
    serviceYear: number;
    starship: Starship;
    type: CharacterType;
    initialSelection?: SpaceframeModel;
    onSelection: (s: SpaceframeModel) => void;
}

interface ISpaceframeSelectionState {
    allowAllFrames: boolean
}

class SpaceframeSelection extends React.Component<ISpaceframeSelectionProperties, ISpaceframeSelectionState> {

    constructor(props: ISpaceframeSelectionProperties) {
        super(props);
        this.state = {
            allowAllFrames: false
        };
    }

    render() {
        const { t } = this.props;

        let overrideCheckbox =(<CheckBox
            isChecked={this.state.allowAllFrames}
            text={t('SpaceframeSelectionPage.ignoreEndOfService')}
            value={!this.state.allowAllFrames}
            onChanged={(e) => { this.setState({ allowAllFrames: !this.state.allowAllFrames }); }} />);

        let spaceframes = SpaceframeHelper.instance().getSpaceframes(this.props.starship, this.state.allowAllFrames);
        spaceframes.sort((s1, s2) => {
            if (s1.localizedName === s2.localizedName) {
                return s2.id - s1.id;
            } else {
                return s1.localizedName.localeCompare(s2.localizedName);
            }
        })
        const frames = spaceframes.map((f, i) => {
            const talents = f.talents.map((t, ti) => {
                if (t === null) {
                    console.log(f.name);
                }

                return t.talent.isAvailableForServiceYear(this.props.starship) ? (
                    <div key={ti} style={{ padding: "2px" }}>{t.talent.localizedDisplayName}</div>
                ) : undefined;
            });

            return (
                <tbody key={i}>
                    <tr>
                        <td className="selection-header" rowSpan={4}>{f.localizedName}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{i18next.t('Construct.system.comms')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{f.systems[System.Comms]}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{i18next.t('Construct.system.engines')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{f.systems[System.Engines]}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{i18next.t('Construct.system.structure')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{f.systems[System.Structure]}</td>
                        <td className="d=none d-md-table-cell" style={{ verticalAlign: "top", textAlign: "center" }} rowSpan={4}>{f.scale}</td>
                        <td className="d=none d-md-table-cell" style={{ verticalAlign: "top" }} rowSpan={4}>{talents}</td>
                        <td rowSpan={4}>
                            <CheckBox
                                isChecked={this.props.initialSelection != null && this.props.initialSelection.id === f.id}
                                text=""
                                value={f.id}
                                onChanged={(e) => { this.props.onSelection(f); } }/>
                        </td>
                    </tr>
                    <tr>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{i18next.t('Construct.system.computer')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{f.systems[System.Computer]}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{i18next.t('Construct.system.sensors')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{f.systems[System.Sensors]}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{i18next.t('Construct.system.weapons')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{f.systems[System.Weapons]}</td>
                    </tr>
                    <tr>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{i18next.t('Construct.department.command')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{formatAsDelta(f.departments[Department.Command])}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{i18next.t('Construct.department.security')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{formatAsDelta(f.departments[Department.Security])}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{i18next.t('Construct.department.science')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{formatAsDelta(f.departments[Department.Science])}</td>
                    </tr>
                    <tr>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{i18next.t('Construct.department.conn')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{formatAsDelta(f.departments[Department.Conn])}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{i18next.t('Construct.department.engineering')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{formatAsDelta(f.departments[Department.Engineering])}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{i18next.t('Construct.department.medicine')}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{formatAsDelta(f.departments[Department.Medicine])}</td>
                    </tr>
                </tbody>
            );
        });

        return (
            <div>
                {this.renderNotice()}
                {overrideCheckbox}
                <table className="selection-list w-100">
                    <thead>
                        <tr>
                            <td></td>
                            <td className="d=none d-md-table-cell" colSpan={6}>{t('Construct.other.stats')}</td>
                            <td className="d=none d-md-table-cell">{t('Construct.other.scale')}</td>
                            <td className="d=none d-md-table-cell">{t('Construct.other.talents')}</td>
                            <td></td>
                        </tr>
                    </thead>
                    {frames}
                </table>
            </div>);
    }

    renderNotice() {
        const { t } = this.props;
        if (hasAnySource([ Source.UtopiaPlanitia ])) {
            return (<p>{t('SpaceframeSelectionPage.note')}</p>);
        } else {
            return undefined;
        }
    }
}

export default withTranslation()(SpaceframeSelection);