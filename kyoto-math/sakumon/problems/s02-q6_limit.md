---
set: 2
daimon: 6
field: 数列と極限
title: 一般項が求まらない数列の極限
points: 35
---

# 一般項が求まらない数列の極限(2乗して階差 → 上下から評価 → はさみうち / 想定 35 分 / 難)

狙い: 2015[3](一般項なしで極限)と 2024[6](個数の評価をはさみうちで書き切る)の系統。答の見当は「$a_n^2$ が1回に約 2 増える」ことからつくが、誤差項 $\sum 1/a_k^2$ が $n$ に比べて小さいことを不等式で示すのが本体。誘導なしでは難。このセットの最難で、部分点(下からの評価まで)を拾う練習でもある。

## 問題

数列 $\{a_n\}$ を

$$a_1=1,\qquad a_{n+1}=a_n+\frac{1}{a_n}\quad(n=1,2,3,\cdots)$$

により定める。このとき、極限

$$\lim_{n\to\infty}\frac{a_n}{\sqrt n}$$

を求めよ。

## 解答

### 答

$\sqrt2$

### 解答

$a_1=1>0$ で、$a_n>0$ なら $a_{n+1}=a_n+\dfrac1{a_n}>0$ だから、すべての $n$ で $a_n>0$ である。

漸化式の両辺を2乗すると

$$a_{n+1}^2=a_n^2+2+\frac{1}{a_n^2} .\qquad\cdots(*)$$

**下からの評価。** $(*)$ より $a_{n+1}^2>a_n^2+2$。$a_1^2=1$ と合わせて、すべての $n$ で

$$a_n^2\geqq2n-1 .\qquad\cdots(1)$$

**上からの評価。** $(*)$ を $n=1,2,\cdots,n-1$ について加えると、$n\geqq2$ のとき

$$a_n^2=1+2(n-1)+\sum_{k=1}^{n-1}\frac{1}{a_k^2} .$$

(1) より $\dfrac1{a_k^2}\leqq\dfrac1{2k-1}\leqq\dfrac1k$ であるから

$$a_n^2\leqq2n-1+\sum_{k=1}^{n-1}\frac1k .\qquad\cdots(2)$$

ここで、自然数 $k$ に対して

$$\frac1k\leqq\frac{1}{\sqrt k}\leqq\frac{2}{\sqrt k+\sqrt{k-1}}=2\left(\sqrt k-\sqrt{k-1}\right)$$

が成り立つので

$$\sum_{k=1}^{n-1}\frac1k\leqq2\sum_{k=1}^{n-1}\left(\sqrt k-\sqrt{k-1}\right)=2\sqrt{n-1}<2\sqrt n .$$

(1), (2) と合わせて、$n\geqq2$ のとき

$$2n-1\leqq a_n^2<2n-1+2\sqrt n .$$

各辺を $n$ で割ると

$$2-\frac1n\leqq\frac{a_n^2}{n}<2-\frac1n+\frac{2}{\sqrt n} .$$

$n\to\infty$ のとき両端はともに 2 に収束するから、はさみうちの原理より $\displaystyle\lim_{n\to\infty}\frac{a_n^2}{n}=2$。

$a_n>0$ より $\dfrac{a_n}{\sqrt n}=\sqrt{\dfrac{a_n^2}{n}}$ であるから

$$\lim_{n\to\infty}\frac{a_n}{\sqrt n}=\sqrt2 .$$

### 補足

- 上からの評価は $\displaystyle\sum_{k=1}^{n-1}\frac1k\leqq1+\int_1^{n}\frac{dx}{x}=1+\log n$ としてもよい。その場合 $\displaystyle\lim_{n\to\infty}\frac{\log n}{n}=0$ を使うので、これを証明なしに使ってよいか迷うなら、上の $\sqrt{\ }$ による評価のほうが安全。
- 数値で確かめると、$n=10^6$ で $\dfrac{a_n}{\sqrt n}\fallingdotseq1.414216$。

### 採点で見るところ

- 2乗して $(*)$ を作り、(1) まで書けていれば部分点が見込める。ここまでは「標準」の範囲なので、本番で時間がなくても必ず書く。
- $\dfrac{1}{a_n^2}\to0$ だから $a_{n+1}^2-a_n^2\to2$、よって $\dfrac{a_n^2}{n}\to2$、という答案は論証になっていない(階差が収束すれば平均も収束する、という事実は高校範囲では証明なしに使えない)。和を具体的に上から押さえること。
- 最後に平方根をとるとき、$a_n>0$ に触れる。
