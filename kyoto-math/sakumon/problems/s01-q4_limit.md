---
set: 1
daimon: 4
field: 微分と極限
title: 最大値の極限
points: 30
---

# 最大値の極限(微分で最大 → e の定義 / 想定 20 分 / 易)

狙い: 2016[1]($(1+\cos\theta)\sin^{n-1}\theta$ の最大値 $M_n$ と $\lim (M_n)^n$)の易しい版。$n$ を含む関数の最大値を出し、$e$ の定義に帰着させる。易化年(2021[2] の水準)の微分に相当。

## 問題

$n$ を自然数とする。関数

$$f_n(x)=x^n(1-x^2)$$

の $0\leqq x\leqq 1$ における最大値を $M_n$ とする。

**(1)** $M_n$ を求めよ。

**(2)** 極限 $\lim\limits_{n\to\infty} nM_n$ を求めよ。

## 解答

### 答

- (1) $M_n=\dfrac{2}{n+2}\left(\dfrac{n}{n+2}\right)^{\frac n2}$
- (2) $\dfrac{2}{e}$

### (1)

$f_n(x)=x^n-x^{n+2}$ より

$$f_n'(x)=nx^{n-1}-(n+2)x^{n+1}=x^{n-1}\left\{n-(n+2)x^2\right\} .$$

$\alpha=\sqrt{\dfrac{n}{n+2}}$ とおくと $0<\alpha<1$ で、$0<x<\alpha$ では $f_n'(x)>0$、$\alpha<x<1$ では $f_n'(x)<0$。

よって $f_n(x)$ は $0\leqq x\leqq1$ において $x=\alpha$ で最大となり

$$M_n=\alpha^n(1-\alpha^2)=\left(\frac{n}{n+2}\right)^{\frac n2}\cdot\frac{2}{n+2} .$$

### (2)

$$nM_n=\frac{2n}{n+2}\left(1-\frac{2}{n+2}\right)^{\frac n2} .$$

$h=-\dfrac{2}{n+2}$ とおくと、$n\to\infty$ のとき $h\to0$ で、$\dfrac n2=\dfrac{n+2}{2}-1=-\dfrac1h-1$ だから

$$\left(1-\frac{2}{n+2}\right)^{\frac n2}=(1+h)^{-\frac1h-1}=\left\{(1+h)^{\frac1h}\right\}^{-1}\cdot(1+h)^{-1} .$$

$\displaystyle\lim_{h\to0}(1+h)^{\frac1h}=e$ より、これは $e^{-1}\cdot1=\dfrac1e$ に収束する。また $\dfrac{2n}{n+2}\to2$。

$$\lim_{n\to\infty}nM_n=\frac2e .$$

### 採点で見るところ

- (1): 増減を調べて「最大」と言っているか。$f_n'(x)=0$ の解を出すだけでは最大の根拠にならない。$n=1$ でも式が正しいことに注意($x^{0}=1$)。
- (2): $e$ の定義のどの形を使ったかを明示する。$\left(1-\dfrac{2}{n+2}\right)^{n/2}$ を説明なしに $\dfrac1e$ と書かない。
