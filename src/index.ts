import objectEntries from "./objectEntries";

export type TagName =
  'Say' | 'Play' | 'Pause' | 'Gather' | 'Record' | 'Dial' | 'Number' |
  'Client' | 'Conference'| 'Sip' | 'Queue' | 'Enqueue' | 'Task' | 'Leave' |
  'Hangup' | 'Redirect' | 'Reject' | 'Sms' | 'Message' | 'Media' | 'Body';

export type TagAttributes = {[attrName: string]: string | number | boolean };

export type TagContent = string | number | Tag;

export type Tag = [TagName] | TagNoAttributes | TagWithAttributes;

// We need to introduce these interfaces below to describe our Tag lists
// because:
//   1) typescript doesn't currently allow type alias definitions
//      to make circular references to themselves (which we'd be doing, since a
//      Tag references a TagContent which in Turn represents a Tag), but
//      interfaces do allow this circularity.
//
//   2) more imporantly, though, we want our Tags to be able to contain an
//      unlimited number of TagContent entries as their final elements, while
//      still constraining their first element to be a tag name (and maybe
//      constraining their second element too). But the only way to have the
//      element-level type constraints of tuple types with the arbitrary length
//      of arrays is to do something like the below. (We need the unlimited
//      number of TagContent entries to allow one tag to contain a list of tags
//      as children to it but siblings to each other.)
//
export interface TagNoAttributes extends Array<TagContent> {
  0: TagName,
  1: TagContent
}

export interface TagWithAttributes extends Array<TagContent|TagAttributes> {
  0: TagName,
  1: TagAttributes,
  2?: TagContent
}

export default function twiml(...tags: Tag[]) {
  return '<?xml version="1.0" encoding="UTF-8"?>' +
    '<Response>' + tags.map(tagToString).join('') + '</Response>';
}

// It's annoying that the below is so not DRY, but that's how it has to be, b/c
// typescript exports, which follow the ES6 design, must be declared statically.
export const Say =        (...args: (TagContent|TagAttributes)[]) => <Tag>['Say', ...args]
export const Play =       (...args: (TagContent|TagAttributes)[]) => <Tag>['Play', ...args]
export const Pause =      (...args: (TagContent|TagAttributes)[]) => <Tag>['Pause', ...args]
export const Gather =     (...args: (TagContent|TagAttributes)[]) => <Tag>['Gather', ...args]
export const Record =     (...args: (TagContent|TagAttributes)[]) => <Tag>['Record', ...args]
export const Dial =       (...args: (TagContent|TagAttributes)[]) => <Tag>['Dial', ...args]
export const Number =     (...args: (TagContent|TagAttributes)[]) => <Tag>['Number', ...args] //tslint:disable-line
export const Client =     (...args: (TagContent|TagAttributes)[]) => <Tag>['Client', ...args]
export const Conference = (...args: (TagContent|TagAttributes)[]) => <Tag>['Conference', ...args]
export const Sip =        (...args: (TagContent|TagAttributes)[]) => <Tag>['Sip', ...args]
export const Queue =      (...args: (TagContent|TagAttributes)[]) => <Tag>['Queue', ...args]
export const Enqueue =    (...args: (TagContent|TagAttributes)[]) => <Tag>['Enqueue', ...args]
export const Task =       (...args: (TagContent|TagAttributes)[]) => <Tag>['Task', ...args]
export const Leave =      (...args: (TagContent|TagAttributes)[]) => <Tag>['Leave', ...args]
export const Hangup =     (...args: (TagContent|TagAttributes)[]) => <Tag>['Hangup', ...args]
export const Redirect =   (...args: (TagContent|TagAttributes)[]) => <Tag>['Redirect', ...args]
export const Reject =     (...args: (TagContent|TagAttributes)[]) => <Tag>['Reject', ...args]
export const Sms =        (...args: (TagContent|TagAttributes)[]) => <Tag>['Sms', ...args]
export const Message =    (...args: (TagContent|TagAttributes)[]) => <Tag>['Message', ...args]
export const Media =      (...args: (TagContent|TagAttributes)[]) => <Tag>['Media', ...args]
export const Body =       (...args: (TagContent|TagAttributes)[]) => <Tag>['Body', ...args]




// Escape XML entites in a given string
function esc(str: any) {
  return String(str).replace(/&/g, '&amp;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function isPlainObject(it: any) {
  return typeof it === "object" && !Array.isArray(it);
}

function tagToString(tag: Tag): string {
  const [tagName, ...attrsOrContents] = tag,
        [attrs, contents] = isPlainObject(attrsOrContents[0]) ?
          [<TagAttributes>attrsOrContents[0], attrsOrContents.slice(1)] :
          [<TagAttributes>{}, attrsOrContents];

  const attrStrings = objectEntries(attrs).map((attr) => " " + attr[0] + '="' + esc(attr[1]) + '"'),
        formattedTagName = tagName.substr(0, 1).toUpperCase() + tagName.substr(1);

  return (
    "<" + formattedTagName + attrStrings.join('') + ">" +
      contents.map((child) =>
        Array.isArray(child) ? tagToString(child) : esc(child)
      ).join("") +
    "</" + formattedTagName + ">"
  );
}
