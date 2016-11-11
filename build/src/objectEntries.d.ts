export default function entries<T>(O: {
    [key: string]: T;
}): [string, T][];
