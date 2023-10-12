import { isNumber, hasPercentageSign, hasPixelSign } from './utils'

/**
 * Validating function for verifying prop width and height
 * @param {string|number} value value of prop width or height
 * @return {boolean}
 */
export function validateWidthAndHeight(value) {
    if (isNumber(value)) return value
    return hasPercentageSign(value) || hasPixelSign(value)
        ? value
        : ['auto', 'max-content', 'min-content'].includes(value)
}

/**
 * Validating function for verifying prop using for css properties
 * @param {string|number} value value of prop
 * @return {boolean}
 */
export function validateUnit(value) {
    if (isNumber(value)) return value
    return hasPercentageSign(value) || hasPixelSign(value) ? value : false
}

/**
 * Validating function for verifying prop size
 * @param {string|number} size value of prop size
 * @return {boolean}
 */
export function validateSize(size) {
    return isNumber(size) ? size : ['small', 'normal', 'medium', 'large'].includes(size)
}

/**
 * Validating function for verifying prop shape
 * @param {string} shape
 * @return {boolean}
 */
export function validateShape(shape) {
    return ['round', 'square', 'no-border'].includes(shape)
}

/**
 * Validating function for verifying prop fit
 * @param {string} fit
 * @return {boolean}
 */
export function validateFit(fit) {
    return ['fill', 'cover', 'contain', 'none', 'scale-down'].includes(fit)
}
