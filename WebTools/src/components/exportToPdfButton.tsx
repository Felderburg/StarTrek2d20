import React, { useState } from "react";
import { Character } from "../common/character";
import { Starship } from "../common/starship";
import { Station } from "../common/station";
import { Creature } from "../creature/model/creature";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "../common/loadingButton";

interface IExportToPdfButtonProperties {
    className?: string;
    construct: Character|Station|Creature|Starship;
}

export const ExportToPdfButton: React.FC<IExportToPdfButtonProperties> = ({className, construct}) => {

    const { t } = useTranslation();
    const [ loadingExport, setLoadingExport ] = useState<boolean>(false);

    const showExportDialog = () => {
        setLoadingExport(true);
        import(/* webpackChunkName: 'export' */ '../components/characterSheetDialog').then(({CharacterSheetDialog}) => {
            import(/* webpackChunkName: 'export' */ '../exportpdf/sheets').then(({CharacterSheetRegistry}) => {
                setLoadingExport(false);
                if (construct instanceof Station) {
                    CharacterSheetDialog.show(CharacterSheetRegistry.getStationSheets(construct), "station", construct);
                } else if (construct instanceof Starship) {
                    CharacterSheetDialog.show(CharacterSheetRegistry.getStarshipSheets(construct), "starship", construct);
                } else if (construct instanceof Creature) {
                    CharacterSheetDialog.show([ CharacterSheetRegistry.getCreatureSheet() ], "creature", construct);
                }
            });
        });
    }

    return (<LoadingButton size="sm" className={"me-2 " + (className || '')}
        loading={loadingExport}
        onClick={showExportDialog}>{t('Common.button.exportPdf')}</LoadingButton>);
}