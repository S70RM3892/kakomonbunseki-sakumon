---
set: 4
daimon: 1
field: 微分
title: 置き換えた変数の動く範囲
points: 30
---

# 置き換えた変数の動く範囲(かたまりを置く → 変域 → 増減 / 想定 15 分 / 易〜標準)

狙い: 2023[4] と同じ「かたまりを1文字に置き換える」型。置き換えた $t$ の関数は $t=\sqrt3$ で極値をとるが、$t$ はそこまで届かない。微分して極値を答えると誤答になる。標準的な年の[1]として、変域の確認を落とさずに完答する問題。

## 問題

$0\leqq x<2\pi$ のとき、関数

$$f(x)=\frac{\sin x+\cos x}{2+\sin x\cos x}$$

の最大値と最小値を求めよ。

## 解答

### 答

最大値 $\dfrac{2\sqrt2}{5}$ $\left(x=\dfrac{\pi}{4}\right)$、最小値 $-\dfrac{2\sqrt2}{5}$ $\left(x=\dfrac{5\pi}{4}\right)$

### 解答

$t=\sin x+\cos x$ とおく。$t^2=1+2\sin x\cos x$ より $\sin x\cos x=\dfrac{t^2-1}{2}$ で

$$f(x)=\frac{t}{2+\dfrac{t^2-1}{2}}=\frac{2t}{t^2+3} .$$

$t=\sqrt2\sin\left(x+\dfrac{\pi}{4}\right)$ であり、$0\leqq x<2\pi$ のとき $t$ は $-\sqrt2\leqq t\leqq\sqrt2$ のすべての値をとる。

$g(t)=\dfrac{2t}{t^2+3}$ とおくと

$$g'(t)=\frac{2(t^2+3)-2t\cdot2t}{(t^2+3)^2}=\frac{2(3-t^2)}{(t^2+3)^2} .$$

$-\sqrt2\leqq t\leqq\sqrt2$ では $t^2\leqq2<3$ だから $g'(t)>0$ で、$g(t)$ はこの範囲で単調に増加する。

よって最大値は $g(\sqrt2)=\dfrac{2\sqrt2}{5}$、最小値は $g(-\sqrt2)=-\dfrac{2\sqrt2}{5}$。

$t=\sqrt2$ となるのは $x=\dfrac{\pi}{4}$、$t=-\sqrt2$ となるのは $x=\dfrac{5\pi}{4}$ のときである。

### 検算

$g'(t)=0$ となる $t=\sqrt3$ での値は $\dfrac{2\sqrt3}{6}=\dfrac{\sqrt3}{3}\fallingdotseq0.577$。これは $\dfrac{2\sqrt2}{5}\fallingdotseq0.566$ より大きいが、$t=\sqrt3$ となる $x$ は存在しない。

### 採点で見るところ

- $t$ の変域。ここを書かずに $t=\sqrt3$ で最大とした答案は誤答。
- 最大・最小を与える $x$ の値まで書く(問われていなくても、値が実現することの確認になる)。
