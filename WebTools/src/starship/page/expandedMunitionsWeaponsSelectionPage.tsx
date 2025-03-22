import React from "react";
import { connect } from "react-redux";
import { Navigation } from "../../common/navigator";
import { ShipTalentDetailSelection, Starship } from "../../common/starship";
import Button from "react-bootstrap/Button";
import { Header } from "../../components/header";
import { ModalControl } from "../../components/modal";
import { addStarshipTalentDetailSelection, nextStarshipWorkflowStep, removeStarshipTalentDetailSelection } from "../../state/starshipActions";
import store from "../../state/store";
import { ShipBuildWorkflow } from "../model/shipBuildWorkflow";
import AddWeaponView from "../view/addWeaponView";
import ShipBuildingBreadcrumbs from "../view/shipBuildingBreadcrumbs";
import { Dialog } from "../../components/dialog";
import { IconButton } from "../../components/iconButton";
import { useTranslation } from "react-i18next";

interface IExpandedMunitionsWeaponsSelectionPage {
    starship: Starship;
    workflow: ShipBuildWorkflow;
}

const ExpandedMunitionsWeaponsSelectionPage: React.FC<IExpandedMunitionsWeaponsSelectionPage> = ({starship, workflow}) => {

    const { t } = useTranslation();

    const numberOfWeapons = () => {
        return starship.getNonSpaceframeTalentSelectionList().filter(t => t.talent.name === "Expanded Munitions").length;
    }

    const renderWeapons = () => {
        if (starship.weapons.length === 0) {
            return (<tbody>
                    <tr><td colSpan={4}>{t('Common.text.none')}</td></tr>
                </tbody>);
        } else {
            return (<tbody>
                {starship.talentDetailSelections.filter(s => s.weapon).map((s, i) => (<tr key={'weapon-' + i}>
                    <td className="selection-header">{s.weapon.description}</td>
                    <td><p className="m-0">{s.weapon.dice}</p></td>
                    <td><p className="m-0">{s.weapon.effectsAndQualities}</p></td>
                    <td className="text-end"><IconButton variant="danger" onClick={() => { confirmRemove(s) }} icon="trash" /></td>
                </tr>))}
            </tbody>);
        }
    }

    const nextPage = () => {
        if (starship.talentDetailSelections.length < numberOfWeapons()) {
            Dialog.show("You have not specified all of the additional weapons");
        } else {
            let step = workflow.peekNextStep();
            store.dispatch(nextStarshipWorkflowStep());
            Navigation.navigateToPage(step.page);
        }
    }

    const closeModal = () => {
        ModalControl.hide();
    }

    const confirmRemove = (selection: ShipTalentDetailSelection) => {
        ModalControl.show(undefined, () => closeModal(), confirmationContents(selection), "Delete Weapon");
    }

    const showModal = () => {
        if (starship.talentDetailSelections.length >= numberOfWeapons()) {
            Dialog.show("You have selected the maximum number of additional weapons");
        } else {
            ModalControl.show("lg", () => closeModal(), modalContents(), "Add Weapon");
        }
    }

    const modalContents = () => {
        return (<AddWeaponView onClose={() => closeModal()} serviceYear={starship.serviceYear}
            addWeapon={(weapon) => store.dispatch(addStarshipTalentDetailSelection(new ShipTalentDetailSelection(weapon)))}
            version={starship.version} />)
    }

    const confirmationContents = (selection: ShipTalentDetailSelection) => {
        return (<div>Are you sure you want to delete this weapon?
            <div className="mt-4 text-center">
                <Button size="sm" className="me-3" onClick={() => { closeModal() }} >{t('Common.button.cancel')}</Button>
                <Button variant="danger" size="sm" onClick={() => { deleteWeapon(selection) }} >{t('Common.button.delete')}</Button>
            </div>
        </div>);
    }

    const deleteWeapon = (selection: ShipTalentDetailSelection) => {
        store.dispatch(removeStarshipTalentDetailSelection(selection));
        closeModal();
    }

    return (<div className="page container ms-0">
            <ShipBuildingBreadcrumbs />
            <Header>Expanded Munitions</Header>

            <div className="d-flex mb-3 mt-4">
                <p className="me-auto mb-0">
                    {numberOfWeapons() > 1
                        ? "Your ship has the talent \"Expanded Munitions\" (multiple times). You may select " + numberOfWeapons() + " additional starship weapons:"
                        : "Your ship has the talent \"Expanded Munitions\". You may select an additional starship weapon:"}
                    </p>
                <div className="text-end">
                    <IconButton className="mt-0" icon="plus-circle" onClick={() => showModal()} />
                </div>
            </div>

            <table className="selection-list">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Dice</th>
                        <th>Qualities</th>
                    </tr>
                </thead>
                {renderWeapons()}
            </table>

            <div className="text-end">
                <Button onClick={() => nextPage()}>{t('Common.button.next')}</Button>
            </div>
        </div>);

}

function mapStateToProps(state, ownProps) {
    return {
        starship: state.starship.starship,
        workflow: state.starship.workflow
    };
}

export default connect(mapStateToProps)(ExpandedMunitionsWeaponsSelectionPage);