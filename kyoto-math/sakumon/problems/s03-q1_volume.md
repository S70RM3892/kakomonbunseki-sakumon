---
set: 3
daimon: 1
field: 積分
title: 2つの正弦曲線が囲む図形の回転体
points: 30
---

# 2つの正弦曲線が囲む図形の回転体(交点 → 上下関係 → 外−内 / 想定 15 分 / 易)

狙い: 2015[1] と同じ型。交点を求め、区間内でどちらが上かを確かめ、$\pi\int(\text{外}^2-\text{内}^2)$ を半角公式で計算する。標準的な年の[1]として、確実に完答する問題。

## 問題

2つの曲線 $y=\sin x$ と $y=\sin 2x$ の $0\leqq x\leqq\dfrac{\pi}{3}$ の部分で囲まれた図形を、$x$ 軸のまわりに1回転させてできる立体の体積を求めよ。

## 解答

### 答

$\dfrac{3\sqrt3}{16}\pi$

### 解答

$\sin 2x-\sin x=\sin x\,(2\cos x-1)$。$0\leqq x\leqq\dfrac{\pi}{3}$ では $\sin x\geqq0$、$2\cos x-1\geqq0$ なので

$$\sin 2x\geqq\sin x\geqq0$$

で、等号は $x=0,\ \dfrac{\pi}{3}$ のときに限り成り立つ。よって2曲線はこの範囲で $x=0,\ \dfrac{\pi}{3}$ でのみ交わり、囲まれた図形は $0\leqq x\leqq\dfrac{\pi}{3}$、$\sin x\leqq y\leqq\sin 2x$ である。図形は $x$ 軸の上側にあるから

$$V=\pi\int_0^{\frac{\pi}{3}}\left(\sin^2 2x-\sin^2 x\right)dx .$$

$\sin^2 2x=\dfrac{1-\cos 4x}{2}$、$\sin^2 x=\dfrac{1-\cos 2x}{2}$ より

$$V=\frac{\pi}{2}\int_0^{\frac{\pi}{3}}\left(\cos 2x-\cos 4x\right)dx=\frac{\pi}{2}\left[\frac{\sin 2x}{2}-\frac{\sin 4x}{4}\right]_0^{\frac{\pi}{3}} .$$

$\sin\dfrac{2\pi}{3}=\dfrac{\sqrt3}{2}$、$\sin\dfrac{4\pi}{3}=-\dfrac{\sqrt3}{2}$ より

$$V=\frac{\pi}{2}\left(\frac{\sqrt3}{4}+\frac{\sqrt3}{8}\right)=\frac{3\sqrt3}{16}\pi .$$

### 採点で見るところ

- どちらの曲線が上かを式で示しているか。図だけでは根拠にならない。
- 図形が $x$ 軸をまたがないこと(両方とも 0 以上)の確認。またぐ場合は 2026[5] のように折り返しが要る。
- $\sin\dfrac{4\pi}{3}$ の符号。
