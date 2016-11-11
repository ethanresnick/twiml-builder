const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
const concat = Function.bind.call(Function.call, Array.prototype.concat);
const keys = Reflect.ownKeys;

export default function entries<T>(O: { [key: string]: T }): [string, T][] {
  return reduce(keys(O), (e: [string, any][], k: PropertyKey) => {
    return concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : [])
  }, []);
};
