import React from "react";
import { connect } from "react-redux";
import { Navigation } from "../../common/navigator";
import { Starship } from "../../common/starship";
import Button from "react-bootstrap/Button";
import { Header } from "../../components/header";
import { ModalControl } from "../../components/modal";
import { Weapon } from "../../helpers/weapons";
import { addStarshipWeapon, deleteStarshipWeapon, nextStarshipWorkflowStep } from "../../state/starshipActions";
import store from "../../state/store";
import { ShipBuildWorkflow } from "../model/shipBuildWorkflow";
import AddWeaponView from "../view/addWeaponView";
import ShipBuildingBreadcrumbs from "../view/shipBuildingBreadcrumbs";
import { IconButton } from "../../components/iconButton";

interface IStarshipWeaponsPageProperties {
    starship: Starship;
    workflow: ShipBuildWorkflow;
}

const StarshipWeaponsPageProperties: React.FC<IStarshipWeaponsPageProperties> = ({starship, workflow}) => {

    const renderWeapons = () => {
        if (starship.weapons.length === 0) {
            return (<tbody>
                    <tr><td colSpan={4}>None</td></tr>
                </tbody>);
        } else {
            return (<tbody>
                {starship.weapons.map((w, i) => (<tr key={'weapon-' + i}>
                    <td className="selection-header">{w.description}</td>
                    <td><p className="m-0">{w.dice}</p></td>
                    <td><p className="m-0">{w.effectsAndQualities}</p></td>
                    <td className="text-end">
                        <IconButton variant="danger" onClick={() => { confirmRemove(w) }} icon="trash" />
                    </td>
                </tr>))}
            </tbody>);
        }
    }

    const nextPage = () => {
        let step = workflow.peekNextStep();
        store.dispatch(nextStarshipWorkflowStep());
        Navigation.navigateToPage(step.page);
    }

    const closeModal = () => {
        ModalControl.hide();
    }

    const confirmRemove = (w: Weapon) => {
        ModalControl.show(undefined, () => closeModal(), confirmationContents(w), "Delete Weapon");
    }

    const showModal = () => {
        ModalControl.show("lg", () => closeModal(), modalContents(), "Add Weapon");
    }

    const modalContents = () => {
        return (<AddWeaponView onClose={() => closeModal()} serviceYear={starship.serviceYear}
            addWeapon={(weapon) => store.dispatch(addStarshipWeapon(weapon))} version={starship.version} />)
    }

    const confirmationContents = (w: Weapon) => {
        return (<div>Are you sure you want to delete this weapon?
            <div className="mt-4 text-center">
                <Button size="sm" className="me-3" onClick={() => { closeModal() }} >Cancel</Button>
                <Button size="sm" onClick={() => { deleteWeapon(w) }} >Delete</Button>
            </div>
        </div>);
    }

    const deleteWeapon = (weapon: Weapon) => {
        store.dispatch(deleteStarshipWeapon(weapon));
        closeModal();
    }

    return (<div className="page container ms-0">
            <ShipBuildingBreadcrumbs />
            <Header>Ship Weapons</Header>

            <div className="d-flex mb-3 mt-4 ">
                <p className="me-auto mb-0">This ship has the following weapons:</p>
                <div className="text-end">
                    <IconButton className="mt-0" onClick={() => showModal()} icon="plus-circle" title="Add" />
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

            <div className="text-end mt-4">
                <Button onClick={() => nextPage()}>Next</Button>
            </div>
        </div>);

}

function mapStateToProps(state, ownProps) {
    return {
        starship: state.starship.starship,
        workflow: state.starship.workflow
    };
}

export default connect(mapStateToProps)(StarshipWeaponsPageProperties);