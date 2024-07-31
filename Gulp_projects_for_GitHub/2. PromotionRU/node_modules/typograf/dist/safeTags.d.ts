import { TypografContext } from './main';
interface TagInfo {
    group: string;
    name?: string;
    isInline?: boolean;
    isClosing?: boolean;
}
export declare class SafeTags {
    private groups;
    private tags;
    private hidden;
    private counter;
    constructor();
    /**
     * Add own safe tag.
     */
    add(tag: RegExp | string[]): void;
    /**
     * Show safe tags.
     */
    show(context: TypografContext, group: string): void;
    /**
     * Hide safe tags.
     */
    hide(context: TypografContext, group: string): void;
    /**
     * Hide HTML tags.
     */
    hideHTMLTags(context: TypografContext): void;
    /**
     * Get previous label.
     */
    getPrevLabel(text: string, position: number): string;
    private getNextLabel;
    private getTagByLabel;
    private getTagInfo;
    private pasteLabel;
    private prepareRegExp;
    getPrevTagInfo(context: TypografContext, text: string, pos: number): TagInfo | null;
    getNextTagInfo(context: TypografContext, text: string, pos: number): TagInfo | null;
}
export {};
