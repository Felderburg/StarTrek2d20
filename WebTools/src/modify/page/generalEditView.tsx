import { useTranslation } from "react-i18next";
import { ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import Markdown from "react-markdown";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Header } from "../../components/header";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import store from "../../state/store";
import { setCharacterName, setCharacterPronouns } from "../../state/characterActions";

interface IGeneralEditViewProperties extends ICharacterProperties {
    onNextStep: () => void;
    onPreviousStep: () => void;
}

enum Tab {
    Species,
    Environment,
    EarlyOutlook,
    Education,
    CareerLength,
    Final
}

class ValueHolder {
    readonly value: string;
    constructor(value: string) {
        this.value = value;
    }
}

export const GeneralEditView: React.FC<IGeneralEditViewProperties> = ({character, onNextStep, onPreviousStep}) => {

    const [ tab, setTab ] = useState<Tab>(Tab.Species);
    const { t } = useTranslation();

    let values: {[id: number]: ValueHolder } = {};

    values[Tab.Environment] = new ValueHolder(character.environmentStep?.value ?? "");
    values[Tab.Education] = new ValueHolder(character.educationStep?.value ?? "");
    values[Tab.CareerLength] = new ValueHolder(character.careerStep?.value ?? "");
    values[Tab.Final] = new ValueHolder(character.finishingStep?.value ?? "");

    const prepareForOnNextStep = () => {

    }

    const onNameChanged = (value: string) => {
        store.dispatch(setCharacterName(value));
    }

    const onPronounsChanged = (value: string) => {
        store.dispatch(setCharacterPronouns(value));
    }

    const renderFinalTab = () => {

        return (<div className="row mt-4">
            <div className="col-12 col-md-6">
                <Header level={2} className="mb-3">{t('Construct.other.name')}</Header>
                <InputFieldAndLabel labelName={t('Construct.other.name')} id="name" onChange={(value) => onNameChanged(value)} value={character.name ?? ""} />

                <div className="mt-3">
                    <InputFieldAndLabel labelName={t('Construct.other.pronouns')} id="pronouns" onChange={(value) => onPronounsChanged(value)} value={character.pronouns ?? ""} />
                    <div className="text-white mt-1"><small><b>{t('Common.text.suggestions')}: </b> <i>she/her, they/them, etc.</i></small></div>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <Header level={2} className="mb-3">{t('Construct.other.value')}</Header>
                <InputFieldAndLabel labelName={t('Construct.other.value')} id="value" onChange={(value) => onNameChanged(value)} value={values[Tab.Final]?.value ?? ""} />
            </div>

        </div>)
    }

    const renderEnvironmentTab = () => {

        return (<div className="row mt-4">
            <div className="col-12 col-md-6">
                <Header level={2} className="mb-3">{t('Construct.other.value')}</Header>
                <InputFieldAndLabel labelName={t('Construct.other.value')} id="value" onChange={(value) => onNameChanged(value)} value={values[Tab.Environment]?.value ?? ""} />
            </div>
        </div>)
    }

    const renderCareerLengthTab = () => {

        return (<div className="row mt-4">
            <div className="col-12 col-md-6">
                <Header level={2} className="mb-3">{t('Construct.other.value')}</Header>
                <InputFieldAndLabel labelName={t('Construct.other.value')} id="value" onChange={(value) => onNameChanged(value)} value={values[Tab.CareerLength]?.value ?? ""} />
            </div>
        </div>)
    }


    const renderTab = () => {
        if (tab === Tab.Environment) {
            return renderEnvironmentTab();
        } else if (tab === Tab.CareerLength) {
            return renderCareerLengthTab();
        } else if (tab === Tab.Final) {
            return renderFinalTab();
        } else {
            return undefined;
        }
    }

    return (<>
        <Markdown className="mt-4">{t('GeneralEditView.instruction')}</Markdown>

        <div className="mt-4">
            <div className="btn-group w-100" role="group" aria-label="Character options">
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === Tab.Species ? "active" : "")}
                    onClick={() => setTab(Tab.Species)}>{t('Page.title.species')}</button>
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === Tab.Environment ? "active" : "")}
                    onClick={() => setTab(Tab.Environment)}>{t('Page.title.environment')}</button>
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === Tab.EarlyOutlook ? "active" : "")}
                    onClick={() => setTab(Tab.EarlyOutlook)}>{t('Page.title.upbringing')}</button>
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === Tab.Education ? "active" : "")}
                    onClick={() => setTab(Tab.Education)}>{t('Page.title.education')}</button>
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === Tab.CareerLength ? "active" : "")}
                    onClick={() => setTab(Tab.CareerLength)}>{t('Page.title.careerLength')}</button>
                <button type="button" className={'btn btn-info btn-sm p-2 text-center ' + (tab === Tab.Final ? "active" : "")}
                    onClick={() => setTab(Tab.Final)}>{t('Page.title.soloFinal')}</button>
            </div>
        </div>

        {renderTab()}

        <div className="mt-5 d-flex justify-content-between">
            <Button size="sm" onClick={onPreviousStep}>{t('Common.button.previous')}</Button>
            <Button size="sm" onClick={prepareForOnNextStep}>{t('Common.button.finish')}</Button>
        </div>
    </>)

}