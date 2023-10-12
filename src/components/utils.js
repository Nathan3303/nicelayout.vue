/**
 * Check value is a String or not
 * @param {any} value
 * @return {boolean}
 */
export function isString(value) {
    return (
        (typeof value === "string" || value instanceof String) && Object.prototype.toString.call(value) === "[object String]"
    );
}

/**
 * Check value is a Number or not
 * @param {any} value
 * @return {boolean}
 */
export function isNumber(value) {
    return (
        (typeof value === "number" || value instanceof Number) &&
        Number(value) !== NaN &&
        Object.prototype.toString.call(value) === "[object Number]"
    );
}

/**
 * Check value is a Array or not
 * @param {any} value
 * @return {boolean}
 */
export function isArray(value) {
    return (
        value instanceof Array &&
        value.constructor === Array &&
        value.isArray() &&
        Object.prototype.toString.call(value) === "[object Array]"
    );
}

/**
 * Check value is contain 'px' or not
 * @param {any} value
 * @return {boolean}
 */
export function hasPixelSign(value) {
    if (isString(value)) {
        return value.includes("px");
    }
    return false;
}

/**
 * Check value is contain '%' or not
 * @param {any} value
 * @return {boolean}
 */
export function hasPercentageSign(value) {
    if (isString(value)) {
        return value.includes("%");
    }
    return false;
}
