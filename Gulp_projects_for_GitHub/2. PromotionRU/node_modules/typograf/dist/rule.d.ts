import { TypografRule, TypografRuleInternal } from './main';
export declare const DEFAULT_RULE_INDEX = 0;
export declare const DEFAULT_QUEUE_NAME = "default";
export declare function addInnerRule(rule: TypografRule): void;
export declare function addRule(rule: TypografRule): void;
export declare function sortRules(rules: TypografRuleInternal[]): void;
export declare function getRules(): TypografRuleInternal[];
export declare function getInnerRules(): TypografRuleInternal[];
export declare function prepareRule(rule: TypografRule): TypografRuleInternal;
