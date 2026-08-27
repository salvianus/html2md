import { test } from 'node:test';
import assert from 'node:assert';
import html2md from '../lib/index.js';

test('converts basic headings, paragraphs and links', () => {
  const md = html2md('<h1>Title</h1><p>Hello <a href="https://example.com">world</a></p>');
  assert.match(md, /# Title/);
  assert.match(md, /Hello \[world\]\(https:\/\/example\.com\)/);
});

test('strips script, style, noscript, svg and iframe noise', () => {
  const md = html2md(`
    <html><head><style>.x { color: red; }</style></head>
    <body>
      <script>var evil = "function() {}";</script>
      <noscript>noscript fallback noise</noscript>
      <svg><circle r="1"/></svg>
      <iframe src="https://ads.example.com"></iframe>
      <p>real content</p>
    </body></html>`);
  assert.ok(!md.includes('red'), 'style leaked');
  assert.ok(!md.includes('noscript fallback'), 'noscript leaked');
  assert.ok(!md.includes('ads.example.com'), 'iframe leaked');
  assert.ok(!md.includes('script'), 'script leaked');
  assert.match(md, /real content/);
});

test('empty input yields placeholder, not an error', () => {
  assert.strictEqual(html2md(''), '--- empty ---');
  assert.strictEqual(html2md('   \n  '), '--- empty ---');
});

test('non-string input throws TypeError', () => {
  assert.throws(() => html2md(null), TypeError);
  assert.throws(() => html2md(42), TypeError);
});

test('fenced code blocks', () => {
  const md = html2md('<pre><code>const x = 1;</code></pre>');
  assert.match(md, /```/);
  assert.match(md, /const x = 1;/);
});

test('ATX headings and dash bullets', () => {
  const md = html2md('<h2>Sub</h2><ul><li>a</li><li>b</li></ul>');
  assert.match(md, /^## Sub/m);
  // turndown emits '-   a' (three spaces); accept any dash-bullet form
  assert.match(md, /^-\s+a$/m);
  assert.match(md, /^-\s+b$/m);
});