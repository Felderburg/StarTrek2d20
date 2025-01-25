import toast from "react-hot-toast";
import { DominionWarUniformPack } from "./dominionWarUniformPack";
import { UniformEra } from "./uniformEra";
import { IUniformPack } from "./uniformPack";
import { NoneUniformPack } from "./noneUniformPack";

export default class UniformPackCollection {

    uniformPacks: { [era: number]: IUniformPack } = {};

    private static _instance: UniformPackCollection;

    public static get instance() {
        if (UniformPackCollection._instance == null) {
            UniformPackCollection._instance = new UniformPackCollection();
        }
        UniformPackCollection._instance.uniformPacks[UniformEra.DominionWar] = new DominionWarUniformPack();
        UniformPackCollection._instance.uniformPacks[UniformEra.None] = new NoneUniformPack();
        return UniformPackCollection._instance;
    }

    getUniformPack(uniformEra: UniformEra) {
        if (this.isLoaded(uniformEra)) {
            return this.uniformPacks[uniformEra];
        } else {
            return this.uniformPacks[UniformEra.DominionWar];
        }
    }

    loadUniformPack(era: UniformEra, completion: () => void = () => {}) {
        if (this.isLoaded(era)) {
            completion();
        } else {
            if (era === UniformEra.Bynar) {
                import(/* webpackChunkName: 'bynarUniform' */ './bynarUniformPack').then(({BynarUniformPack}) => {
                    this.uniformPacks[era] = new BynarUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else  if (era === UniformEra.Cardassian) {
                import(/* webpackChunkName: 'cardassianUniform' */ './cardassianUniformPack').then(({CardassianUniformPack}) => {
                    this.uniformPacks[era] = new CardassianUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else  if (era === UniformEra.Civilian) {
                import(/* webpackChunkName: 'civilianUniform' */ './civilianOutfitUniformPack').then(({CivilianOutfitUniformPack}) => {
                    this.uniformPacks[era] = new CivilianOutfitUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else  if (era === UniformEra.Ferengi) {
                import(/* webpackChunkName: 'ferengiUniform' */ './ferengiUniformPack').then(({FerengiUniformPack}) => {
                    this.uniformPacks[era] = new FerengiUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.Klingon) {
                import(/* webpackChunkName: 'klingonUniform' */ './klingonArmorUniformPack').then(({KlingonArmorUniformPack}) => {
                    this.uniformPacks[era] = new KlingonArmorUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.OriginalSeriesKlingon) {
                import(/* webpackChunkName: 'klingonUniform' */ './tosKlingonUniformPack').then(({TosKlingonUniformPack}) => {
                    this.uniformPacks[era] = new TosKlingonUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.Enterprise) {
                import(/* webpackChunkName: 'enterpriseUniform' */ './enterpriseUniformPack').then(({EnterpriseUniformPack}) => {
                    this.uniformPacks[era] = new EnterpriseUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.MonsterMaroon) {
                import(/* webpackChunkName: 'monsterMaroonUniform' */ './monsterMaroonUniformPack').then(({MonsterMaroonUniformPack}) => {
                    this.uniformPacks[era] = new MonsterMaroonUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.OriginalSeries) {
                import(/* webpackChunkName: 'tosUniform' */ './tosUniformPack').then(({TosUniformPack}) => {
                    this.uniformPacks[era] = new TosUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.VoyagerDS9) {
                import(/* webpackChunkName: 'voyagerDs9Uniform' */ './voyagerUniformPack').then(({VoyagerUniformPack}) => {
                    this.uniformPacks[era] = new VoyagerUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.LowerDecks) {
                import(/* webpackChunkName: 'lowerDecksUniform' */ './lowerDecksUniformPack').then(({LowerDecksUniformPack}) => {
                    this.uniformPacks[era] = new LowerDecksUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.JemHadar) {
                import(/* webpackChunkName: 'jemHadar' */ './jemHadarUniformPack').then(({JemHadarUniformPack}) => {
                    this.uniformPacks[era] = new JemHadarUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.Maco) {
                import(/* webpackChunkName: 'maco' */ './macoUniformPack').then(({MacoUniformPack}) => {
                    this.uniformPacks[era] = new MacoUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.NextGeneration) {
                import(/* webpackChunkName: 'tng' */ './tngUniformPack').then(({TngUniformPack}) => {
                    this.uniformPacks[era] = new TngUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.StarTrekOnline) {
                import(/* webpackChunkName: 'sto' */ './stoUniformPack').then(({StoUniformPack}) => {
                    this.uniformPacks[era] = new StoUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.Romulan) {
                import(/* webpackChunkName: 'romulan' */ './romulanUniformPack').then(({RomulanUniformPack}) => {
                    this.uniformPacks[era] = new RomulanUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.RomulanNemesis) {
                import(/* webpackChunkName: 'romulan' */ './romulanNemesisUniformPack').then(({RomulanNemesisUniformPack}) => {
                    this.uniformPacks[era] = new RomulanNemesisUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.StrangeNewWorlds) {
                import(/* webpackChunkName: 'strangeNewWorlds' */ './strangeNewWorldsUniformPack').then(({StrangeNewWorldsUniformPack}) => {
                    this.uniformPacks[era] = new StrangeNewWorldsUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.Suliban) {
                import(/* webpackChunkName: 'suliban' */ './sulibanUniformPack').then(({SulibanUniformPack}) => {
                    this.uniformPacks[era] = new SulibanUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else if (era === UniformEra.Tzenkethi) {
                import(/* webpackChunkName: 'tzenkethi' */ './tzenkethiArmourUniformPack').then(({TzenkethiArmourUniformPack}) => {
                    this.uniformPacks[era] = new TzenkethiArmourUniformPack();
                    completion();
                }).catch((error) => toast("Ooops. Something bad happened", { className: 'bg-danger' }));
            } else {
                this.createUniformPack(era);
                completion();
            }
        }
    }

    private createUniformPack(era: UniformEra) {
        return new DominionWarUniformPack();
    }

    isLoaded(uniformEra: UniformEra) {
        return this.uniformPacks[uniformEra] != null;
    }
}