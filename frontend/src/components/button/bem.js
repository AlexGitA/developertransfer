/**
 * This is a hleper class for Block-Element-Modifier methodology.
 */

// Import dependencies
import createBemHelper from "bero";

// Exported BEM helpers for styling
/**
 * BEM helper for the Call-To-Action wrapper.
 * Prepends the namespace 'MENT-links-wrapper' to class names.
 */
const bemWrapper = createBemHelper('MENT-links-wrapper');
const _bemWrapper = bemWrapper;
export {_bemWrapper as bemWrapper};

/**
 * BEM helper for the Call-To-Action component.
 * Prepends the namespace 'MENT-links' to class names.
 */
const bemCta = createBemHelper('MENT-links');
const _bemCta = bemCta;
export {_bemCta as bemCta};
