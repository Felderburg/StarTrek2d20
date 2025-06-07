import { useTranslation } from "react-i18next";
import { characterMapStateToProperties, ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import LcarsFrame from "../../components/lcarsFrame";
import CharacterCreationBreadcrumbs from "../../components/characterCreationBreadcrumbs";
import { PageIdentity } from "../../pages/pageIdentity";
import { Header } from "../../components/header";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import MultiTalentSelectionView from "../../components/multiTalentSelectionView";
import Markdown from "react-markdown";
import { makeKey } from "../../common/translationKey";
import { NpcType } from "../model/npcType";
import { TalentsHelper } from "../../helpers/talents";
import { RankedTalent } from "../../helpers/rankedTalent";
import { SelectedTalent } from "../../common/selectedTalent";
import store from "../../state/store";
import { setNpcCharacterTalents } from "../../state/characterActions";

class Range {
    readonly min: number;
    readonly max: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }
}

const NpcSpecialRulesPage: React.FC<ICharacterProperties> = ({character}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selections, setSelections] = useState<SelectedTalent[]>([])

    const ranges = [new Range(1,2), new Range(2,3), new Range(4,4)]

    useEffect(() => {
        if (character == null) {
            navigate("/npc");
        }
    }, [character]);

    const onNext = () => {
        const numberOfTalents = ranges[character.npcGenerationStep?.type ?? 0];


        navigate("/npc/final");
    }

    const updateSelectedTalent = (rankedTalent: RankedTalent, selection?: SelectedTalent) => {
        let temp = [...selections];
        if (selection == null) {
            if (rankedTalent.rank == null) {
                temp = temp.filter(t => t.name !== rankedTalent.name);
            } else {
                let count = 0;
                temp = temp.filter(t => {
                    let result = t.name !== rankedTalent.name && count !== rankedTalent.rank
                    if (t.name === rankedTalent.name) {
                        count++;
                    }
                    return result;
                });
            }
        } else {
            if (rankedTalent.rank == null) {
                temp = temp.filter(t => t.name !== rankedTalent.name);
                temp.push(selection);
            } else {
                let count = 0;
                temp = temp.filter(t => {
                    let result = t.name !== rankedTalent.name && count !== rankedTalent.rank
                    if (t.name === rankedTalent.name) {
                        count++;
                    }
                    return result;
                });
                temp.push(selection);
            }
        }
        setSelections(temp);
        store.dispatch(setNpcCharacterTalents(temp));
    }

    let talents = character
        ? TalentsHelper.getAllAvailableTalentsForNpc(character).map(t => new RankedTalent(t))
        : [];

    return character ? (<LcarsFrame activePage={PageIdentity.NpcTalents}>
        <div id="app">
            <div className="page container ms-0">
                <CharacterCreationBreadcrumbs character={character}
                    pageIdentity={PageIdentity.NpcTalents} />
                <main>
                    <Header>{t('Page.title.npcTalents')}</Header>
                    <Markdown>{t(makeKey('NpcSpecialRulesPage.instruction.', NpcType[character.npcGenerationStep?.type]))}</Markdown>

                    <MultiTalentSelectionView
                        construct={character}
                        talents={talents}
                        selections={selections}
                        onSelection={(r, t) => updateSelectedTalent(r, t)}
                    />

                    <div className="mt-4 text-end">
                        <Button className="mt-4" onClick={() => { onNext(); } } >{t('Common.button.next')}</Button>
                    </div>
                </main>
            </div>
        </div>
    </LcarsFrame>)
    : undefined;
}

export default connect(characterMapStateToProperties)(NpcSpecialRulesPage);