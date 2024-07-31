import type { TypografContext } from '../main';
export type Entity = [string, number];
export type TypografHtmlEntityType = 'name' | 'digit' | 'default';
interface HtmlEntityInfo {
    name: string;
    nameEntity: string;
    digitEntity: string;
    utf: string;
    reName: RegExp;
    reUtf: RegExp;
}
declare class HtmlEntities {
    private entities;
    private invisibleEntities;
    private entitiesByName;
    private entitiesByNameEntity;
    private entitiesByDigitEntity;
    private entitiesByUtf;
    constructor();
    /**
     * Entities as name or digit to UTF-8.
     */
    toUtf(context: TypografContext): void;
    /**
     * Entities in decimal or hexadecimal form to UTF-8.
     */
    decHexToUtf(text: string): string;
    /**
     * Restore HTML entities in text.
     */
    restore(context: TypografContext): void;
    /**
     * Get a entity by utf using the type.
     */
    getByUtf(symbol: string, type?: TypografHtmlEntityType): HtmlEntityInfo | string | undefined;
    private prepareEntities;
    private prepareListParam;
    private restoreEntitiesByIndex;
}
export declare const htmlEntities: HtmlEntities;
export {};
