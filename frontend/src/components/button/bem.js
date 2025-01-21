/**
 * This is a hleper class for Block-Element-Modifier methodology.
 */

// Import dependencies
const createBemHelper = require("bero").default;

// Exported BEM helpers for styling
/**
 * BEM helper for the Call-To-Action wrapper.
 * Prepends the namespace 'MENT-links-wrapper' to class names.
 */
const bemWrapper = createBemHelper('MENT-links-wrapper');
exports.bemWrapper = bemWrapper;

/**
 * BEM helper for the Call-To-Action component.
 * Prepends the namespace 'MENT-links' to class names.
 */
const bemCta = createBemHelper('MENT-links');
exports.bemCta = bemCta;
