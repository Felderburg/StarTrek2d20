import { useEffect, useState } from "react";
import { TokenConfig } from "../../common/character"
import { LoadingSpinnerView } from "../../common/loadingSpinnerView";
import SpeciesRestrictions from "../model/speciesRestrictions";
import HeadCatalog from "../model/headCatalog";
import UniformPackCollection from "../model/uniformPackCollection";
import ExtrasCatalog from "../model/extrasCatalog";
import { TokenSvgBuilder } from "../tokenSvgBuilder";

interface ITokenViewProperties {
    tokenConfig: TokenConfig;
    onClick: () => void;
    size?: 'sm'|'md'|'lg'
}

const TokenView: React.FC<ITokenViewProperties> = ({tokenConfig, onClick}) => {

    const [loading, setLoading] = useState<boolean>(true);

    const loadExtras = () => {
        if (!ExtrasCatalog.instance.isLibraryLoaded) {
            ExtrasCatalog.instance.loadLibraryExtension(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }

    const loadUniformEra = () => {
        if (!UniformPackCollection.instance.isLoaded(tokenConfig.token.uniformEra)) {
            UniformPackCollection.instance.loadUniformPack(tokenConfig.token.uniformEra, loadExtras);
        } else {
            loadExtras();
        }
    }

    const loadDependencies = async () => {
        if (SpeciesRestrictions.isRubberHeaded(tokenConfig.token.species)) {
            HeadCatalog.instance.loadRubberHeadExtension(loadUniformEra)
        } else {
            loadUniformEra();
        }
    }

    useEffect(() => {
        loadDependencies()
    }, [])

    if (loading) {
        return <LoadingSpinnerView />;
    } else {
        const svg = TokenSvgBuilder.createSvg(tokenConfig.token, tokenConfig.rounded, tokenConfig.bordered);
        return (<div className="mw-100" style={{width: "300px", aspectRatio: "1" }} dangerouslySetInnerHTML={{ __html: svg }}>

        </div>);
    }
}

export default TokenView;