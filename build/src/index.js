"use strict";
const objectEntries_1 = require("./objectEntries");
function twiml(...tags) {
    return '<?xml version="1.0" encoding="UTF-8"?>' +
        '<Response>' + tags.map(tagToString).join('') + '</Response>';
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = twiml;
exports.Say = (...args) => ['Say', ...args];
exports.Play = (...args) => ['Play', ...args];
exports.Pause = (...args) => ['Pause', ...args];
exports.Gather = (...args) => ['Gather', ...args];
exports.Record = (...args) => ['Record', ...args];
exports.Dial = (...args) => ['Dial', ...args];
exports.Number = (...args) => ['Number', ...args];
exports.Client = (...args) => ['Client', ...args];
exports.Conference = (...args) => ['Conference', ...args];
exports.Sip = (...args) => ['Sip', ...args];
exports.Queue = (...args) => ['Queue', ...args];
exports.Enqueue = (...args) => ['Enqueue', ...args];
exports.Task = (...args) => ['Task', ...args];
exports.Leave = (...args) => ['Leave', ...args];
exports.Hangup = (...args) => ['Hangup', ...args];
exports.Redirect = (...args) => ['Redirect', ...args];
exports.Reject = (...args) => ['Reject', ...args];
exports.Sms = (...args) => ['Sms', ...args];
exports.Message = (...args) => ['Message', ...args];
exports.Media = (...args) => ['Media', ...args];
exports.Body = (...args) => ['Body', ...args];
function esc(str) {
    return String(str).replace(/&/g, '&amp;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&apos;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
function isPlainObject(it) {
    return typeof it === "object" && !Array.isArray(it);
}
function tagToString(tag) {
    const [tagName, ...attrsOrContents] = tag, [attrs, contents] = isPlainObject(attrsOrContents[0]) ?
        [attrsOrContents[0], attrsOrContents.slice(1)] :
        [{}, attrsOrContents];
    const attrStrings = objectEntries_1.default(attrs).map((attr) => " " + attr[0] + '="' + esc(attr[1]) + '"'), formattedTagName = tagName.substr(0, 1).toUpperCase() + tagName.substr(1);
    return ("<" + formattedTagName + attrStrings.join('') + ">" +
        contents.map((child) => Array.isArray(child) ? tagToString(child) : esc(child)).join("") +
        "</" + formattedTagName + ">");
}
