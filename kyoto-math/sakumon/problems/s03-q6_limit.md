---
set: 3
daimon: 6
field: 極限
title: 階乗を含む極限
points: 40
---

# 階乗を含む極限(積の形に直す → 対数をとる → 区分求積 / 想定 30 分 / やや難)

狙い: 積の $n$ 乗根の極限は「対数をとって和にし、区分求積法に持ち込む」が定石。誘導なしで出すと、階乗を $n$ 個の積に書き直すところと、対数をとるところの2つの初手が必要になる。2016[1]・2018[5] と同じく、極限を既知の形($e$、定積分)に帰着させる問題。このセットで差がつく1題。

## 問題

次の極限を求めよ。

$$\lim_{n\to\infty}\frac1n\left\{\frac{(2n)!}{n!}\right\}^{\frac1n}$$

## 解答

### 答

$\dfrac4e$

### 解答

$$a_n=\frac1n\left\{\frac{(2n)!}{n!}\right\}^{\frac1n}$$

とおく。

$$\frac{(2n)!}{n!}=(n+1)(n+2)\cdots(2n)$$

は $n$ 個の数の積であり、$n=\left(n^n\right)^{\frac1n}$ だから

$$a_n=\left\{\frac{(n+1)(n+2)\cdots(n+n)}{n^n}\right\}^{\frac1n}=\left\{\left(1+\frac1n\right)\left(1+\frac2n\right)\cdots\left(1+\frac nn\right)\right\}^{\frac1n} .$$

$a_n>0$ なので自然対数をとると

$$\log a_n=\frac1n\sum_{k=1}^{n}\log\left(1+\frac kn\right) .$$

$\log(1+x)$ は $0\leqq x\leqq1$ で連続だから、区分求積法により

$$\lim_{n\to\infty}\log a_n=\int_0^1\log(1+x)\,dx .$$

部分積分で

$$\int_0^1\log(1+x)\,dx=\left[(1+x)\log(1+x)\right]_0^1-\int_0^1dx=2\log2-1 .$$

指数関数は連続だから

$$\lim_{n\to\infty}a_n=e^{2\log2-1}=\frac4e .$$

### 検算

$n=1$: $a_1=2$。$n=2$: $a_2=\dfrac12\sqrt{12}\fallingdotseq1.73$。$n=3$: $a_3=\dfrac13\sqrt[3]{120}\fallingdotseq1.64$。減少しながら $\dfrac4e\fallingdotseq1.47$ に近づく様子と合う。

### 採点で見るところ

- $\log a_n$ の極限を求めたあと、「指数関数の連続性」に触れて $a_n$ の極限に戻しているか。$\log a_n\to2\log2-1$ で終えると答になっていない。
- 部分積分で $(1+x)\log(1+x)$ を使うと計算が短い。$x\log(1+x)$ で始めても解けるが、$\dfrac{x}{1+x}$ の積分が1つ増える。
- 階乗を見て手が止まったら、$n=2,3$ で書き下して形を見る。それで $(n+1)\cdots(2n)$ と $n$ 個の積であることが見える。
