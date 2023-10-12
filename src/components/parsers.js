import { isString, isNumber, isArray } from "./utils";

/**
 * Convert prop size from string type to number type
 * @description Turn preset string into a real value (small => 24px)
 * @param {string|number} size value of prop size
 * @return {string}
 */
export function parseSize(size, isGetRaw = false) {
    if (isString(size)) size = { small: 24, normal: 32, medium: 40, large: 48 }[size];
    return isGetRaw ? size : size + "px";
}

/**
 * Parse CSS property width and height
 * @description Add 'px' when width or height is type of number
 * @param {string|number} value value of prop width or height
 * @return {string}
 */
export function parseWidthAndHeight(value, isGetRaw = false) {
    if (isGetRaw) return parseInt(value);
    return isNumber(value) ? `${value}px` : value;
}

/**
 * Parse theme in props
 * @description Parse theme array to class array
 * @param {Array|String} value value of prop theme
 * @return {Array|String}
 */
export function parseTheme(value, prefix) {
    let parseResult = [];
    if (isString(value)) {
        parseResult = prefix + "--" + value;
    } else if (isArray(value)) {
        value.forEach((item) => {
            if (item instanceof Function) {
                parseResult.push(prefix + "--" + item());
            } else {
                parseResult.push(prefix + "--" + item);
            }
        });
    }
    return result;
}
