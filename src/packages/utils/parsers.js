import { isString, isNumber, isArray } from "./utils";

/**
 * Convert prop size from string type to number type
 * @description parse the preset size string into a real value (small => 24px)
 * @param {String|Number} size
 * @return {string} a css value
 */
export function parseSize(size) {
    let parseResult = null;
    parseResult = isString(size) && { small: 24, normal: 32, medium: 40, large: 48 }[size];
    if (parseResult) size = parseResult;
    return addUnit(size);
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
export function parseTheme(value, prefix = "") {
    let parseResult = [];
    if (isString(value) && value !== "") {
        parseResult.push(prefix + "--" + value);
    } else if (isArray(value)) {
        value.forEach((item) => isString(item) && item !== "" && parseResult.push(prefix + "--" + item));
    }
    return parseResult;
}

/**
 * Add unit 'px' to the end of number
 * @param {Number} value
 * @return {String} string with unit
 */
export function addUnit(value) {
    return isNumber(value) ? `${value}px` : value;
}
