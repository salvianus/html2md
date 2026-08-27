# html2md

A thin, opinionated CLI and library for converting HTML to Markdown — built on [turndown](https://github.com/mixmark-io/turndown).

## Why

Most HTML→Markdown converters either carry heavy dependency trees or dump everything — `<script>` bodies, CSS rules, SVG markup — straight into the output. That's fine for humans; it's terrible for language models, where such noise floods the context window.

`html2md` applies noise-stripping defaults tuned for LLM consumption: `script`, `style`, `noscript`, `svg` and `iframe` content is removed before conversion. What remains is the page's actual content, as clean Markdown.

## Install

```sh
npm install @salvianus/html2md
```

Or use the CLI directly from a clone:

```sh
git clone https://github.com/salvianus/html2md.git
export PATH="$PATH:$(pwd)/html2md/bin"
```

## CLI usage

Reads HTML from stdin, writes Markdown to stdout:

```sh
curl -s https://example.com | html2md
cat page.html | html2md
```

Empty input produces `--- empty ---` rather than an error, so pipelines don't break on pages that return nothing.

## Library usage

```js
import html2md from '@salvianus/html2md';

const md = html2md('<h1>Title</h1><p>Hello <a href="https://example.com">world</a></p>');
// # Title
// Hello [world](https://example.com)
```

## Design notes

- **One dependency.** `turndown` — 11.4k stars, MIT, actively maintained, with a single transitive dependency (`@mixmark-io/domino`, a pure-JS HTML parser with zero dependencies of its own).
- **No configuration surface (yet).** The turndown options are fixed: ATX headings, `-` bullets, fenced code blocks. If you need different output, fork it or use turndown directly.
- **stdin/stdout only.** No file arguments, no URLs — compose it with `curl`, `wget`, or whatever fetches the HTML.

## License

MIT — see [LICENSE](LICENSE).