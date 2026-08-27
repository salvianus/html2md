/**
 * html2md — library interface.
 *
 * Converts an HTML string to Markdown using turndown with
 * noise-stripping defaults (script/style/noscript/svg/iframe removed).
 *
 * @param {string} html — the HTML to convert
 * @returns {string} markdown
 */
import TurndownService from 'turndown';

// Strip elements that produce noise in markdown output.
// Turndown's default behavior dumps their text content as-is,
// which floods the output with JS code, CSS rules, and SVG markup.
const NOISE_ELEMENTS = ['script', 'style', 'noscript', 'svg', 'iframe'];

const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
});

turndownService.remove(NOISE_ELEMENTS);

export const html2md = (html) => {
  if (typeof html !== 'string') {
    throw new TypeError('html2md expects a string');
  }
  if (!html.trim()) {
    return '--- empty ---';
  }
  return turndownService.turndown(html);
};

export default html2md;