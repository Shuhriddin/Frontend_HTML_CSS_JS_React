import type { TypografLineEnding, TypografExecutePrefs, TypografPrefs, TypografPrefsInternal } from './main';
export declare function prepareHtmlEntity(htmlEntity?: Partial<TypografPrefsInternal['htmlEntity']>): TypografPrefsInternal['htmlEntity'];
export declare function prepareLineEnding(lineEnding?: TypografLineEnding): TypografLineEnding;
export declare function prepareProcessingSeparateParts(value?: boolean): boolean;
export declare function preparePrefs(prefs: TypografPrefs): TypografPrefsInternal;
export declare function prepareContextPrefs(prefs: TypografPrefsInternal, executePrefs?: TypografExecutePrefs): TypografPrefsInternal;
