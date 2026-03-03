import React from "react";
import { Button } from "react-bootstrap";
import { Character } from "../common/character";
import { Starship } from "../common/starship";
import { Station } from "../common/station";
import { Creature } from "../creature/model/creature";
import { marshaller } from "../helpers/marshaller";
import { useTranslation } from "react-i18next";

interface IViewButtonProperties {
    className?: string;
    construct: Character|Station|Creature|Starship;
}

export const ViewButton: React.FC<IViewButtonProperties> = ({className, construct}) => {

    const { t } = useTranslation();

    const showViewPage = () => {
        const value = marshaller.encodeConstruct(construct);
        window.open('/view?s=' + value, "_blank");
    }

    return (<Button size="sm" className={"me-2 " + (className || '')}
        onClick={showViewPage}>{t('Common.button.view')}</Button>);
}