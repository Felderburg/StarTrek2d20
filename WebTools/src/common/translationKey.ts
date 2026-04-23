export const makeKey = (prefix: string, ...keys: string[]) => {
    let options = keys.map(key => {
        let middle = key.substring(0, 1).toLowerCase() + key.substring(1);
        if (key.toLocaleUpperCase() === key) {
            middle = key.toLocaleLowerCase();
        }
        return middle;
    }).join("");
    return prefix + options;
}