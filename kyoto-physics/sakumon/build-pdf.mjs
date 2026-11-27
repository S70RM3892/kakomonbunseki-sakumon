// problems/*.md から PDF を作る。
//   node build-pdf.mjs
// 出力:
//   pdf/セット別/セットNN/セットNN_大問K_分野_{問題|解答}.pdf   … セット順に並ぶ
//   pdf/大問別/大問K/大問K_セットNN_分野_{問題|解答}.pdf       … 大問ごとに並ぶ
// 各 md の先頭に front matter(set, daimon, field, title)が必要。
// 「## 解答」より前を問題 PDF、以降を解答 PDF にする(「狙い」などの前置きは問題 PDF に入れない)。
// 本文中の [ ア ] は枠つきの空欄に変換する。数式は $...$(LaTeX 記法)で書き、MathML で組む。
// 必要なもの: pandoc、playwright(Chromium)、フォント IPAex明朝 と Latin Modern Math
//   (Ubuntu なら apt-get install fonts-ipaexfont-mincho fonts-lmodern)。
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(here, 'problems');
const out = path.join(here, 'pdf');
const roman = ['', 'I', 'II', 'III', 'IV'];

const css = `
@page { size: A4; margin: 18mm 16mm; }
body { font-family: "Latin Modern Roman", "IPAexMincho", "IPAMincho", "Noto Serif CJK JP", serif; font-size: 10.5pt; line-height: 1.9; text-align: justify; }
math { font-family: "Latin Modern Math", "STIX Math", math; font-size: 1.08em; }
math[display="block"] { margin: 0.6em 0; }
strong, h1, h2, th { font-family: "IPAexGothic", "IPAGothic", sans-serif; }
.box { display: inline-block; border: 1px solid #000; min-width: 3.2em; text-align: center; line-height: 1.35; margin: 0 0.25em; padding: 0 0.3em; font-family: "IPAexGothic", "IPAGothic", sans-serif; font-size: 0.95em; }
h1 { font-size: 13pt; border-bottom: 1px solid #000; padding-bottom: 4px; }
h2 { font-size: 11.5pt; margin-top: 1.4em; }
.meta { font-size: 9pt; text-align: right; }
img { display: block; margin: 8px auto; max-width: 70%; }
table { border-collapse: collapse; margin: 8px 0; }
th, td { border: 1px solid #000; padding: 5px 12px; }
tr { break-inside: avoid; }
code { font-family: inherit; }
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
  return { meta, question: body.slice(q, a).replace('\n## 問題', ''), answer: body.slice(a) };
}

function toHtml(markdown, heading, meta) {
  const html = execFileSync('pandoc', ['-f', 'gfm+tex_math_dollars', '-t', 'html', '--mathml', '--wrap=none'], { input: markdown, encoding: 'utf8' })
    // 単項のマイナスと括弧のまわりに余分な空きが入らないようにする
    .replace(/(<mrow>|<mo[^>]*>[=(<>≦≧≒]<\/mo>)<mo>−<\/mo>/g, '$1<mo form="prefix" lspace="0" rspace="0">−</mo>')
    .replace(/<mo stretchy="(true|false)" form="(prefix|postfix)">/g, '<mo stretchy="$1" form="$2" lspace="0" rspace="0">')
    .replace(/<math /g, '<math lang="en" ')
    .replace(/\[ ([^\[\]<>]{1,3}) \]/g, '<span class="box">$1</span>')
    .replace(/\[ \]/g, '<span class="box">&nbsp;</span>');
  const label = `セット${String(meta.set).padStart(2, '0')} 物理 大問${roman[meta.daimon]}(${meta.field})`;
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><base href="file://${src}/"><style>${css}</style></head>
<body><div class="meta">${label}</div><h1>${heading}</h1>${html}</body></html>`;
}

fs.rmSync(out, { recursive: true, force: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sakumon-'));
const browser = await chromium.launch();
const page = await browser.newPage();
for (const name of fs.readdirSync(src).filter(f => f.endsWith('.md')).sort()) {
  const { meta, question, answer } = parse(path.join(src, name));
  const set = `セット${String(meta.set).padStart(2, '0')}`;
  const dai = `大問${meta.daimon}`;
  for (const [kind, md] of [['問題', question], ['解答', answer]]) {
    const heading = kind === '問題' ? `物理 問題 ${roman[meta.daimon]}` : `物理 問題 ${roman[meta.daimon]} 解答・解説(${meta.title})`;
    const htmlFile = path.join(tmp, 'p.html');
    fs.writeFileSync(htmlFile, toHtml(md, heading, meta));
    await page.goto(`file://${htmlFile}`);
    // 分数を含まない括弧は伸縮させない(伸縮させると左右に余分な空きが出る)
    await page.evaluate(() => {
      for (const mo of document.querySelectorAll('mo[stretchy="true"]')) {
        if (!mo.parentElement.querySelector('mfrac')) mo.setAttribute('stretchy', 'false');
      }
    });
    const bySet = path.join(out, 'セット別', set, `${set}_${dai}_${meta.field}_${kind}.pdf`);
    const byDai = path.join(out, '大問別', dai, `${dai}_${set}_${meta.field}_${kind}.pdf`);
    fs.mkdirSync(path.dirname(bySet), { recursive: true });
    fs.mkdirSync(path.dirname(byDai), { recursive: true });
    await page.pdf({ path: bySet, format: 'A4', printBackground: true });
    fs.copyFileSync(bySet, byDai);
    console.log(path.relative(here, bySet));
  }
}
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
