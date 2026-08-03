import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CharacterCreationApp from "./app";
import { Provider } from "react-redux";
import store from './state/store';
import './i18n/config';
import React, { Suspense } from 'react';
import LoadingPage from './pages/loadingPage';
import { Toaster } from 'react-hot-toast';
import ImportTablePage from './table/page/importTablePage';
import OtherToolsPage from './pages/otherToolsPage';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

const CreditsPage = React.lazy(() => import('./pages/creditsPage'));
const TalentsOverviewMainPage = React.lazy(() => import('./pages/talentsOverviewMainPage'));
const ViewSheetPage = React.lazy(() => import(/* webpackChunkName: 'view' */ './view/viewSheetPage'));
const TokenCreationPage = React.lazy(() => import(/* webpackChunkName: 'token' */ './token/tokenCreationPage'));
const TableListPage = React.lazy(() => import(/* webpackChunkName: 'table' */ './table/page/tableListPage'));
const ViewTablePage = React.lazy(() => import(/* webpackChunkName: 'table' */ './table/page/viewTablePage'));
const EditTablePage = React.lazy(() => import(/* webpackChunkName: 'table' */ './table/page/editTablePage'));
const SafetyChecklistPage = React.lazy(() => import(/* webpackChunkName: 'safety' */ './safety/page/safetyChecklistPage'));
const RandomStarshipPage = React.lazy(() => import(/* webpackChunkName: 'starship' */ './starship/page/randomStarshipPage'));
const RandomCreaturePage = React.lazy(() => import(/* webpackChunkName: 'npc' */ './creature/page/randomCreatureConfigurationPage'));
const TacticalAssetsPage = React.lazy(() => import(/* webpackChunkName: 'statc' */ './asset/page/tacticalAssetsPage'));
const ModifySupportCharacterPage = React.lazy(() => import(/* webpackChunkName: 'modify' */ './supportingcharacters/modify/modifySupportCharacterPage'));
const ModifyCharacterPage = React.lazy(() => import(/* webpackChunkName: 'modify' */ './modify/page/modifyMainCharacterPage'));
const ModifyStarshipPage = React.lazy(() => import(/* webpackChunkName: 'modify' */ './modify/page/modifyStarshipPage'));
const SwapMissionPodPage = React.lazy(() => import(/* webpackChunkName: 'modify' */ './modify/page/swapMissionPodPage'));
const NpcBuilderPage = React.lazy(() => import(/* webpackChunkName: 'npc' */ './npc/page/npcBuilderPage'));
const NpcSpeciesSelectionPage = React.lazy(() => import(/* webpackChunkName: 'npc' */ './npc/page/npcSpeciesSelectionPage'));
const NpcSpeciesDetailsPage = React.lazy(() => import(/* webpackChunkName: 'npc' */ './npc/page/npcSpeciesDetailsPage'));
const NpcStatsPage = React.lazy(() => import(/* webpackChunkName: 'npc' */ './npc/page/npcStatsPage'));
const NpcSpecialRulesPage = React.lazy(() => import(/* webpackChunkName: 'npc' */ './npc/page/npcSpecialRulesPage'));
const NpcFinalPage = React.lazy(() => import(/* webpackChunkName: 'npc' */ './npc/page/npcFinalPage'));
const GMTrackerPage = React.lazy(() => import(/* webpackChunkName: 'tracker' */ './tracker/gmTrackerPage'));
const SystemGenerationPage = React.lazy(() => import(/* webpackChunkName: 'sector' */ './mapping/page/systemGenerationPage'));
const SectorDetailsPage = React.lazy(() => import(/* webpackChunkName: 'sector' */ './mapping/page/sectorDetailsPage'));
const StarSystemDetailsPage = React.lazy(() => import(/* webpackChunkName: 'sector' */ './mapping/page/starSystemDetailsPage'));
const StationIndexPage = React.lazy(() => import(/* webpackChunkName: 'starship' */ './station/page/stationIndexPage'));
const StationSpaceframePage = React.lazy(() => import(/* webpackChunkName: 'starship' */ './station/page/stationSpaceframePage'));
const StationMissionProfileSelectionPage = React.lazy(() => import(/* webpackChunkName: 'starship' */ './station/page/stationMissionProfileSelectionPage'));
const StationWeaponsPage = React.lazy(() => import(/* webpackChunkName: 'starship' */ './station/page/stationWeaponsPage'));
const StationFinalPage = React.lazy(() => import(/* webpackChunkName: 'starship' */ './station/page/stationFinalPage'));
const StationTalentsPage = React.lazy(() => import(/* webpackChunkName: 'starship' */ './station/page/stationTalentsPage'));

let root = createRoot(document.getElementById("mainBody"));
root.render(
    <HelmetProvider>
        <Provider store={store}>
            <Router>
                <Suspense fallback={<LoadingPage />}>
                    <Routes>
                        <Route path="/modify/main" element={<ModifyCharacterPage />} />
                        <Route path="/modify/starship" element={<ModifyStarshipPage />} />
                        <Route path="/modify/starship/pod" element={<SwapMissionPodPage />} />
                        <Route path="/modify/supporting" element={<ModifySupportCharacterPage />} />
                        <Route path="/talents" element={<TalentsOverviewMainPage />} />
                        <Route path="/view" element={<ViewSheetPage />} />
                        <Route path="/credits" element={<CreditsPage />} />
                        <Route path="/npc" element={<NpcBuilderPage />} />
                        <Route path="/npc/species" element={<NpcSpeciesSelectionPage />} />
                        <Route path="/npc/species/details" element={<NpcSpeciesDetailsPage />} />
                        <Route path="/npc/stats" element={<NpcStatsPage />} />
                        <Route path="/npc/specialrules" element={<NpcSpecialRulesPage />} />
                        <Route path="/npc/final" element={<NpcFinalPage />} />
                        <Route path="/tools/sector/generator" element={<SystemGenerationPage />} />
                        <Route path="/tools/sector/details" element={<SectorDetailsPage />} />
                        <Route path="/tools/sector/starSystem" element={<StarSystemDetailsPage />} />
                        <Route path="/starship/generate" element={<RandomStarshipPage />} />
                        <Route path="/station" element={<StationIndexPage />} />
                        <Route path="/station/frame" element={<StationSpaceframePage />} />
                        <Route path="/station/profile" element={<StationMissionProfileSelectionPage />} />
                        <Route path="/station/weapons" element={<StationWeaponsPage />} />
                        <Route path="/station/talents" element={<StationTalentsPage />} />
                        <Route path="/station/final" element={<StationFinalPage />} />
                        <Route path="/random/creature" element={<RandomCreaturePage />} />
                        <Route path="/tactical" element={<TacticalAssetsPage />} />
                        <Route path="/tools" element={<OtherToolsPage />} />
                        <Route path="/tools/safety" element={<SafetyChecklistPage />} />
                        <Route path="/token" element={<TokenCreationPage />} />
                        <Route path="/tools/table" element={<TableListPage />} />
                        <Route path="/tools/table/view" element={<ViewTablePage />} />
                        <Route path="/tools/table/edit" element={<EditTablePage />} />
                        <Route path="/tools/table/import" element={<ImportTablePage />} />
                        <Route path="/tools/gmtracker" element={<GMTrackerPage />} />
                        <Route path="*" element={<CharacterCreationApp />} />
                    </Routes>
                </Suspense>
            </Router>
            <Toaster
                position="top-center"
                reverseOrder={false} />
        </Provider>
    </HelmetProvider>
);