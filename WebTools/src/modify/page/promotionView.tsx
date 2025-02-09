import Markdown from "react-markdown";
import { Header } from "../../components/header";
import { ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Rank, RanksHelper } from "../../helpers/ranks";
import { Button } from "react-bootstrap";
import { Dialog } from "../../components/dialog";
import store from "../../state/store";
import { modifyCharacterRank } from "../../state/characterActions";
import { CharacterRank } from "../../common/character";

interface IPromotionViewProperties extends ICharacterProperties {
    onNextStep: () => void;
    onPreviousStep: () => void;
}

export const PromotionView: React.FC<IPromotionViewProperties> = ({character, onNextStep, onPreviousStep}) => {

    const { t } = useTranslation();
    const [ rank, setRank ] = useState<Rank|undefined>(undefined);
    const [ rankName, setRankName ] = useState<string|undefined>(undefined);

    const getRanks = () => {
        let result = [ new DropDownElement("", "")];
        result.push(...RanksHelper.instance()
            .getPromotionRanks(character)
            .map(r => new DropDownElement(r.id, r.localizedName)));
        return result;
    }

    const applyModification = () => {

        if (rank === undefined || rankName === undefined) {
            Dialog.show("Please select a new rank");
        } else {
            store.dispatch(modifyCharacterRank(new CharacterRank(rankName, rank)));
            onNextStep();
        }
    }

    return (<>
        <div className="row">
            <div className="col-12 col-md-6">

                <Header level={2}>{t('ModificationType.name.promotion')}</Header>
                <Markdown className="mt-4">{t('PromotionPage.instruction')}</Markdown>

                <DropDownSelect items={getRanks()} onChange={(id) => {
                        if (id === "") {
                            setRank(undefined);
                            setRankName(undefined);
                        } else {
                            let allRanks = RanksHelper.instance().getRanksByType(character.type, character.version);
                            let rank = allRanks.filter(r => r.id === id)[0];
                            setRank(rank.id);
                            setRankName(rank.name);
                        }
                    }} defaultValue={rank ?? ""}/>
            </div>
        </div>

        <div className="mt-5 d-flex justify-content-between">
            <Button size="sm" onClick={() => onPreviousStep()}>{t('Common.button.previous')}</Button>
            <Button size="sm" onClick={() => applyModification()}>{t('Common.button.finish')}</Button>
        </div>
    </>)
}