import { useTranslation } from "react-i18next";
import { Header } from "../../components/header";
import { Creature } from "../model/creature";

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
                <div className="col-md-4 text-white"><div className="view-border-bottom pb-2">{""}</div></div>
            </div>
        </>)

    }


    return (<>
        <Header className="mb-4">{(creature.name ? creature.name : t('Construct.other.unnamedCreature'))}</Header>

        {renderTopFields()}
    </>)

}

export default CreatureView;