import { useTranslation } from "react-i18next";
import { Header } from "../../components/header";
import { Creature } from "../model/creature";
import WeaponBlockView from "../../view/weaponBlockView";
import TalentsBlockView from "../../view/talentsBlockView";
import CreatureStatBlock from "./creatureStatBlock";
import Markdown from "react-markdown";
import { LoadingButton } from "../../common/loadingButton";
import { useState } from "react";
import { PDFDocument } from "@cantoo/pdf-lib";

declare function download(bytes: any, fileName: any, contentType: any): any;

export interface ICreatureViewProperties {
    creature: Creature;
}

const CreatureView:React.FC<ICreatureViewProperties> = ({creature}) => {

    const { t } = useTranslation();
    const [loadingExport, setLoadingExport] = useState(false);

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

                <div className="col-md-2 view-field-label pb-2">{t('Construct.creature.form')}:</div>
                <div className="col-md-4 text-white"><div className="view-border-bottom pb-2">{creature?.form ?? ""}</div></div>
            </div>

            <div className="row" style={{alignItems: "baseline"}}>
                <div className="col-md-2 view-field-label pb-2">{t('Construct.other.traits')}:</div>
                <div className="col-md-10 text-white"><div className="view-border-bottom pb-2">{creature.getAllTraits()}</div></div>
            </div>

        </>)

    }

    const exportPdf = async () => {
        setLoadingExport(true);
        import(/* webpackChunkName: 'export' */ '../../exportpdf/sheets').then(({CharacterSheetRegistry}) => {
            setLoadingExport(false);

            const populateAndDownload = async () => {

                let sheet = CharacterSheetRegistry.getCreatureSheet();

                const existingPdfBytes = await fetch(sheet.getPdfUrl()).then(res => res.arrayBuffer())
                const pdfDoc = await PDFDocument.load(existingPdfBytes)
                await sheet.populate(pdfDoc, creature);

                const pdfBytes = await pdfDoc.save();

                // Trigger the browser to download the PDF document
                download(pdfBytes, sheet.createFileName("creature", creature), "application/pdf");
            }
            populateAndDownload();
        });
    }

    return (<>
        <Header className="mb-4">{(creature.name ? creature.name : t('Construct.other.unnamedCreature'))}</Header>

        {creature.description?.length
            ? (<Markdown>{creature.description}</Markdown>)
            : undefined}

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

        <div className="button-container mt-5 mb-3">
            <LoadingButton loading={loadingExport} className="btn-sm me-3" onClick={() => exportPdf() }>{t('Common.button.exportPdf')}</LoadingButton>
        </div>
    </>)

}

export default CreatureView;