#!/usr/bin/env node
/**
 * html2md — a thin, opinionated CLI for converting HTML to Markdown.
 *
 * Reads HTML from stdin, writes Markdown to stdout.
 *
 * A thin wrapper around the library in lib/index.js — all conversion
 * logic lives there so the CLI and programmatic interfaces cannot drift.
 *
 * Usage:
 *   curl -s https://example.com | html2md
 *   cat page.html | html2md
 */

import html2md from '../lib/index.js';

let stdin = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  stdin += chunk;
});

process.stdin.on('end', () => {
  try {
    console.log(html2md(stdin));
  } catch (error) {
    console.error(`html2md: ${error.message}`);
    process.exit(1);
  }
});