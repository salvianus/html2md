#!/usr/bin/env node
/**
 * html2md — a thin, opinionated CLI for converting HTML to Markdown.
 *
 * Reads HTML from stdin, writes Markdown to stdout.
 *
 * Built on turndown (https://github.com/mixmark-io/turndown), with
 * noise-stripping defaults tuned for consuming web pages with language
 * models: script/style/noscript/svg/iframe content is removed rather
 * than dumped into the output.
 *
 * Usage:
 *   curl -s https://example.com | html2md
 *   cat page.html | html2md
 */

import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
});

// Strip elements that produce noise in markdown output.
// Turndown's default behavior dumps their text content as-is,
// which floods the output with JS code, CSS rules, and SVG markup.
turndownService.remove(['script', 'style', 'noscript', 'svg', 'iframe']);

let stdin = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  stdin += chunk;
});

process.stdin.on('end', () => {
  if (!stdin.trim()) {
    console.log('--- empty ---');
    return;
  }
  try {
    console.log(turndownService.turndown(stdin));
  } catch (error) {
    console.error(`html2md: failed to convert HTML to Markdown: ${error.message}`);
    process.exit(1);
  }
});