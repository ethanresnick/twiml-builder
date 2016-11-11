export declare type TagName = 'Say' | 'Play' | 'Pause' | 'Gather' | 'Record' | 'Dial' | 'Number' | 'Client' | 'Conference' | 'Sip' | 'Queue' | 'Enqueue' | 'Task' | 'Leave' | 'Hangup' | 'Redirect' | 'Reject' | 'Sms' | 'Message' | 'Media' | 'Body';
export declare type TagAttributes = {
    [attrName: string]: string | number | boolean;
};
export declare type TagContent = string | number | Tag;
export declare type Tag = [TagName] | TagNoAttributes | TagWithAttributes;
export interface TagNoAttributes extends Array<TagContent> {
    0: TagName;
    1: TagContent;
}
export interface TagWithAttributes extends Array<TagContent | TagAttributes> {
    0: TagName;
    1: TagAttributes;
    2?: TagContent;
}
export default function twiml(...tags: Tag[]): string;
