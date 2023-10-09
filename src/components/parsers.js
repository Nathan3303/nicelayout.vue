import { isString, isNumber } from './utils'

/**
 * Convert prop size from string type to number type
 * @description Turn preset string into a real value (small => 24px)
 * @param {string|number} size value of prop size
 * @return {string}
 */
export function parseSize(size, isGetRaw = false) {
    if (isString(size)) size = { small: 24, normal: 32, medium: 40, large: 48 }[size]
    return isGetRaw ? size : size + 'px'
}

/**
 * Parse CSS property width and height
 * @description Add 'px' when width or height is type of number
 * @param {string|number} value value of prop width or height
 * @return {string}
 */
export function parseWidthAndHeight(value, isGetRaw = false) {
    if (isGetRaw) return parseInt(value)
    return isNumber(value) ? `${value}px` : value
}