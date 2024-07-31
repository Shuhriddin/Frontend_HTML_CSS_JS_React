/**
 * Get data for use in rules.
 */
export declare function getData(key: string): unknown;
/**
 * Set data for use in rules.
 */
export declare function setData(newData: Record<string, unknown>): void;
export type DataChar = string;
export type DataCommonQuote = string;
export type DataQuote = {
    left: string;
    right: string;
    spacing?: boolean;
    removeDuplicateQuotes?: true;
};
