import { SelectedTalent } from "./selectedTalent";

export enum AssemblyContext {
    Species,
    SpeciesAbility,
    Environment,
    EarlyOutlook,
    Education,
    Career,
    CareerEvent,
    FinishingTouches,
    Supporting,
    Improvement,
    Talent,
    Npc,
    Legacy,
}

export class ValueAssembly {
    readonly context: AssemblyContext;
    readonly value: string;
    readonly contextIndex: number;
    readonly index?: number

    constructor(value: string, context: AssemblyContext, contextIndex: number = 0, index?: number) {
        this.value = value;
        this.context = context;
        this.contextIndex = contextIndex;
        this.index = index;
    }
}

export class FocusAssembly {
    readonly context: AssemblyContext;
    readonly focus: string;
    readonly contextIndex: number;
    readonly index?: number

    constructor(focus: string, context: AssemblyContext, contextIndex: number = 0, index?: number) {
        this.focus = focus;
        this.context = context;
        this.contextIndex = contextIndex;
        this.index = index;
    }
}

export class TalentAssembly {
    readonly context: AssemblyContext;
    readonly talent: SelectedTalent;
    readonly contextIndex: number;
    readonly index?: number

    constructor(talent: SelectedTalent, context: AssemblyContext, contextIndex: number = 0, index?: number) {
        this.talent = talent;
        this.context = context;
        this.contextIndex = contextIndex;
        this.index = index;
    }
}