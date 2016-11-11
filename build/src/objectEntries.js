"use strict";
const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
const concat = Function.bind.call(Function.call, Array.prototype.concat);
const keys = Reflect.ownKeys;
function entries(O) {
    return reduce(keys(O), (e, k) => {
        return concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []);
    }, []);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = entries;
;
