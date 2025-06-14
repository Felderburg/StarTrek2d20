import React, { useState } from "react";

import { CharacterType } from '../../common/characterType';
import formatAsDelta from '../../common/formatAsDelta';
import { Starship } from '../../common/starship';
import { CheckBox } from '../../components/checkBox';
import { Department } from '../../helpers/department';
import { Source } from '../../helpers/sources';
import { SpaceframeModel } from '../../helpers/spaceframeModel';
import { SpaceframeHelper } from '../../helpers/spaceframes';
import { System } from '../../helpers/systems';
import { hasAnySource } from '../../state/contextFunctions';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

interface ISpaceframeSelectionProperties {
    serviceYear: number;
    starship: Starship;
    type: CharacterType;
    initialSelection?: SpaceframeModel;
    onSelection: (s: SpaceframeModel) => void;
}

const SpaceframeSelection: React.FC<ISpaceframeSelectionProperties> = ({starship, initialSelection, onSelection}) => {

    const { t } = useTranslation();
    const [ allowAllFrames, setAllowAllFrames ] = useState<boolean>(false);

    const renderNotice = () => {
        if (hasAnySource([ Source.UtopiaPlanitia ])) {
            return (<p>{t('SpaceframeSelectionPage.note')}</p>);
        } else {
            return undefined;
        }
    }

    let overrideCheckbox =(<CheckBox
        isChecked={allowAllFrames}
        text={t('SpaceframeSelectionPage.ignoreEndOfService')}
        value={!allowAllFrames}
        onChanged={(e) => setAllowAllFrames(!allowAllFrames)} />);

    let spaceframes = SpaceframeHelper.instance().getSpaceframes(starship, allowAllFrames);
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

            return t.talentModel.isAvailableForServiceYear(starship) ? (
                <div key={ti} style={{ padding: "2px" }}>{t.displayNameWithMultiple}</div>
            ) : undefined;
        });

        return (
            <tbody key={i}>
                <tr>
                    <td rowSpan={4}><div className="selection-header">{f.localizedName}</div> {f.errata ? (<div style={{maxWidth: "14rem"}}>{t('SpaceframeSelectionPage.errata')}</div>) : undefined}</td>
                    <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{t('Construct.system.comms')}</td>
                    <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{f.systems[System.Comms]}</td>
                    <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{t('Construct.system.engines')}</td>
                    <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{f.systems[System.Engines]}</td>
                    <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>{t('Construct.system.structure')}</td>
                    <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{f.systems[System.Structure]}</td>
                    <td className="d=none d-md-table-cell" style={{ verticalAlign: "top", textAlign: "center" }} rowSpan={4}>{f.scale}</td>
                    <td className="d=none d-md-table-cell" style={{ verticalAlign: "top" }} rowSpan={4}>{talents}</td>
                    <td rowSpan={4}>
                        <CheckBox
                            isChecked={initialSelection?.id === f.id}
                            text=""
                            value={f.id}
                            onChanged={(e) => onSelection(f) }/>
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
            {renderNotice()}
            {overrideCheckbox}
            <table className="selection-list w-100">
                <thead>
                    <tr>
                        <td></td>
                        <td className="d=none d-md-table-cell text-center" colSpan={6}>{t('Construct.other.stats')}</td>
                        <td className="d=none d-md-table-cell text-center">{t('Construct.other.scale')}</td>
                        <td className="d=none d-md-table-cell">{t('Construct.other.talents')}</td>
                        <td></td>
                    </tr>
                </thead>
                {frames}
            </table>
        </div>);
}

export default SpaceframeSelection;