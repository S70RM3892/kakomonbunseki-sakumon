// problems/*.md から PDF を作る。
//   node build-pdf.mjs
// 出力:
//   pdf/NNセット/問題/NNセット_大問K_分野_問題.pdf(京大数学の問題冊子の体裁: 枠つき番号、右肩に配点)
//   pdf/NNセット/回答/NNセット_大問K_分野_回答.pdf
//   pdf/NNセット/問題/NNセット_全問_問題.pdf、pdf/NNセット/回答/NNセット_全問_回答.pdf(6 題まとめ)
// 各 md の先頭に front matter(set, daimon, field, title, points)が必要。
// 「## 問題」〜「## 解答」を問題 PDF、「## 解答」以降を解答 PDF にする(「狙い」などの前置きは問題 PDF に入れない)。
//
// 問題 PDF は京大の問題冊子の体裁に寄せる。md 側の書き方:
//   [ ア ]                 → 枠つきの空欄(枠内はゴシック太字)
//   { サ: ①…,②…,③… }  → 選択肢つきの空欄 {サ:①…,②…,③…}
//   段落の先頭が (i) (ii) … → 問の中の枝問(ぶら下げ字下げ)
//   <u>…</u>               → 下線部
//   段落の先頭が **問1**    → 問 1(ぶら下げ字下げ)
//   ![図1](figures/x.svg)  → 図と、その下のキャプション「図1」
//   数式は $...$ / $$...$$(LaTeX 記法)。MathML で組む
// 必要なもの: pandoc、playwright(Chromium)、フォント IPAex明朝・IPAexゴシック・Latin Modern
//   (Ubuntu なら apt-get install fonts-ipaexfont fonts-lmodern)。
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
const gothic = '"IPAexGothic", "IPAGothic", sans-serif';
const mincho = '"Latin Modern Roman", "IPAexMincho", "IPAMincho", "Noto Serif CJK JP", serif';

const baseCss = `
body { font-family: ${mincho}; margin: 0; }
math { font-family: "Latin Modern Math", "STIX Math", math; font-size: 1.08em; }
math[display="block"] { margin: 0.5em 0; }
strong, h1, h2, th { font-family: ${gothic}; }
.box { display: inline-block; border: 1.2px solid #000; min-width: 3.4em; text-align: center; line-height: 1.45;
  margin: 0 0.3em; padding: 0 0.3em; font-family: ${gothic}; font-weight: bold; font-size: 0.95em; text-indent: 0; }
.sel { font-family: ${gothic}; font-weight: bold; }
`;

// 問題冊子の体裁
const examCss = `
@page { size: A4; margin: 26mm 28mm 26mm 30mm; }
body { font-size: 11.5pt; line-height: 2.1; text-align: justify; }
.title { position: relative; text-align: center; font-family: ${gothic}; font-weight: bold; font-size: 19pt; letter-spacing: 4.2em; text-indent: 4.2em; margin: 8mm 0 7mm; }
.title .pts { position: absolute; right: 0; bottom: 0.2em; font-family: ${mincho}; font-weight: normal; font-size: 10.5pt; letter-spacing: 0; text-indent: 0; }
h1 { font-size: 14.5pt; margin: 6mm 0 5mm; display: flex; justify-content: space-between; align-items: center; }
h1 .no { display: inline-block; border: 1.6px solid #000; width: 1.7em; line-height: 1.7em; text-align: center; font-family: "IPAexGothic", sans-serif; }
h1 .pts { font-family: "Latin Modern Roman", "IPAexMincho", serif; font-weight: normal; font-size: 11pt; }
h1 .num { font-family: ${mincho}; font-weight: bold; margin-left: 1.2em; font-size: 1.1em; }
p { margin: 0; }
.content { padding-left: 0.9em; }
.intro { text-indent: 1em; margin-left: -0.9em; }
figure { margin-left: -0.9em; }
.sec { margin-top: 2.05em; padding-left: 3em; text-indent: -3em; }
.cont { padding-left: 3em; text-indent: 1em; }
.toi { margin-top: 2.05em; margin-left: -0.9em; padding-left: 3.9em; text-indent: -3.9em; break-inside: avoid; }
.toi > strong:first-child { display: inline-block; width: 3.9em; text-indent: 0; }
.sec > strong:first-child { font-family: ${mincho}; font-weight: normal; margin-right: 1em; }
.math { padding-left: 3em; text-indent: 0; }
figure { margin: 1.2em 0 1.4em; text-align: center; break-inside: avoid; }
figure img { display: block; margin: 0 auto; max-width: 92%; }
.sub { padding-left: 5.4em; text-indent: -2.4em; }
.sub.first { margin-top: 0; }
table { border-collapse: collapse; margin: 0.8em auto 1em; line-height: 1.6; font-size: 10.5pt; }
th, td { border: 1px solid #000; padding: 3px 14px; text-align: center; }
th { font-weight: normal; font-family: inherit; }
caption { font-family: "IPAexGothic", sans-serif; font-weight: bold; font-size: 10pt; margin-bottom: 0.3em; }
figcaption { font-family: ${gothic}; font-weight: bold; font-size: 10pt; line-height: 1.6; margin-top: 0.3em; }
`;

// 解答・解説の体裁(本番には存在しないので、読みやすさ優先)
const answerCss = `
@page { size: A4; margin: 18mm 16mm 20mm; }
body { font-size: 10.5pt; line-height: 1.9; text-align: justify; }
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

function mdToHtml(markdown) {
  return execFileSync('pandoc', ['-f', 'gfm+tex_math_dollars', '-t', 'html', '--mathml', '--wrap=none'], { input: markdown, encoding: 'utf8' })
    .replace(/<annotation[\s\S]*?<\/annotation>/g, '')
    // 単項のマイナスのまわりに余分な空きが入らないようにする
    .replace(/(<mrow>|<mo[^>]*>[=(<>≦≧≒]<\/mo>)<mo>−<\/mo>/g, '$1<mo form="prefix" lspace="0" rspace="0">−</mo>')
    .replace(/<mi>Δ<\/mi>/g, '<mi mathvariant="normal">Δ</mi>')
    .replace(/<math /g, '<math lang="en" ')
    .replace(/\{ ([^:{}<]{1,2}): ([\s\S]*?) \}/g, '{<span class="sel">$1</span>:$2}')
    .replace(/\{ \}/g, '{　　　}')
    .replace(/\[ ([^\[\]<>]{1,3}) \]/g, '<span class="box">$1</span>')
    .replace(/\[ \]/g, '<span class="box">&nbsp;</span>');
}

function page(css, inner) {
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><base href="file://${src}/"><style>${baseCss}${css}</style></head><body>${inner}</body></html>`;
}

// ブラウザ内で実行: 段落を 小問/続き/問/図 に分類し、括弧の伸縮を調整する
function arrange(isExam) {
  for (const mo of document.querySelectorAll('mo[stretchy="true"]')) {
    // 分数を含まない括弧は伸縮させない(伸縮させると左右に余分な空きが出る)
    if (!mo.parentElement.querySelector('mfrac')) mo.setAttribute('stretchy', 'false');
  }
  if (!isExam) return;
  for (const block of document.querySelectorAll('.content')) {
  let state = 'intro';
  for (const p of [...block.querySelectorAll(':scope > p')]) {
    const img = p.children.length === 1 && p.firstElementChild.tagName === 'IMG' ? p.firstElementChild : null;
    if (img) {
      const fig = document.createElement('figure');
      const cap = document.createElement('figcaption');
      cap.textContent = img.alt.replace(/^図(\d)/, '図 $1');
      p.replaceWith(fig);
      fig.append(img, cap);
      continue;
    }
    const first = p.firstChild;
    const head = first && first.nodeName === 'STRONG' ? first.textContent : '';
    if (/^\(\d\)$/.test(head)) {
      first.textContent = `(${'０１２３４５６７８９'[head[1]]})`;
      p.className = 'sec';
      state = 'body';
    } else if (/^問\d$/.test(head)) {
      first.textContent = `問 ${head[1]}`;
      p.className = 'toi';
      state = 'body';
    } else if (/^\((i|ii|iii|iv|v)\)/.test(p.textContent)) {
      p.className = 'sub';
    } else if (p.children.length === 1 && p.firstElementChild.matches('math[display="block"]') && !p.textContent.replace(p.firstElementChild.textContent, '').trim()) {
      p.className = 'math';
    } else {
      p.className = state === 'intro' ? 'intro' : 'cont';
    }
  }
  }
  // 本文中で小問を指す (1) などは太字にしない
  for (const st of document.querySelectorAll('.content p:not(.sec) > strong')) {
    if (/^\(\d\)$/.test(st.textContent)) st.replaceWith(`(${st.textContent[1]})`);
  }
  // 数式の直後に続く「を用いてよい。…」のような段落は字下げしない
  for (const p of document.querySelectorAll('.content > p.math + p.cont')) p.style.textIndent = '0';
}

fs.rmSync(out, { recursive: true, force: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sakumon-'));
const browser = await chromium.launch();
const tab = await browser.newPage();
const sets = {};
for (const name of fs.readdirSync(src).filter(f => f.endsWith('.md')).sort()) {
  const { meta, question, answer } = parse(path.join(src, name));
  const setNo = String(meta.set).padStart(2, '0');
  const set = `セット${setNo}`;
  const dai = `大問${meta.daimon}`;
  (sets[setNo] ??= []).push({ meta, question, answer });
  for (const kind of ['問題', '解答']) {
    const isExam = kind === '問題';
    const html = isExam
      ? page(examCss, `<h1><span class="no">${meta.daimon}</span><span class="pts">(${meta.points} 点)</span></h1><div class="content">${mdToHtml(question)}</div>`)
      : page(answerCss, `<div class="meta">${set} 数学(理系) ${dai}(${meta.field}・${meta.points} 点)</div>
          <h1>${dai} 解答・解説(${meta.title})</h1>${mdToHtml(answer)}`);
    const htmlFile = path.join(tmp, 'p.html');
    fs.writeFileSync(htmlFile, html);
    await tab.goto(`file://${htmlFile}`);
    await tab.evaluate(arrange, isExam);
    const folder = isExam ? '問題' : '回答';
    const dest = path.join(out, `${setNo}セット`, folder, `${setNo}セット_${dai}_${meta.field}_${folder}.pdf`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    await tab.pdf({
      path: dest,
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `<div style="width:100%; font-size:10.5pt; font-family:serif; position:relative; text-align:center; padding-bottom:6mm;">
        ― <span class="pageNumber"></span> ―
        <span style="position:absolute; right:22mm; font-size:8pt;">◇${set}(${meta.daimon})</span></div>`,
    });
    console.log(path.relative(here, dest));
  }
}
// セットごとに、6 題を 1 つにまとめた PDF も作る(問題は本番の冊子と同じく 2 ページ)
const allCss = `
body { line-height: 1.95; }
.prob { break-inside: avoid; margin-bottom: 16mm; }
.prob:nth-of-type(4) { break-before: page; }
.prob h1 { margin: 0 0 3mm; }
.toi, .sec { margin-top: 1.1em; }
.end { text-align: center; font-family: ${gothic}; font-weight: bold; font-size: 13pt; margin-top: 10mm; }
`;
for (const [setNo, items] of Object.entries(sets)) {
  items.sort((a, b) => a.meta.daimon - b.meta.daimon);
  for (const isExam of [true, false]) {
    const html = isExam
      ? page(examCss + allCss, items.map(({ meta, question }) =>
          `<div class="prob"><h1><span class="no">${meta.daimon}</span><span class="pts">(${meta.points} 点)</span></h1><div class="content">${mdToHtml(question)}</div></div>`).join('')
          + '<div class="end">問題は,このページで終わりである。</div>')
      : page(answerCss, items.map(({ meta, answer }, i) =>
          `<div style="${i ? 'break-before: page;' : ''}"><div class="meta">セット${setNo} 数学(理系) 大問${meta.daimon}(${meta.field}・${meta.points} 点)</div>
          <h1>大問${meta.daimon} 解答・解説(${meta.title})</h1>${mdToHtml(answer)}</div>`).join(''));
    const htmlFile = path.join(tmp, 'all.html');
    fs.writeFileSync(htmlFile, html);
    await tab.goto(`file://${htmlFile}`);
    await tab.evaluate(arrange, isExam);
    const folder = isExam ? '問題' : '回答';
    const dest = path.join(out, `${setNo}セット`, folder, `${setNo}セット_全問_${folder}.pdf`);
    await tab.pdf({
      path: dest, preferCSSPageSize: true, printBackground: true, displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `<div style="width:100%; font-size:10.5pt; font-family:serif; position:relative; text-align:center; padding-bottom:6mm;">
        ― <span class="pageNumber"></span> ―
        <span style="position:absolute; right:22mm; font-size:8pt;">◇セット${setNo}</span></div>`,
    });
    console.log(path.relative(here, dest));
  }
}
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
