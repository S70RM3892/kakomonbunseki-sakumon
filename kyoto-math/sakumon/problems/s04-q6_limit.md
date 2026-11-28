---
set: 4
daimon: 6
field: 数列と極限
title: 3乗して挟む極限
points: 35
---

# 3 乗して挟む極限(3 乗の階差 → 下から評価 → 上から評価 → はさみうち / 想定 35 分 / やや難)

狙い: 02セット[6]($a_{n+1}=a_n+\dfrac1{a_n}$)と同じ道具を、指数を変え、(1) の誘導をつけて問い直す。答の見当($a_n^3$ が1回に約 3 増える)から、誤差の和が $n$ に比べて小さいことを不等式で示すのが本体。「式で挟む」を自力で書き切る練習で、標準的な年の[6]の水準。

## 問題

数列 $\{a_n\}$ を

$$a_1=1,\qquad a_{n+1}=a_n+\frac{1}{a_n^{\,2}}\quad(n=1,2,3,\cdots)$$

により定める。

**(1)** すべての自然数 $n$ に対して $a_n^{\,3}\geqq3n-2$ が成り立つことを示せ。

**(2)** 極限 $\lim\limits_{n\to\infty}\dfrac{a_n}{\sqrt[3]{n}}$ を求めよ。

## 解答

### 答

(2) $\sqrt[3]{3}$

### (1)

$a_1=1>0$ で、$a_n>0$ なら $a_{n+1}=a_n+\dfrac1{a_n^{\,2}}>0$ だから、すべての $n$ で $a_n>0$。

漸化式の両辺を3乗すると

$$a_{n+1}^{\,3}=a_n^{\,3}+3+\frac{3}{a_n^{\,3}}+\frac{1}{a_n^{\,6}}\qquad\cdots(*)$$

$a_n>0$ より $a_{n+1}^{\,3}>a_n^{\,3}+3$。$a_1^{\,3}=1=3\cdot1-2$ と合わせて、数学的帰納法により、すべての $n$ で $a_n^{\,3}\geqq3n-2$。(証明終)

### (2)

(1) より $a_n^{\,3}\geqq1$ だから $\dfrac{1}{a_n^{\,6}}\leqq\dfrac{1}{a_n^{\,3}}$。$(*)$ を $1,2,\cdots,n-1$ について加えると、$n\geqq2$ のとき

$$a_n^{\,3}=1+3(n-1)+\sum_{k=1}^{n-1}\left(\frac{3}{a_k^{\,3}}+\frac{1}{a_k^{\,6}}\right)\leqq3n-2+4\sum_{k=1}^{n-1}\frac{1}{a_k^{\,3}} .$$

(1) より $\dfrac{1}{a_k^{\,3}}\leqq\dfrac{1}{3k-2}\leqq\dfrac1k$($3k-2\geqq k$ による)。さらに

$$\frac1k\leqq\frac{1}{\sqrt k}\leqq\frac{2}{\sqrt k+\sqrt{k-1}}=2\left(\sqrt k-\sqrt{k-1}\right)$$

だから

$$\sum_{k=1}^{n-1}\frac{1}{a_k^{\,3}}\leqq2\sum_{k=1}^{n-1}\left(\sqrt k-\sqrt{k-1}\right)=2\sqrt{n-1}<2\sqrt n .$$

(1) と合わせて、$n\geqq2$ のとき

$$3n-2\leqq a_n^{\,3}<3n-2+8\sqrt n .$$

各辺を $n$ で割ると

$$3-\frac2n\leqq\frac{a_n^{\,3}}{n}<3-\frac2n+\frac{8}{\sqrt n} .$$

$n\to\infty$ のとき両端は 3 に収束するから、はさみうちの原理より $\displaystyle\lim_{n\to\infty}\frac{a_n^{\,3}}{n}=3$。

$\dfrac{a_n}{\sqrt[3]{n}}=\sqrt[3]{\dfrac{a_n^{\,3}}{n}}$ で、$\sqrt[3]{x}$ は連続だから

$$\lim_{n\to\infty}\frac{a_n}{\sqrt[3]{n}}=\sqrt[3]{3} .$$

### 検算

$a_2=2$、$a_2^{\,3}=8\geqq4$。$a_3=\dfrac94$、$a_3^{\,3}\fallingdotseq11.4\geqq7$。数値計算では $n=10^6$ で $\dfrac{a_n^{\,3}}{n}\fallingdotseq3.00001$。

### 採点で見るところ

- (1): 3乗の展開を正しく書き、余りの項が正であることから不等式を出す。帰納法の形にまとめる。
- (2): 和 $\displaystyle\sum\frac{1}{a_k^{\,3}}$ を具体的な式で上から押さえているか。「$\dfrac{1}{a_n^{\,3}}\to0$ だから増分は 3 に近づき、よって $\dfrac{a_n^{\,3}}{n}\to3$」は論証にならない。
- 上からの評価は $\displaystyle\sum_{k=1}^{n-1}\frac1k\leqq1+\log n$ でもよい。その場合は $\dfrac{\log n}{n}\to0$ を使うことになる。
- (1) だけでも部分点になる。(2) は下からの評価 $3-\dfrac2n$ まで書けば、さらに部分点が見込める。
