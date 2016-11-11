export declare type TagName = 'Say' | 'Play' | 'Pause' | 'Gather' | 'Record' | 'Dial' | 'Number' | 'Client' | 'Conference' | 'Sip' | 'Queue' | 'Enqueue' | 'Task' | 'Leave' | 'Hangup' | 'Redirect' | 'Reject' | 'Sms' | 'Message' | 'Media' | 'Body';
export declare type TagAttributes = {
    [attrName: string]: string | number | boolean;
};
export declare type TagContent = string | number | Tag;
export declare type TagEntriesAfterName = TagContent | TagAttributes;
export declare type Tag = [TagName] | TagNoAttributes | TagWithAttributes;
export interface TagNoAttributes extends Array<TagContent> {
    0: TagName;
    1: TagContent;
}
export interface TagWithAttributes extends Array<TagEntriesAfterName> {
    0: TagName;
    1: TagAttributes;
    2?: TagContent;
}
export default function twiml(...tags: Tag[]): string;
export declare const Say: (...args: TagEntriesAfterName[]) => Tag;
export declare const Play: (...args: TagEntriesAfterName[]) => Tag;
export declare const Pause: (...args: TagEntriesAfterName[]) => Tag;
export declare const Gather: (...args: TagEntriesAfterName[]) => Tag;
export declare const Record: (...args: TagEntriesAfterName[]) => Tag;
export declare const Dial: (...args: TagEntriesAfterName[]) => Tag;
export declare const Number: (...args: TagEntriesAfterName[]) => Tag;
export declare const Client: (...args: TagEntriesAfterName[]) => Tag;
export declare const Conference: (...args: TagEntriesAfterName[]) => Tag;
export declare const Sip: (...args: TagEntriesAfterName[]) => Tag;
export declare const Queue: (...args: TagEntriesAfterName[]) => Tag;
export declare const Enqueue: (...args: TagEntriesAfterName[]) => Tag;
export declare const Task: (...args: TagEntriesAfterName[]) => Tag;
export declare const Leave: (...args: TagEntriesAfterName[]) => Tag;
export declare const Hangup: (...args: TagEntriesAfterName[]) => Tag;
export declare const Redirect: (...args: TagEntriesAfterName[]) => Tag;
export declare const Reject: (...args: TagEntriesAfterName[]) => Tag;
export declare const Sms: (...args: TagEntriesAfterName[]) => Tag;
export declare const Message: (...args: TagEntriesAfterName[]) => Tag;
export declare const Media: (...args: TagEntriesAfterName[]) => Tag;
export declare const Body: (...args: TagEntriesAfterName[]) => Tag;
