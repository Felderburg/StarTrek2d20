import { useTranslation } from "react-i18next";
import { Header } from "../../components/header";
import { Creature } from "../model/creature";
import WeaponBlockView from "../../view/weaponBlockView";
import TalentsBlockView from "../../view/talentsBlockView";
import CreatureStatBlock from "./creatureStatBlock";

export interface ICreatureViewProperties {
    creature: Creature;
}


const CreatureView:React.FC<ICreatureViewProperties> = ({creature}) => {

    const { t } = useTranslation();

    const renderTopFields = () => {
        return (<>
            <div className="row" style={{alignItems: "baseline"}}>
                <div className="col-md-2 view-field-label pb-2">{t('Construct.creature.habitat')}:</div>
                <div className="col-md-4 text-white"><div className="view-border-bottom pb-2">{creature?.habitat?.localizedName ?? ""}</div></div>

                <div className="col-md-2 view-field-label pb-2">{t('Construct.creature.creatureType')}:</div>
                <div className="col-md-4 text-white"><div className="view-border-bottom pb-2">{creature?.creatureType?.localizedName ?? ""}</div></div>
            </div>

            <div className="row" style={{alignItems: "baseline"}}>
                <div className="col-md-2 view-field-label pb-2">{t('Construct.creature.dietType')}:</div>
                <div className="col-md-4 text-white"><div className="view-border-bottom pb-2">{creature?.diet?.localizedName ?? ""}</div></div>

                <div className="col-md-2 view-field-label pb-2">{t('Construct.creature.size')}:</div>
                <div className="col-md-4 text-white"><div className="view-border-bottom pb-2">{creature?.size?.localizedName ?? ""}</div></div>
            </div>

            <div className="row" style={{alignItems: "baseline"}}>
                <div className="col-md-2 view-field-label pb-2">{t('Construct.creature.locomotion')}:</div>
                <div className="col-md-4 text-white"><div className="view-border-bottom pb-2">{creature?.locomotion.map(l => l.description).join(", ") ?? ""}</div></div>
            </div>

            <div className="row" style={{alignItems: "baseline"}}>
                <div className="col-md-2 view-field-label pb-2">{t('Construct.other.traits')}:</div>
                <div className="col-md-10 text-white"><div className="view-border-bottom pb-2">{creature.getAllTraits()}</div></div>
            </div>

        </>)

    }


    return (<>
        <Header className="mb-4">{(creature.name ? creature.name : t('Construct.other.unnamedCreature'))}</Header>

        {renderTopFields()}


        <div className="row">

            <div className="col-xl-6 mt-4">
                <CreatureStatBlock creature={creature} />
                <TalentsBlockView construct={creature} />
            </div>

            <div className="col-xl-6">
                <WeaponBlockView construct={creature} />
            </div>
        </div>
    </>)

}

export default CreatureView;