import React from "react";
import { TFunction } from "i18next";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import { Header } from "../../components/header";
import D20IconButton from "../../solo/component/d20IconButton";
import { Character } from "../../common/character";

interface IFinalDetailsViewProperties {
    character: Character;
    t: TFunction;
    showRandomName: boolean;
    onNameChanged: (value: string) => void;
    onPronounsChanged: (value: string) => void;
    onRandomName: () => void;
}

export class FinalDetailsView extends React.Component<IFinalDetailsViewProperties, {}> {

    render() {
        const { character, t, showRandomName } = this.props;
        return (<div className="row mt-4">
            <div className="col-12 col-md-6">
                <Header level={2} className="mb-3">{t('Construct.other.name')}</Header>
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <InputFieldAndLabel labelName={t('Construct.other.name')} id="name" onChange={(value) => this.props.onNameChanged(value)} value={character.name ?? ""} />
                    {showRandomName
                        ? (<div style={{ flexShrink: 0 }} className="mt-1">
                            <D20IconButton onClick={() => this.props.onRandomName()}/>
                        </div>)
                        : undefined}
                </div>

                <div className="mt-3">
                    <InputFieldAndLabel labelName={t('Construct.other.pronouns')} id="pronouns" onChange={(value) => this.props.onPronounsChanged(value)} value={character.pronouns ?? ""} />
                    <div className="text-white mt-1"><small><b>{t('Common.text.suggestions')}: </b> <i>she/her, they/them, etc.</i></small></div>
                </div>
            </div>
        </div>)
    }
}
