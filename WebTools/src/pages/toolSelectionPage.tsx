import { useState } from 'react';
import {Character} from '../common/character';
import { CharacterType } from '../common/characterType';
import {navigateTo, Navigation} from '../common/navigator';
import {PageIdentity} from './pageIdentity';
import Button from 'react-bootstrap/Button';
import {Source} from '../helpers/sources';
import { hasAnySource, hasSource, isSecondEdition } from '../state/contextFunctions';
import { useTranslation } from 'react-i18next';
import InstructionText from '../components/instructionText';
import { PageFactory } from './pageFactory';
import { LoadingButton } from '../common/loadingButton';
import { useNavigate } from 'react-router';
import store from '../state/store';
import { setCharacter } from '../state/characterActions';
import { Header } from '../components/header';

const ToolSelectionPage = () => {

    const { t } = useTranslation();
    const [ loadingNpc, setLoadingNpc ] = useState(false);
    const [ loadingStarship, setLoadingStarship ] = useState(false);
    const [ loadingSystem, setLoadingSystem ] = useState(false);
    const [ loadingRandomStarship, setLoadingRandomStarship ] = useState(false);
    const navigate = useNavigate();

    const renderSystemGenerationButton = () => {
        if (hasAnySource([Source.ShackletonExpanse, Source.ExplorationGuide])) {
            return (<LoadingButton onClick={() => { loadSystemAndGoToPage(); } } loading={loadingSystem}>{t('ToolSelection.spaceSector')}</LoadingButton>);
        } else {
            return undefined;
        }
    }

    const renderTacticalAssetButton = () => {
        if (hasSource(Source.FederationKlingonWar)) {
            return (<Button className="mt-4" onClick={() => goToPage(PageIdentity.TacticalAssets)}>{t('Page.title.tacticalAssets')}</Button>);
        } else {
            return undefined;
        }
    }

    const startCharacterCreation = () => {
        if (hasSource(Source.Core2ndEdition)) {
            let character = Character.createMainCharacter(CharacterType.Starfleet, store.getState().context.era, 2);
            store.dispatch(setCharacter(character));
            goToPage(PageIdentity.CharacterType);
        } else if (hasSource(Source.KlingonCore) || hasSource(Source.PlayersGuide)) {
            goToPage(PageIdentity.CharacterType);
        } else {
            let character = Character.createMainCharacter(CharacterType.Starfleet, store.getState().context.era);
            store.dispatch(setCharacter(character));
            goToPage(PageIdentity.Species);
        }
    }

    const loadSystemAndGoToPage = () => {
        setLoadingSystem(true);
        PageFactory.instance.loadSystemGenerationFactory(() => {
            setLoadingSystem(false);
            goToPage(PageIdentity.SystemGeneration);
        });
    }

    const loadStarshipAndGoToPage = () => {
        setLoadingStarship(true);
        PageFactory.instance.loadStarshipFactory(() => {
            setLoadingStarship(false);
            goToPage(PageIdentity.StarshipToolSelection);
        });
    }

    const loadNpcAndGoToPage = () => {
        navigate("/npc");
    }

    const loadRandomNpcAndGoToPage = () => {
        setLoadingNpc(true);
        PageFactory.instance.loadNpcFactory(() => {
            setLoadingNpc(false);
            goToPage(PageIdentity.NpcConfiguration);
        });
    }

    const loadRandomStarshipAndGoToPage = () => {
        setLoadingRandomStarship(true);
        PageFactory.instance.loadStarshipFactory(() => {
            setLoadingRandomStarship(false);
            goToPage(PageIdentity.RandomStarship);
        });
    }


    const goToPage = (page: PageIdentity) => {
        if (page === PageIdentity.SystemGeneration) {
            navigate("/systemGenerator");
        } else if (page === PageIdentity.RandomStarship) {
            navigate("/starship/generate");
        } else if (page === PageIdentity.RandomCreature) {
            navigate("/random/creature");
        } else if (page === PageIdentity.TacticalAssets) {
            navigate("/tactical");
        } else {
            Navigation.navigateToPage(page);
        }
    }

    return (
        <div className="page">
            <div className="container ms-0">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/index.html" onClick={(e) => navigateTo(e, PageIdentity.Home)}>{t('Page.title.home')}</a></li>
                        <li className="breadcrumb-item"><a href="/index.html" onClick={(e) => navigateTo(e, PageIdentity.SourceSelection)}>{t('Page.title.sourceSelection')}</a></li>
                        <li className="breadcrumb-item"><a href="/index.html" onClick={(e) => navigateTo(e, PageIdentity.Era)}>{t('Page.title.era')}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{t('Page.title.toolSelection')}</li>
                    </ol>
                </nav>

                <main>
                    <Header>{t('Page.title.toolSelection')}</Header>
                    <InstructionText text={t('ToolSelection.instruction')} />

                    <div className="row">
                        <div className="col-md-6 button-column">
                            <Button className="mt-4" onClick={() => { startCharacterCreation(); } } >{t('ToolSelection.mainCharacter')}</Button>
                            <Button className="mt-4" onClick={() => { goToPage(PageIdentity.SupportingCharacter); } } >{t('ToolSelection.supportingCharacter')}</Button>
                            {isSecondEdition()
                                ? (<Button className="mt-4" onClick={() => { loadNpcAndGoToPage(); } }>{t('ToolSelection.npc')}</Button>)
                                : undefined}
                            <LoadingButton className="mt-4" onClick={() => { loadStarshipAndGoToPage(); } } loading={loadingStarship}>{t('ToolSelection.starship')}</LoadingButton>
                            {renderSystemGenerationButton()}
                        </div>
                        <div className="col-md-6 button-column">
                            <LoadingButton className="mt-4" onClick={() => { loadRandomNpcAndGoToPage(); } } loading={loadingNpc}>{t('ToolSelection.randomNpc')}</LoadingButton>
                            <LoadingButton className="mt-4" onClick={() => { loadRandomStarshipAndGoToPage(); } } loading={loadingRandomStarship}>{t('ToolSelection.randomStarship')}</LoadingButton>
                            {isSecondEdition()
                                ? (<Button className="mt-4" onClick={() => { goToPage(PageIdentity.RandomCreature); } }>{t('ToolSelection.randomCreature')}</Button>)
                                : undefined}
                            {renderTacticalAssetButton()}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ToolSelectionPage;