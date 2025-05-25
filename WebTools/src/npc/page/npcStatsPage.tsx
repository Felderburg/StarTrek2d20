import { connect } from "react-redux";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { characterMapStateToProperties, ICharacterProperties } from "../../solo/page/soloCharacterProperties";
import CharacterCreationBreadcrumbs from "../../components/characterCreationBreadcrumbs";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Header } from "../../components/header";
import { useTranslation } from "react-i18next";
import NpcDepartmentView from "../view/npcDepartmentView";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import store from "../../state/store";
import { addNpcCharacterValue, setCharacterAssignment, setCharacterFocus, StepContext } from "../../state/characterActions";
import Markdown from "react-markdown";
import { NpcType } from "../model/npcType";
import { FocusSelectionView } from "../../components/focusSelectionView";
import { DepartmentsHelper } from "../../helpers/department";
import { makeKey } from "../../common/translationKey";
import ValueInputWithRandom from "../../components/valueInputWithRandomOption";
import { NpcAttributesView } from "../view/npcAttributesView";
import { Button } from "react-bootstrap";

const NpcStatsPage: React.FC<ICharacterProperties> = ({character}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (character == null) {
            navigate("/npc");
        }
    }, [character]);

    const renderValues = () => {
        if (character.npcGenerationStep?.type === NpcType.Minor) {
            return undefined;
        } else {
            let department = primaryDepartment()
            return (<div className="col-12 col-md-6 mt-4">
                <Header level={2} className="my-3">{t('Construct.other.values')}</Header>
                <Markdown>{t(makeKey('NpcStatsPage.instruction.value.', NpcType[character.npcGenerationStep?.type]))}</Markdown>
                <ValueInputWithRandom character={character}
                    id="value1"
                    value={character.npcGenerationStep?.values[0]}
                    onValueChanged={(v) => store.dispatch(addNpcCharacterValue(v, 0))}
                    department={department} />
                {character.npcGenerationStep?.type === NpcType.Major
                    ? <>
                        <ValueInputWithRandom character={character}
                            id="value2"
                            value={character.npcGenerationStep?.values[1]}
                            onValueChanged={(v) => store.dispatch(addNpcCharacterValue(v, 1))}
                            department={department} />
                        <ValueInputWithRandom character={character}
                            id="value3"
                            value={character.npcGenerationStep?.values[2]}
                            onValueChanged={(v) => store.dispatch(addNpcCharacterValue(v, 2))}
                            department={department} />
                        <ValueInputWithRandom character={character}
                            id="value4"
                            value={character.npcGenerationStep?.values[3]}
                            onValueChanged={(v) => store.dispatch(addNpcCharacterValue(v, 3))}
                            department={department} />
                    </>
                    : undefined}
            </div>)
        }
    }

    const primaryDepartment = () => {
        let department = undefined;
        let departments = character.npcGenerationStep?.departments;
        DepartmentsHelper.instance.getDepartments().forEach(d => {
            if (department === undefined) {
                department = d;
            } else if (departments[d] > departments[department]) {
                department = d;
            }
        });
        return department;
    }

    const renderFocuses = () => {
        if (character.npcGenerationStep?.type === NpcType.Minor) {
            return undefined;
        } else {
            let department = primaryDepartment()

            return (<div className="col-12 col-md-6 mt-4">
                <Header level={2} className="my-3">{t('Construct.other.focuses')}</Header>
                <Markdown>{t(makeKey('NpcStatsPage.instruction.focus.', NpcType[character.npcGenerationStep?.type]))}</Markdown>
                <FocusSelectionView id="focus1"
                    value={character.npcGenerationStep?.focuses[0] ?? ""}
                    character={character}
                    addFocus={(f) => store.dispatch(setCharacterFocus(f, StepContext.FinishingTouches, 0))}
                    label={t('Construct.other.focus1')}
                    randomFocusDepartment={department}
                />
                <FocusSelectionView id="focus2"
                    value={character.npcGenerationStep?.focuses[1] ?? ""}
                    character={character}
                    addFocus={(f) => store.dispatch(setCharacterFocus(f, StepContext.FinishingTouches, 1))}
                    label={t('Construct.other.focus2')}
                    randomFocusDepartment={department}
                />
                <FocusSelectionView id="focus3"
                    value={character.npcGenerationStep?.focuses[2] ?? ""}
                    character={character}
                    addFocus={(f) => store.dispatch(setCharacterFocus(f, StepContext.FinishingTouches, 2))}
                    label={t('Construct.other.focus3')}
                    randomFocusDepartment={department}
                />
                {character.npcGenerationStep?.type === NpcType.Major
                    ? <>
                        <FocusSelectionView id="focus4"
                            value={character.npcGenerationStep?.focuses[3] ?? ""}
                            character={character}
                            addFocus={(f) => store.dispatch(setCharacterFocus(f, StepContext.FinishingTouches, 3))}
                            label={t('Construct.other.focus4')}
                            randomFocusDepartment={department}
                        />
                        <FocusSelectionView id="focus5"
                            value={character.npcGenerationStep?.focuses[4] ?? ""}
                            character={character}
                            addFocus={(f) => store.dispatch(setCharacterFocus(f, StepContext.FinishingTouches, 4))}
                            label={t('Construct.other.focus5')}
                            randomFocusDepartment={department}
                        />
                        <FocusSelectionView id="focus6"
                            value={character.npcGenerationStep?.focuses[5] ?? ""}
                            character={character}
                            addFocus={(f) => store.dispatch(setCharacterFocus(f, StepContext.FinishingTouches, 5))}
                            label={t('Construct.other.focus6')}
                            randomFocusDepartment={department}
                        />
                    </>
                    : undefined}

            </div>);
        }
    }

    const onNext = () => {
        navigate("/npc/final");
    }

    return character
        ? (<LcarsFrame activePage={PageIdentity.NpcStats}>
            <div id="app">
                <div className="page container ms-0">
                    <CharacterCreationBreadcrumbs pageIdentity={PageIdentity.NpcStats} character={character} />

                    <main>
                        <Header>{t('Page.title.npcStats')}</Header>
                        <Markdown>{t('NpcStatsPage.instruction')}</Markdown>

                        <div className="row">
                            <div className="col-12 col-md-6 mt-4">
                                <Header level={2} className="my-3">{t('Construct.other.attributes')}</Header>
                                <Markdown>
                                    {character.npcGenerationStep?.type === NpcType.Major
                                    ? t('NpcStatsPage.instruction.attribute.major')
                                    : t('NpcStatsPage.instruction.attribute')}
                                </Markdown>
                                <NpcAttributesView character={character} />
                            </div>
                            <div className="col-12 col-md-6 mt-4">
                                <Header level={2} className="my-3">{t('Construct.other.departments')}</Header>
                                <Markdown>
                                    {character.npcGenerationStep?.type === NpcType.Major
                                    ? t('NpcStatsPage.instruction.department.major')
                                    : t('NpcStatsPage.instruction.department')}
                                </Markdown>
                                <NpcDepartmentView />
                            </div>

                            <div className="col-12 col-md-6 mt-4">
                                <Header level={2} className="my-3">{t('Construct.other.role')}</Header>
                                <Markdown>{t(makeKey('NpcStatsPage.instruction.role.', NpcType[character.npcGenerationStep?.type]))}</Markdown>
                                <InputFieldAndLabel id="role"
                                    labelName={t('Construct.other.role')}
                                    value={character.jobAssignment}
                                    onChange={(v) => store.dispatch(setCharacterAssignment(v))}
                                />
                            </div>

                            {renderFocuses()}
                            {renderValues()}
                        </div>


                        <div className="mt-4 text-end">
                            <Button className="mt-4" onClick={() => { onNext(); } } >{t('Common.button.next')}</Button>
                        </div>
                    </main>
                </div>
            </div>
        </LcarsFrame>)
        : undefined;
}

export default connect(characterMapStateToProperties)(NpcStatsPage);