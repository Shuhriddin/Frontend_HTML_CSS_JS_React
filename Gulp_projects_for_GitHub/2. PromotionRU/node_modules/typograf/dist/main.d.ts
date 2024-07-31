import { TypografHtmlEntityType } from './htmlEntities/index';
import { SafeTags } from './safeTags';
export type TypografLineEnding = 'LF' | 'CR' | 'CRLF';
export interface TypografHtmlEntity {
    type: TypografHtmlEntityType;
    onlyInvisible: boolean;
    list?: string[];
}
export type TypografRuleFilter = (rule: TypografRuleInternal) => boolean;
export interface TypografPrefs {
    locale: string | string[];
    lineEnding?: TypografLineEnding;
    htmlEntity?: Partial<TypografHtmlEntity>;
    live?: boolean;
    enableRule?: string | string[];
    disableRule?: string | string[];
    processingSeparateParts?: boolean;
    ruleFilter?: TypografRuleFilter;
}
export interface TypografExecutePrefs {
    locale?: string | string[];
    lineEnding?: TypografLineEnding;
    htmlEntity?: Partial<TypografHtmlEntity>;
    processingSeparateParts?: boolean;
    ruleFilter?: TypografRuleFilter;
}
export interface TypografPrefsInternal {
    locale: string[];
    lineEnding: TypografLineEnding;
    htmlEntity: TypografHtmlEntity;
    live: boolean;
    enableRule: string | string[];
    disableRule: string | string[];
    processingSeparateParts: boolean;
    ruleFilter: TypografRuleFilter;
}
export interface TypografContext {
    text: string;
    isHTML: boolean;
    prefs: TypografPrefsInternal;
    safeTags: SafeTags;
    getData: (key: string) => unknown;
}
export interface TypografRule<T = Record<string, unknown>> {
    name: string;
    handler: (this: Typograf, text: string, settings: T, context: TypografContext) => string;
    queue?: string;
    index?: string | number;
    disabled?: boolean;
    live?: boolean;
    settings?: T;
    htmlAttrs?: boolean;
}
export interface TypografRuleInternal {
    name: string;
    handler: (text: string, settings: unknown, context: TypografContext) => string;
    shortName: string;
    locale: string;
    group: string;
    queue: string;
    index: number;
    enabled: boolean;
    live: boolean;
    settings: unknown;
    htmlAttrs: boolean;
}
export declare class Typograf {
    safeTags: SafeTags;
    onBeforeRule?: (ruleName: string, context: TypografContext) => void;
    onAfterRule?: (ruleName: string, context: TypografContext) => void;
    private prefs;
    private rules;
    private innerRules;
    private rulesByQueues;
    private innerRulesByQueues;
    private enabledRules;
    private settings;
    private separatePartsTags;
    constructor(prefs: TypografPrefs);
    static addRule(rule: TypografRule): void;
    static addRules(rules: TypografRule[]): void;
    /**
     * Add internal rule.
     * Internal rules are executed before main rules.
     */
    static addInnerRule(rule: TypografRule): void;
    static addInnerRules(rules: TypografRule[]): void;
    static getRule(ruleName: string): TypografRuleInternal | null;
    static getRules(): TypografRuleInternal[];
    static getInnerRules(): TypografRuleInternal[];
    static getLocales(): string[];
    static addLocale(locale: string): void;
    static hasLocale(locale: string): boolean;
    static setData(data: Record<string, unknown>): void;
    static getData(key: string): unknown;
    static groups: {
        name: string;
        title: Record<string, string>;
    }[];
    static titles: Record<string, Record<string, string>>;
    static version: string;
    /**
     * Execute typographical rules for text.
     */
    execute(text: string | number, prefs?: TypografExecutePrefs): string;
    getSetting(ruleName: string, setting: string): unknown;
    setSetting(ruleName: string, setting: string, value: unknown): void;
    isEnabledRule(ruleName: string): boolean;
    isDisabledRule(ruleName: string): boolean;
    enableRule(ruleName: string | string[]): void;
    disableRule(ruleName: string | string[]): void;
    /**
     * Add safe tag.
     *
     * @example
     * // const typograf = new Typograf({ locale: 'ru' });
     * // typograf.addSafeTag('<mytag>', '</mytag>');
     * // typograf.addSafeTag('<mytag>', '</mytag>', '.*?');
     * // typograf.addSafeTag(/<mytag>.*?</mytag>/gi);
    */
    addSafeTag(startTag: string | RegExp, endTag?: string, middle?: string): void;
    private prepareContext;
    private splitBySeparateParts;
    private process;
    private executeRules;
    private ruleIterator;
    private prepareRuleSettings;
    private enable;
    private enableByMask;
}
