
export enum AssemblyContext {
    Species,
    Environment,
    EarlyOutlook,
    Education,
    Career,
    FinishingTouches,
    Supporting,
    Improvement,
    Talent
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