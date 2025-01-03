import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { preventDefaultAnchorEvent } from "../../common/navigator";
import { PageIdentity } from "../../pages/pageIdentity";
import { DropDownElement, DropDownSelect } from "../../components/dropDownInput";
import { useState } from "react";
import { AssetType, AssetTypes } from "../assetType";
import LcarsFrame from "../../components/lcarsFrame";
import Button from "react-bootstrap/Button";
import { Header } from "../../components/header";
import { Asset } from "../asset";
import { marshaller } from "../../helpers/marshaller";
import { AssetStatType } from "../assetStat";
import { SpaceframeHelper } from "../../helpers/spaceframes";
import { Spaceframe } from "../../helpers/spaceframeEnum";
import { characterAssets, resourceAssets, starshipAssets } from "../assetCatalog";
import toast from "react-hot-toast";

const TacticalAssetsPage = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [type, setType] = useState<(string|AssetType)>("");
    const [ assets, setAssets ] = useState([]);

    const getAssetTypes = () => {
        let result = [ new DropDownElement("", "Any")];
        AssetTypes.instance.getTypes().forEach(t => result.push(new DropDownElement(t.type, t.name)));
        return result;
    }

    const showViewPage = (asset: Asset) => {
        const value = marshaller.encodeAsset(asset);
        window.open('/view?s=' + value, "_blank");
    }

    const getSpaceframe = (asset: Asset) => {
        if (asset.type === AssetType.Ship) {
            let spaceframe = SpaceframeHelper.instance().getSpaceframe(asset.additionalInformation as Spaceframe);
            return (<>
                <br />
                <small><i>
                    {spaceframe.localizedName}
                </i></small>
            </>);
        } else {
            return undefined;
        }
    }

    const generateAsset = () => {

        let newAssets = [...assets];
        let options = [];
        if (type === AssetType.Character) {
            options = [...characterAssets];
        } else if (type === AssetType.Ship) {
            options = [...starshipAssets];
        } else if (type === AssetType.Resource) {
            options = [...resourceAssets];
        } else if (type === "") {
            options.push(...characterAssets);
            options.push(...starshipAssets);
            options.push(...resourceAssets);
        }

        let names = newAssets.map(a => a.name);
        options = options.filter(a => !names.includes(a.name));

        if (options.length > 0) {
            let asset = options[Math.floor(Math.random() * options.length)];
            newAssets.push(asset);
            setAssets(newAssets);
        } else {
            toast("Sorry. There aren't any more assets to choose from.", { className: 'bg-danger text-white' });
        }
    }

    return (
        <LcarsFrame activePage={PageIdentity.TacticalAssets}>
            <div id="app">
                <div className="page container ms-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/index.html" onClick={(e) => preventDefaultAnchorEvent(e, () => navigate("/"))}>{t('Page.title.home')}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{t('Page.title.tacticalAssets')}</li>
                    </ol>
                    </nav>
                    <main>
                        <Header>{t('Page.title.tacticalAssets')}</Header>
                        <p className="mt-3">
                            {t('TacticalAssetsPage.instruction')}
                        </p>

                        <div className="row">
                            <div className="col-md-6 mt-4">
                                <Header level={2}>{t('Construct.other.assetType')}</Header>

                                <div className="my-4">
                                    <DropDownSelect
                                        items={getAssetTypes()}
                                        defaultValue={ type ?? "" }
                                        onChange={(type) => setType(type) }/>
                                </div>
                            </div>
                        </div>

                        <div className="my-3 text-end">
                            <Button size="sm" onClick={() => generateAsset()}>Add</Button>
                        </div>

                        <Header level={2} className="mt-4">{t('TacticalAssetsPage.assets')}</Header>

                        {assets?.length ? (<table className="table table-dark mt-4">
                            <thead>
                                <tr>
                                    <th className="bg-black"></th>
                                    <th className="bg-black d-none d-md-table-cell text-center">{t('Construct.assetStat.medical')}</th>
                                    <th className="bg-black d-none d-md-table-cell text-center">{t('Construct.assetStat.military')}</th>
                                    <th className="bg-black d-none d-md-table-cell text-center">{t('Construct.assetStat.personal')}</th>
                                    <th className="bg-black d-none d-md-table-cell text-center">{t('Construct.assetStat.science')}</th>
                                    <th className="bg-black d-none d-md-table-cell text-center">{t('Construct.assetStat.social')}</th>
                                    <th className="bg-black d-none d-md-table-cell"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {assets.map((a, i) =>{
                                    if (a.specialAbility) {
                                        return (<><tr key={'asset-' + i }>
                                            <td rowSpan={2}><p>{a.name} {getSpaceframe(a)}</p></td>
                                            <td className="d-none d-md-table-cell text-center border-bottom-0">{a.stats[AssetStatType.Medical].asString} </td>
                                            <td className="d-none d-md-table-cell text-center border-bottom-0">{a.stats[AssetStatType.Military].asString} </td>
                                            <td className="d-none d-md-table-cell text-center border-bottom-0">{a.stats[AssetStatType.Personal].asString} </td>
                                            <td className="d-none d-md-table-cell text-center border-bottom-0">{a.stats[AssetStatType.Science].asString} </td>
                                            <td className="d-none d-md-table-cell text-center border-bottom-0">{a.stats[AssetStatType.Social].asString} </td>
                                            <td rowSpan={2} className="text-end d-none d-md-table-cell"><Button size="sm" onClick={() => showViewPage(a)}>{t('Common.button.view')}</Button></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5} className="d-none d-md-table-cell border-top-0">
                                                <b>{a.specialAbility.title}: </b>
                                                {a.specialAbility.description}
                                            </td>
                                        </tr>
                                        </>);
                                    } else {
                                        return (<tr key={'asset-' + i }>
                                            <td><p>{a.name} {getSpaceframe(a)}</p></td>
                                            <td className="d-none d-md-table-cell text-center">{a.stats[AssetStatType.Medical].asString} </td>
                                            <td className="d-none d-md-table-cell text-center">{a.stats[AssetStatType.Military].asString} </td>
                                            <td className="d-none d-md-table-cell text-center">{a.stats[AssetStatType.Personal].asString} </td>
                                            <td className="d-none d-md-table-cell text-center">{a.stats[AssetStatType.Science].asString} </td>
                                            <td className="d-none d-md-table-cell text-center">{a.stats[AssetStatType.Social].asString} </td>
                                            <td className="text-end d-none d-md-table-cell"><Button size="sm" onClick={() => showViewPage(a)}>{t('Common.button.view')}</Button></td>
                                        </tr>);
                                    }

                                    })
                                }
                            </tbody>

                        </table>) : undefined}


                    </main>
                </div>
            </div>
        </LcarsFrame>
    );
}

export default TacticalAssetsPage;