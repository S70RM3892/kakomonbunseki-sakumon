// problems/*.md から PDF を作る。
//   node build-pdf.mjs
// 出力:
//   pdf/NNセット/問題/NNセット_大問K_分野_問題.pdf(京大英語の問題冊子の体裁: ローマ数字の大問番号、右に配点)
//   pdf/NNセット/回答/NNセット_大問K_分野_回答.pdf
// 各 md の先頭に front matter(set, daimon, field, title, points)が必要。
// 「## 問題」〜「## 解答」を問題 PDF、「## 解答」以降を回答 PDF にする(「狙い」は問題 PDF に入れない)。
// md 側の書き方: 「## 問題」直後の最初の段落が設問の指示文。下線部は (1)<u>…</u>。
// 必要なもの: pandoc、playwright(Chromium)、フォント IPAex明朝・IPAexゴシック・Latin Modern
//   (Ubuntu なら apt-get install fonts-ipaexfont fonts-lmodern)。
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(here, 'problems');
const out = path.join(here, 'pdf');
const gothic = '"IPAexGothic", "IPAGothic", sans-serif';
const mincho = '"Latin Modern Roman", "IPAexMincho", "IPAMincho", serif';
const roman = ['', 'Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'];

const examCss = `
@page { size: A4; margin: 24mm 26mm 24mm 26mm; }
body { font-family: ${mincho}; font-size: 12pt; line-height: 2.0; margin: 0; }
.head { display: flex; align-items: baseline; margin-bottom: 1.2em; font-size: 11.5pt; }
.head .no { font-family: ${gothic}; font-weight: bold; font-size: 15pt; margin-right: 1em; }
.head .inst { flex: 1; }
.head .pts { margin-left: 1em; white-space: nowrap; }
p { margin: 0; text-indent: 1.5em; text-align: justify; hyphens: auto; }
u { text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 0.8px; }
`;

const answerCss = `
@page { size: A4; margin: 18mm 16mm 20mm; }
body { font-family: ${mincho}; font-size: 10.5pt; line-height: 1.85; margin: 0; text-align: justify; }
strong, h1, h2, h3, th { font-family: ${gothic}; }
h1 { font-size: 13pt; border-bottom: 1px solid #000; padding-bottom: 4px; }
h2 { font-size: 12pt; margin-top: 1.4em; }
h3 { font-size: 11pt; margin-top: 1.3em; }
.meta { font-size: 9pt; text-align: right; }
table { border-collapse: collapse; margin: 8px 0; width: 100%; }
th, td { border: 1px solid #000; padding: 4px 8px; text-align: left; vertical-align: top; }
tr { break-inside: avoid; }
code { font-family: inherit; }
li { margin: 0.15em 0; }
`;

function parse(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`front matter がない: ${file}`);
  const meta = Object.fromEntries(m[1].split('\n').map(l => l.split(/:\s*/, 2)));
  const body = m[2];
  const q = body.indexOf('\n## 問題');
  const a = body.indexOf('\n## 解答');
  if (q < 0 || a < 0) throw new Error(`「## 問題」「## 解答」がない: ${file}`);
  return { meta, question: body.slice(q, a).replace('\n## 問題', '').trim(), answer: body.slice(a).replace('\n## 解答', '') };
}

const mdToHtml = markdown =>
  execFileSync('pandoc', ['-f', 'gfm', '-t', 'html', '--wrap=none'], { input: markdown, encoding: 'utf8' });

const page = (css, inner) =>
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>${css}</style></head><body>${inner}</body></html>`;

const browser = await chromium.launch();
const tab = await browser.newPage();
for (const name of fs.readdirSync(src).filter(f => f.endsWith('.md')).sort()) {
  const { meta, question, answer } = parse(path.join(src, name));
  const set = `${meta.set}セット`;
  const stem = `${set}_大問${meta.daimon}_${meta.field}`;
  const [inst, ...rest] = question.split(/\n\n+/);
  const exam = page(examCss,
    `<div class="head"><span class="no">${roman[meta.daimon]}</span><span class="inst" lang="ja">${inst}</span><span class="pts" lang="ja">(${meta.points} 点)</span></div>`
    + mdToHtml(rest.join('\n\n')));
  const ans = page(answerCss,
    `<div class="meta">京大英語 作問 ${set} 大問${meta.daimon}(${meta.field})回答</div><h1>${roman[meta.daimon]} ${meta.title}(${meta.points} 点)</h1>`
    + mdToHtml(answer));
  for (const [kind, html] of [['問題', exam], ['回答', ans]]) {
    const dir = path.join(out, set, kind);
    fs.mkdirSync(dir, { recursive: true });
    await tab.setContent(html, { waitUntil: 'load' });
    await tab.pdf({ path: path.join(dir, `${stem}_${kind}.pdf`), preferCSSPageSize: true, printBackground: true });
    console.log(path.join(set, kind, `${stem}_${kind}.pdf`));
  }
}
await browser.close();
