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

const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
});

turndownService.remove(['script', 'style', 'noscript', 'svg', 'iframe']);

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