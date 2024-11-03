import { useTranslation } from "react-i18next";
import { Header } from "../../components/header";
import { Asset, AssetAbility } from "../asset";
import { AssetType, AssetTypes } from "../assetType";
import { AssetStatType } from "../assetStat";
import { useState } from "react";
import { LoadingButton } from "../../common/loadingButton";
import { PDFDocument } from "@cantoo/pdf-lib";
import { SpaceframeHelper } from "../../helpers/spaceframes";
import { Spaceframe } from "../../helpers/spaceframeEnum";
import { Rank, RanksHelper } from "../../helpers/ranks";

declare function download(bytes: any, fileName: any, contentType: any): any;

interface IAssetAbilityViewProperties {
    ability?: AssetAbility;
}

const AssetAbilityView:React.FC<IAssetAbilityViewProperties> = ({ability}) => {
    if (ability == null) {
        return undefined;
    } else {
        return (<p>
            <b>{ability.title}:</b> {' '}
            {ability.description}
        </p>)
    }
}

interface IAssetViewProperties {
    asset: Asset;
}

const AssetView:React.FC<IAssetViewProperties> = ({asset}) => {
    const { t } = useTranslation();
    const [loadingExport, setLoadingExport] = useState(false);

    const exportPdf = async () => {
        setLoadingExport(true);
        import(/* webpackChunkName: 'export' */ '../../exportpdf/spaderCard').then(async ({SpaderCard}) => {
            setLoadingExport(false);

            const card = new SpaderCard();

            const existingPdfBytes = await fetch(card.getPdfUrl(asset)).then(res => res.arrayBuffer())
            const pdfDoc = await PDFDocument.load(existingPdfBytes)
            await card.populate(pdfDoc, asset);

            const pdfBytes = await pdfDoc.save();

            // Trigger the browser to download the PDF document
            download(pdfBytes, card.createFileName(asset), "application/pdf");
        });
    }

    console.log(asset.additionalInformation, Spaceframe[asset.additionalInformation]);


    return (<main>
        <Header>{asset.name}</Header>

        <div className="row mt-4">

            <div className="col-12 col-xl-6">
                <div className="row">
                    <div className="col-4 view-field-label pb-2">{t('Construct.other.name')}:</div>
                    <div className="col-8 text-white">
                        <div className="view-border-bottom pb-2">
                            {asset.name}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 view-field-label pb-2">{t('Construct.other.assetType')}:</div>
                    <div className="col-8 text-white">
                        <div className="view-border-bottom pb-2">{AssetTypes.instance.getTypes()[asset.type].name}</div>
                    </div>
                </div>

                {asset.additionalInformation != null && asset.type === AssetType.Ship
                    ? (<div className="row">
                        <div className="col-4 view-field-label pb-2">{t('Construct.other.spaceFrame')}:</div>
                        <div className="col-8 text-white">
                            <div className="view-border-bottom pb-2">
                                {SpaceframeHelper.instance().getSpaceframe(asset.additionalInformation as Spaceframe).localizedName}
                            </div>
                        </div>
                    </div>)
                    : undefined}

                {asset.additionalInformation != null && asset.type === AssetType.Character
                    ? (<div className="row">
                        <div className="col-4 view-field-label pb-2">{t('Construct.other.rank')}:</div>
                        <div className="col-8 text-white">
                            <div className="view-border-bottom pb-2">
                                {RanksHelper.instance().getRank(asset.additionalInformation as Rank).localizedName}
                            </div>
                        </div>
                    </div>)
                    : undefined}

                <div className="row row-cols-3 row-cols-md-6 justify-content-md-center">
                    <div className="col">
                        <div className="bg-primary text-center py-3 my-3 rounded-3">
                            <div className="text-white"><small>{t('Construct.assetStat.medical')}</small></div>
                            <p>{asset.stats[AssetStatType.Medical].asString}</p>
                        </div>
                    </div>

                    <div className="col">
                        <div className="bg-primary text-center py-3 my-3 rounded-3">
                            <div className="text-white"><small>{t('Construct.assetStat.military')}</small></div>
                            <p>{asset.stats[AssetStatType.Military].asString}</p>
                        </div>
                    </div>

                    <div className="col">
                        <div className="bg-primary text-center py-3 my-3 rounded-3">
                            <div className="text-white"><small>{t('Construct.assetStat.personal')}</small></div>
                            <p>{asset.stats[AssetStatType.Personal].asString}</p>
                        </div>
                    </div>

                    <div className="col">
                        <div className="bg-primary text-center py-3 my-3 rounded-3">
                            <div className="text-white"><small>{t('Construct.assetStat.science')}</small></div>
                            <p>{asset.stats[AssetStatType.Science].asString}</p>
                        </div>
                    </div>

                    <div className="col">
                        <div className="bg-primary text-center py-3 my-3 rounded-3">
                            <div className="text-white"><small>{t('Construct.assetStat.social')}</small></div>
                            <p>{asset.stats[AssetStatType.Social].asString}</p>
                        </div>
                    </div>
                </div>

                <div className="col mt-4">
                    <AssetAbilityView ability={asset.specialAbility} />
                </div>


            </div>

            <div className="mt-5 mb-3">
                <LoadingButton loading={loadingExport} className="button-small me-3" onClick={() => exportPdf() }>{t('Common.button.exportPdf')}</LoadingButton>
            </div>
        </div>
    </main>);
}

export default AssetView;