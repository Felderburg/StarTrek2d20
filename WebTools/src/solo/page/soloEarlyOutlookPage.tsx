import { connect } from "react-redux";
import { Header } from "../../components/header";
import { Navigation } from "../../common/navigator";
import { PageIdentity } from "../../pages/pageIdentity";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { makeKey } from "../../common/translationKey";
import { AttributesHelper } from "../../helpers/attributes";
import { Skill } from "../../helpers/skills";
import { Window } from "../../common/window";
import InstructionText from "../../components/instructionText";
import { EarlyOutlook, EarlyOutlookModel, UpbringingsHelper } from "../../helpers/upbringings";
import { EarlyOutlookAspirationRandomTable, EarlyOutlookCasteRandomTable, EarlyOutlookUpbringingRandomTable } from "../table/earlyOutlookRandomTable";
import { setCharacterEarlyOutlook } from "../../state/characterActions";
import store from "../../state/store";
import { ICharacterProperties } from "./soloCharacterProperties";
import SoloCharacterBreadcrumbs from "../component/soloCharacterBreadcrumbs";

enum EarlyOutlookTab {
    Upbringings,
    Castes,
    Aspirations
}

const SoloEarlyOutlookPage: React.FC<ICharacterProperties> = ({character}) => {

    const determineInitialTab = (outlook: EarlyOutlook) => {
        if (outlook == null) {
            return EarlyOutlookTab.Upbringings;
        } else if (UpbringingsHelper.isAspiration(outlook)) {
            return EarlyOutlookTab.Aspirations;
        } else if (UpbringingsHelper.isCaste(outlook)) {
            return EarlyOutlookTab.Castes;
        } else {
            return EarlyOutlookTab.Upbringings;
        }
    }

    const { t } = useTranslation();
    const initialOutlook = character?.upbringingStep?.upbringing?.id;
    const [tab, setTab] = useState(determineInitialTab(initialOutlook));
    const [randomUpbringing, setRandomUpbringing] = useState(initialOutlook != null && UpbringingsHelper.isUpbringing(initialOutlook) ? initialOutlook : null);
    const [randomAsperation, setRandomAsperation] = useState(initialOutlook != null && UpbringingsHelper.isAspiration(initialOutlook) ? initialOutlook : null);
    const [randomCaste, setRandomCaste] = useState(initialOutlook != null && UpbringingsHelper.isCaste(initialOutlook) ? initialOutlook : null);

    const selectOutlook = (outlook: EarlyOutlookModel) => {
        store.dispatch(setCharacterEarlyOutlook(outlook));
        Navigation.navigateToPage(PageIdentity.SoloEarlyOutlookDetails);
    }

    const renderTab = () => {
        switch (tab) {
            case EarlyOutlookTab.Upbringings:
                return renderUpbringingsTab();
            case EarlyOutlookTab.Aspirations:
                return renderAspirationsTab();
            case EarlyOutlookTab.Castes:
            default:
                return renderCastessTab();
        }
    }


    const toTableRow = (u, i) => {
        const disciplines = u.disciplines.map((d, i) => {
            return <div key={i}>{t(makeKey('Construct.discipline.', Skill[d]))}</div>;
        });

        if (Window.isCompact()) {
            return (
                <tr key={i} onClick={() => { selectOutlook(u) } }>
                    <td className="selection-header">{u.name}</td>
                    <td>
                        ACCEPT<br/>
                        <div>{AttributesHelper.getAttributeName(u.attributeAcceptPlus2) } +2</div>
                        <div>{AttributesHelper.getAttributeName(u.attributeAcceptPlus1) } +1</div>
                        <br/>
                        REBEL<br/>
                        <div>{AttributesHelper.getAttributeName(u.attributeRebelPlus2) } +2</div>
                        <div>{AttributesHelper.getAttributeName(u.attributeRebelPlus1) } +1</div>
                    </td>
                    <td>{disciplines}</td>
                </tr>
            )
        }
        else {
            return (
                <tr key={i}>
                    <td className="selection-header">{u.name}</td>
                    <td>
                        <div>{AttributesHelper.getAttributeName(u.attributeAcceptPlus2) } +2</div>
                        <div>{AttributesHelper.getAttributeName(u.attributeAcceptPlus1) } +1</div>
                    </td>
                    <td>
                        <div>{AttributesHelper.getAttributeName(u.attributeRebelPlus2) } +2</div>
                        <div>{AttributesHelper.getAttributeName(u.attributeRebelPlus1) } +1</div>
                    </td>
                    <td>{disciplines}</td>
                    <td className="text-end"><Button size="sm" onClick={() => { selectOutlook(u) } }>{t('Common.button.select')}</Button></td>
                </tr>
            )
        }
    }

    const renderUpbringingsTab = () => {

        let settingsList = UpbringingsHelper.getUpbringings();
        if (randomUpbringing != null) {
            settingsList = [UpbringingsHelper.getUpbringing(randomUpbringing)];
        }
        let settingRows = settingsList.map((e,i) => toTableRow(e, i));

        return (<>
            <div className="my-4">
                <Button size="sm" className="me-3" onClick={() => setRandomUpbringing( EarlyOutlookUpbringingRandomTable()) }>
                    <><img src="/static/img/d20.svg" style={{height: "24px", aspectRatio: "1"}} className="me-1" alt={t('Common.button.random')}/> {t('Common.button.random')}</>
                </Button>
                {randomUpbringing != null ? (<Button size="sm" className="me-3" onClick={() => setRandomUpbringing(null)} >{t('Common.button.showAll')}</Button>) : undefined}
            </div>

            <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><b>{t('Construct.other.attributes')}</b></td>
                            <td><b>{t('Construct.other.disciplines')}</b></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {settingRows}
                    </tbody>
                </table>
            </>);
    }

    const renderCastessTab = () => {

        let settingsList = UpbringingsHelper.getCastes();
        if (randomCaste != null) {
            settingsList = [UpbringingsHelper.getCaste(randomCaste)];
        }
        let settingRows = settingsList.map((e,i) => toTableRow(e, i));

        return (<>
            <div className="my-4">
                <Button size="sm" className="me-3" onClick={() => setRandomCaste( EarlyOutlookCasteRandomTable()) }>
                    <><img src="/static/img/d20.svg" style={{height: "24px", aspectRatio: "1"}} className="me-1" alt={t('Common.button.random')}/> {t('Common.button.random')}</>
                </Button>
                {randomCaste != null ? (<Button size="sm" className="me-3" onClick={() => setRandomCaste(null)} >{t('Common.button.showAll')}</Button>) : undefined}
            </div>

            <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><b>{t('Construct.other.attributes')}</b></td>
                            <td><b>{t('Construct.other.disciplines')}</b></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {settingRows}
                    </tbody>
                </table>
            </>);
    }

    const renderAspirationsTab = () => {

        let settingsList = UpbringingsHelper.getAspirations();
        if (randomAsperation != null) {
            settingsList = [UpbringingsHelper.getAspiration(randomAsperation)];
        }
        let settingRows = settingsList.map((e,i) => toTableRow(e, i));

        return (<>
            <div className="my-4">
                <Button size="sm" className="me-3" onClick={() => setRandomAsperation( EarlyOutlookAspirationRandomTable()) }>
                    <><img src="/static/img/d20.svg" style={{height: "24px", aspectRatio: "1"}} className="me-1" alt={t('Common.button.random')}/> {t('Common.button.random')}</>
                </Button>
                {randomAsperation != null ? (<Button size="sm" className="me-3" onClick={() => setRandomAsperation(null)} >{t('Common.button.showAll')}</Button>) : undefined}
            </div>

            <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><b>{t('Construct.other.attributes')}</b></td>
                            <td><b>{t('Construct.other.disciplines')}</b></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {settingRows}
                    </tbody>
                </table>
            </>);
    }

    return (
        <div className="page container ms-0">
            <SoloCharacterBreadcrumbs  pageIdentity={PageIdentity.SoloEarlyOutlook} />
            <Header>{t('Page.title.soloEarlyOutlook')}</Header>

            <InstructionText text={t('SoloEarlyOutlookPage.instruction')} />

            <div className="btn-group w-100" role="group" aria-label="Early Outlook Types">
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === EarlyOutlookTab.Upbringings ? "active" : "")}
                    onClick={() => setTab(EarlyOutlookTab.Upbringings)}>{t('SoloEarlyOutlookPage.upbringings')}</button>
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === EarlyOutlookTab.Castes ? "active" : "")}
                    onClick={() => setTab(EarlyOutlookTab.Castes)}>{t('SoloEarlyOutlookPage.castes')}</button>
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === EarlyOutlookTab.Aspirations ? "active" : "")}
                    onClick={() => setTab(EarlyOutlookTab.Aspirations)}>{t('SoloEarlyOutlookPage.aspirations')}</button>
            </div>

            {renderTab()}
        </div>);
}


function mapStateToProps(state, ownProps) {
    return {
        character: state.character?.currentCharacter
    };
}

export default connect(mapStateToProps)(SoloEarlyOutlookPage);