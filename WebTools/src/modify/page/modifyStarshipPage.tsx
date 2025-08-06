import { useTranslation } from "react-i18next";
import { Header } from "../../components/header";
import LcarsFrame from "../../components/lcarsFrame";
import { PageIdentity } from "../../pages/pageIdentity";
import { IStarshipProperties } from "../../starship/iStarshipProperties";
import { useEffect, useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { starshipMapStateToProperties } from "../../solo/page/soloCharacterProperties";
import { connect } from "react-redux";
import { CharacterAdvancementType } from "../model/characterAdvancementType";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import Markdown from "react-markdown";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import store from "../../state/store";
import { saveStarshipToLocalStorage } from "../../state/savedConstructActions";
import { marshaller } from "../../helpers/marshaller";
import { CharacterAdvancementChoice } from "../model/characterAdvancementChoice";
import { StarshipAdvancementChoice } from "../../common/starshipAdvancementChoice";
import { StarshipDepartmentSelector } from "../../components/simpleDepartmentSelector";
import { Department } from "../../helpers/department";
import { System } from "../../helpers/systems";
import { makeKey } from "../../common/translationKey";
import { modifyStarshipAddAdvancement } from "../../state/starshipActions";
import { Dialog } from "../../components/dialog";
import { SimpleSystemSelector } from "../../components/simpleSystemSelector";
import { SelectedTalent } from "../../common/selectedTalent";
import { TalentSelector } from "./talentSelector";
import { TALENT_NAME_ADDITIONAL_PROPULSION_SYSTEM, TALENT_NAME_DEDICATED_PERSONNEL, TALENT_NAME_EXPANDED_MUNITIONS, TALENT_NAME_EXPANSIVE_DEPARTMENT, TALENT_NAME_MINELAYER, TALENT_NAME_REDUNDANT_SYSTEMS, TalentsHelper } from "../../helpers/talents";
import { ModalControl } from "../../components/modal";
import SimpleTalentSelectionList from "../../components/simpleTalentSelectionList";
import { SelectedTalentDescriptionView } from "../../components/selectedTalentDescriptionView";
import { PropulsionSystemModel, PropulsionSystemType } from "../../helpers/propulsionSystem";
import { Weapon } from "../../helpers/weapons";
import AddWeaponView, { AddWeaponMode } from "../../starship/view/addWeaponView";
import { isMultiSelectionTalent } from "../../helpers/isMultiSelectionTalent";
import { determineSelectedTalentExtraErrors } from "../../common/selectedTalentExtraCheck";

const ModifyStarshipPage: React.FC<IStarshipProperties> = ({starship}) => {

    const { t } = useTranslation();
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [advancementType, setAdvancementType] = useState<CharacterAdvancementType>(CharacterAdvancementType.Milestone);
    const navigate = useNavigate();

    const [ choice, setChoice ] = useState<StarshipAdvancementChoice|undefined>(undefined);
    const [ selectedDepartment, setSelectedDepartment ] = useState<Department|undefined>(undefined)
    const [ removedDepartment, setRemovedDepartment ] = useState<Department|undefined>(undefined)
    const [ selectedSystem, setSelectedSystem ] = useState<System|undefined>(undefined)
    const [ removedSystem, setRemovedSystem ] = useState<System|undefined>(undefined)
    const [ selectedTalent, setSelectedTalent ] = useState<SelectedTalent|undefined>(undefined)
    const [ removedTalentIndex, setRemovedTalentIndex ] = useState<number|undefined>(undefined)


    useEffect(() => {
        if (starship == null) {
            navigate("/");
        }
    }, [starship]);

    const milestoneTypesDropDownItems = () => {
        let result = [];
        result.push(new DropDownElement(CharacterAdvancementType.Milestone, t('CharacterAdvancementType.milestone')))
        result.push(new DropDownElement(CharacterAdvancementType.CharacterArc, t('CharacterAdvancementType.characterArc')))
        return result;
    }

    const previousStep = () => {
        setCarouselIndex(carouselIndex - 1);
    }

    const nextStep = () => {
        if (carouselIndex === 0 || carouselIndex === 1) {
            setCarouselIndex(carouselIndex + 1);
        }
    }

    const applyModification = () => {
        if (choice === StarshipAdvancementChoice.Department) {
            if (advancementType === CharacterAdvancementType.Milestone) {
                if (selectedDepartment != null && removedDepartment != null) {
                    store.dispatch(modifyStarshipAddAdvancement(choice, selectedDepartment, removedDepartment));
                    nextStep();
                } else {
                    Dialog.show(t('ModifyStarshipPage.error.twoDepartments'));
                }
            } else {
                if (selectedDepartment != null) {
                    store.dispatch(modifyStarshipAddAdvancement(choice, selectedDepartment));
                    nextStep();
                } else {
                    Dialog.show(t('Common.error.department'));
                }
            }
        } else if (choice === StarshipAdvancementChoice.System) {
            if (advancementType === CharacterAdvancementType.Milestone) {
                if (selectedSystem != null && removedSystem != null) {
                    store.dispatch(modifyStarshipAddAdvancement(choice, selectedSystem, removedSystem));
                    nextStep();
                } else {
                    Dialog.show(t('ModifyStarshipPage.error.twoSystems'));
                }
            } else {
                if (selectedSystem != null) {
                    store.dispatch(modifyStarshipAddAdvancement(choice, selectedSystem));
                    nextStep();
                } else {
                    Dialog.show(t('Common.error.system'));
                }
            }
        } else if (choice === StarshipAdvancementChoice.Talent) {
            if (advancementType === CharacterAdvancementType.Milestone) {
                if (selectedTalent == null || removedTalentIndex == null) {
                    Dialog.show(t('ModifyStarshipPage.error.twoTalents'));
                } else if (determineSelectedTalentExtraErrors(selectedTalent) != null) {
                    Dialog.show(determineSelectedTalentExtraErrors(selectedTalent, starship));
                } else {
                    store.dispatch(modifyStarshipAddAdvancement(choice, selectedTalent, starship.talentsWithoutSpecialRules[removedTalentIndex]));
                    nextStep();
                }
            } else {
                if (selectedTalent == null) {
                    Dialog.show(t('Common.error.talent'));
                } else if (determineSelectedTalentExtraErrors(selectedTalent, starship) != null) {
                    Dialog.show(determineSelectedTalentExtraErrors(selectedTalent, starship));
                } else {
                    store.dispatch(modifyStarshipAddAdvancement(choice, selectedTalent));
                    nextStep();
                }
            }
        }
    }

    const showTalentSelectionModal = () => {
        const talents = TalentsHelper.getStarshipTalents(starship)
            .filter(t => !starship.hasTalent(t.name)
            || t.maxRank > 1
            || isMultiSelectionTalent(t));
        ModalControl.show("xl", () => ModalControl.hide(),

            (<div>
                <SimpleTalentSelectionList construct={starship} talents={talents} onSelection={(t) => setSelectedTalent(t == null ? undefined : t)} />
                <div className="text-center mt-4">
                    <Button size="sm" onClick={() => ModalControl.hide()}>{t('Common.button.ok')}</Button>
                </div>
            </div>),

            t("ModifySupportingCharacter.talentModal.title"));
    }

    const dropDownAdvancementChoices = () => {
        let result = [];
        result.push(new DropDownElement("", ""))
        result.push(new DropDownElement(StarshipAdvancementChoice.System, t('Construct.other.systems')))
        result.push(new DropDownElement(CharacterAdvancementChoice.Department, t('Construct.other.departments')))
        result.push(new DropDownElement(CharacterAdvancementChoice.Talent, t('Construct.other.talent')))
        return result;
    }

    const viewStarship = () => {
        setTimeout(() => {
            let c = store.getState().starship.starship;
            let hash = store.getState().starship.hash;
            store.dispatch(saveStarshipToLocalStorage(c, hash));
            const value = marshaller.encodeStarship(c);
            navigate('/view?s=' + value);
        }, 200);
    }

    const createFinalView = () => {
        return (<>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Header level={2} className="mt-3">{t('Page.title.modificationComplete')}</Header>
                    <Markdown>{t('ModifyStarship.complete.instruction')}</Markdown>
                </div>
            </div>

            <div className="mt-5">
                <Button size="sm" onClick={() => viewStarship()}>{t('Common.button.view')}</Button>
            </div>
        </>)
    }

    const createDepartmentModification = () => {
        return (<>
            <div className="col-12">
                <Header level={2} className="my-4">{t('Construct.other.departments')}</Header>
                <Markdown>{t(makeKey('ModifyStarshipPage.', CharacterAdvancementType[advancementType], '.department.instruction'))}</Markdown>
            </div>

            {advancementType === CharacterAdvancementType.Milestone
            ? (<>
                <div className="col-12 col-md-6 mt-5">
                    <Header level={2}>{t('Common.text.remove')}</Header>
                    <StarshipDepartmentSelector
                        starship={starship}
                        isChecked={(d) => removedDepartment === d}
                        onSelectDepartment={(d) => {
                            setRemovedDepartment(d);
                            if (d === selectedDepartment) {
                                setSelectedDepartment(undefined);
                            }
                        }}
                        isUpdateable={(d) => starship.departments[d] > 1}
                    />
                </div>
                <div className="col-12 col-md-6 mt-5">
                    <Header level={2}>{t('Common.text.new')}</Header>
                    <StarshipDepartmentSelector
                        starship={starship}
                        isChecked={(d) => selectedDepartment === d}
                        onSelectDepartment={(d) => setSelectedDepartment(d)}
                        isUpdateable={(d) =>
                            starship.departments[d] < 4 && d !== removedDepartment}
                    />
                </div>
            </>)
            : (<div className="col-12 col-md-6 mt-5">
                <Header level={2}>{t('Common.text.new')}</Header>
                <StarshipDepartmentSelector
                    starship={starship}
                    isChecked={(d) => selectedDepartment === d}
                    onSelectDepartment={(d) => setSelectedDepartment(d)}
                    isUpdateable={(d) =>
                        starship.departments[d] < 5 &&
                        !(starship.advancementSteps
                            .filter(s => s.choice === StarshipAdvancementChoice.Department
                                && s.removeValue == null
                                && s.value === d)?.length)}
                />
            </div>)}
        </>)
    }

    const createSystemModification = () => {
        return (<>
            <div className="col-12">
                <Header level={2} className="my-4">{t('Construct.other.systems')}</Header>
                <Markdown>{t(makeKey('ModifyStarshipPage.', CharacterAdvancementType[advancementType], '.system.instruction'))}</Markdown>
            </div>

            {advancementType === CharacterAdvancementType.Milestone
            ? (<>
                <div className="col-12 col-md-6 mt-5">
                    <Header level={2}>{t('Common.text.remove')}</Header>
                    <SimpleSystemSelector
                        starship={starship}
                        isChecked={(d) => removedSystem === d}
                        onSelectSystem={(s) => {
                            setRemovedSystem(s);
                            if (s === selectedSystem) {
                                setSelectedSystem(undefined);
                            }
                        }}
                        isUpdateable={(d) => starship.systems[d] > 6}
                    />
                </div>
                <div className="col-12 col-md-6 mt-5">
                    <Header level={2}>{t('Common.text.new')}</Header>
                    <SimpleSystemSelector
                        starship={starship}
                        isChecked={(d) => selectedSystem === d}
                        onSelectSystem={(s) => setSelectedSystem(s)}
                        isUpdateable={(s) =>
                            starship.systems[s] < 11 && s !== removedSystem}
                    />
                </div>
            </>)
            : (<div className="col-12 col-md-6 mt-5">
                <Header level={2}>{t('Common.text.new')}</Header>
                <SimpleSystemSelector
                    starship={starship}
                    isChecked={(d) => selectedSystem === d}
                    onSelectSystem={(d) => setSelectedSystem(d)}
                    isUpdateable={(d) =>
                        !(starship.advancementSteps
                            .filter(s => s.choice === StarshipAdvancementChoice.System
                                && s.removeValue == null
                                && s.value === d)?.length)}
                />
            </div>)}
        </>)
    }

    const createTalentModification = () => {
        return (<>
            <div className="col-12 mt-4">
                <Header level={2} className="mb-4">{t('Construct.other.talent')}</Header>
                <Markdown>{t(makeKey('ModifyStarshipPage.', CharacterAdvancementType[advancementType], '.talent.instruction'))}</Markdown>
            </div>

            {advancementType === CharacterAdvancementType.Milestone
                ? (<>
                    <div className="col-12 col-md-6 mt-4">
                        <Header level={2}>{t('Common.text.remove')}</Header>
                        <TalentSelector values={starship.talentsWithoutSpecialRules}
                            onSelect={(s,i) => setRemovedTalentIndex(i)}
                            isChecked={(s,i) => i === removedTalentIndex}/>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                        <Header level={2} className="mb-4">{t('Common.text.new')}</Header>
                        <div className="text-end mb-4">
                            <Button size="sm" onClick={() => showTalentSelectionModal()}>{t('Common.text.select')}</Button>
                        </div>
                        {selectedTalent == null
                            ? (<p>No talent selected.</p>)
                            :  <SelectedTalentDescriptionView talent={selectedTalent} version={starship.version} />}
                    {handleAdditionalTalentSelections()}
                </div>
                </>)
                : (<div className="col-12 col-md-6 mt-4">
                    <Header level={2} className="mb-4">{t('Common.text.new')}</Header>
                    <div className="text-end mb-4">
                        <Button size="sm" onClick={() => showTalentSelectionModal()}>{t('Common.text.select')}</Button>
                    </div>
                    {selectedTalent == null
                        ? (<p>No talent selected.</p>)
                        :  <SelectedTalentDescriptionView talent={selectedTalent} version={starship.version} />}
                    {handleAdditionalTalentSelections()}
                </div>)}

        </>);
    }

    const handleAdditionalTalentSelections = () => {
        if (selectedTalent?.name === TALENT_NAME_DEDICATED_PERSONNEL) {
            return (<div className="my-3">
                <StarshipDepartmentSelector
                    starship={starship}
                    isChecked={d => selectedTalent.department === d}
                    onSelectDepartment={d => {
                        let temp = selectedTalent?.copy();
                        if (temp) {
                            temp.department = d;
                        }
                        setSelectedTalent(temp);
                    }}
                />
            </div>)
        } else if (selectedTalent?.name === TALENT_NAME_EXPANSIVE_DEPARTMENT) {
            return (<div className="my-3">
                <StarshipDepartmentSelector
                    starship={starship}
                    isChecked={d => selectedTalent.department === d}
                    onSelectDepartment={d => {
                        let temp = selectedTalent?.copy();
                        if (temp) {
                            temp.department = d;
                        }
                        setSelectedTalent(temp);
                    }}
                    isUpdateable={d => starship.departments[d] === 5}
                />
            </div>)
        } else if (selectedTalent?.name === TALENT_NAME_REDUNDANT_SYSTEMS) {
            return (<div className="my-3">
                <SimpleSystemSelector
                    starship={starship}
                    isChecked={d => selectedTalent.system === d}
                    onSelectSystem={s => {
                        let temp = selectedTalent?.copy();
                        if (temp) {
                            temp.system = s;
                        }
                        setSelectedTalent(temp);
                    }}
                />
            </div>)
        } else if (selectedTalent?.name === TALENT_NAME_ADDITIONAL_PROPULSION_SYSTEM) {
            const getItems = () => {
                let result = [new DropDownElement("", "")];
                result.push(...PropulsionSystemModel.types.map(t => new DropDownElement(t.type, t.localizedName)));
                return result;
            }

            return (<div className="my-3">
                <DropDownSelect
                    items={getItems()}
                    defaultValue={selectedTalent.selection as PropulsionSystemType}
                    onChange={(s) => {
                        let temp = selectedTalent?.copy();
                        if (temp) {
                            if (s === "") {
                                temp.selection = undefined;
                            } else {
                                temp.selection = s as PropulsionSystemType;
                            }
                            setSelectedTalent(temp);
                        }
                    }}
                />
            </div>)
        } else if ([TALENT_NAME_EXPANDED_MUNITIONS, TALENT_NAME_MINELAYER].includes(selectedTalent?.name)) {
            let weaponName = "";
            if (selectedTalent?.weapon) {
                if (selectedTalent.weapon instanceof Weapon) {
                    weaponName = selectedTalent.weapon.name;
                } else {
                    weaponName = selectedTalent.weapon as string;
                }
            }

            const closeModal = () => {
                ModalControl.hide();
            }

            const showModal = () => {
                let mode = starship.version === 1 ? AddWeaponMode.IncludeMines : AddWeaponMode.NoMines;
                if (selectedTalent.name === TALENT_NAME_MINELAYER) {
                    mode = AddWeaponMode.MinesOnly;
                } else if (starship.isMineLayer) {
                    mode = AddWeaponMode.IncludeMines;
                }
                ModalControl.show("lg", () => closeModal(),
                <AddWeaponView onClose={() => closeModal()}
                    version={starship.version}
                    addWeapon={(w) => {
                        let temp = selectedTalent?.copy();
                        if (temp) {
                            temp.weapon = w;
                            setSelectedTalent(temp);
                        }
                    }} mode={mode} />,
                "Add Weapon");
            }

            return (
                <div className="d-flex justify-content-between align-items-baseline my-3">
                    <p className="mb-0">{weaponName}</p>
                    <Button size="sm"
                        onClick={() => showModal()}>{t('Common.button.select')}</Button>
                </div>
            );
        } else {
            return undefined;
        }
    }


    const createModificationOptionsView = () => {
        let option = undefined;
        if (choice === StarshipAdvancementChoice.Department) {
            option = createDepartmentModification()
        } else if (choice === StarshipAdvancementChoice.System) {
            option = createSystemModification();
        } else if (choice === StarshipAdvancementChoice.Talent) {
            option = createTalentModification();
        }

        return (<div className="row">

            <div className="col-12">
                <Markdown className="mt-4">{t('ModifyStarship.advancementChoice.instruction')}</Markdown>
                <div className="my-3">
                    <DropDownSelect items={dropDownAdvancementChoices()}
                        onChange={(v) => setChoice(v === "" ? undefined : v as StarshipAdvancementChoice)}
                        defaultValue={choice ?? ""} />
                </div>
            </div>
            {option}

            <div className="mt-5 d-flex justify-content-between">
                <Button size="sm" onClick={() => previousStep()}>{t('Common.button.previous')}</Button>
                <Button size="sm" disabled={choice === undefined} onClick={() => applyModification()}>{t('Common.button.finish')}</Button>
            </div>
        </div>)
    }

    const createAdvancementTypeView = () => {
        return (<>
            <div className="row mt-4">
                <div className="col-12 col-md-6">

                    <Header level={2}>{t('Page.title.modificationTypeSelection')}</Header>
                    <Markdown className="mt-4">{t('ModifyStarship.type.instruction')}</Markdown>
                        <div className="mt-4">
                            <DropDownSelect items={milestoneTypesDropDownItems()}
                                    onChange={(v) => setAdvancementType(v as CharacterAdvancementType)} defaultValue={advancementType} />
                        </div>
                </div>
            </div>
            <div className="my-5 text-end">
                <Button size="sm" onClick={() => nextStep()}>{t('Common.button.next')}</Button>
            </div>
        </>);
    }

    return (<LcarsFrame activePage={PageIdentity.ModifyStarship}>
        <div id="app">
            <div className="page container ms-0">

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/index.html">{t("Page.title.home")}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{t('Page.title.modifyStarship')}</li>
                    </ol>
                </nav>

                <Header>{t('Page.title.modifyStarship')}</Header>

                <Carousel controls={false} interval={null} activeIndex={carouselIndex} indicators={false}>
                    <Carousel.Item>
                        {createAdvancementTypeView()}
                    </Carousel.Item>

                    <Carousel.Item>
                        {createModificationOptionsView()}
                    </Carousel.Item>

                    <Carousel.Item>
                        {createFinalView()}
                    </Carousel.Item>
                </Carousel>

            </div>
        </div>
    </LcarsFrame>);
}

export default connect(starshipMapStateToProperties)(ModifyStarshipPage);