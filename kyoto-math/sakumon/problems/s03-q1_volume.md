---
set: 3
daimon: 1
field: 積分
title: x 軸をまたぐ図形の回転体
points: 30
---

# x 軸をまたぐ図形の回転体(交点 → 上下関係 → またぐ区間は円板 / 想定 20 分 / 標準)

狙い: 2015[1] と 2026[5] の間。交点は2次方程式を解いて出す。囲まれた図形が途中で $x$ 軸をまたぐので、「外−内」の円環になる区間と、軸まで詰まった円板になる区間を分ける必要がある。公式に当てはめるだけでは誤答になる、という一点を入れた。

## 問題

2つの曲線 $y=\sin x$ と $y=\cos 2x$ の $\dfrac{\pi}{6}\leqq x\leqq\dfrac{5\pi}{6}$ の部分で囲まれた図形を、$x$ 軸のまわりに1回転させてできる立体の体積を求めよ。

## 解答

### 答

$\dfrac{\pi^2}{4}+\dfrac{3\sqrt3}{8}\pi$

### 解答

$s=\sin x$ とおくと $\cos 2x=1-2s^2$ で

$$\sin x-\cos 2x=2s^2+s-1=(2s-1)(s+1) .$$

$\dfrac{\pi}{6}\leqq x\leqq\dfrac{5\pi}{6}$ では $\dfrac12\leqq s\leqq1$ だから $\sin x\geqq\cos 2x$ で、等号は $s=\dfrac12$、すなわち $x=\dfrac{\pi}{6},\ \dfrac{5\pi}{6}$ のときに限る。よって図形は

$$\frac{\pi}{6}\leqq x\leqq\frac{5\pi}{6},\qquad \cos 2x\leqq y\leqq\sin x$$

である。この範囲で $\sin x>0$。一方 $\cos 2x$ は、$\dfrac{\pi}{6}\leqq x\leqq\dfrac{\pi}{4}$ と $\dfrac{3\pi}{4}\leqq x\leqq\dfrac{5\pi}{6}$ で 0 以上、$\dfrac{\pi}{4}\leqq x\leqq\dfrac{3\pi}{4}$ で 0 以下である。

また、$\cos 2x\leqq0$ のとき

$$\sin x-|\cos 2x|=s-(2s^2-1)=-(2s+1)(s-1)\geqq0$$

なので、$x$ 軸の下側の部分を折り返しても $y=\sin x$ の外には出ない。

したがって、$x$ 軸に垂直な平面による立体の切り口は

- $\dfrac{\pi}{6}\leqq x\leqq\dfrac{\pi}{4}$、$\dfrac{3\pi}{4}\leqq x\leqq\dfrac{5\pi}{6}$ では、外半径 $\sin x$、内半径 $\cos 2x$ の円環
- $\dfrac{\pi}{4}\leqq x\leqq\dfrac{3\pi}{4}$ では、半径 $\sin x$ の円板

である。図形は直線 $x=\dfrac{\pi}{2}$ に関して対称だから

$$V=\pi\int_{\frac{\pi}{6}}^{\frac{5\pi}{6}}\sin^2x\,dx-2\pi\int_{\frac{\pi}{6}}^{\frac{\pi}{4}}\cos^22x\,dx .$$

$$\int_{\frac{\pi}{6}}^{\frac{5\pi}{6}}\sin^2x\,dx=\left[\frac x2-\frac{\sin 2x}{4}\right]_{\frac{\pi}{6}}^{\frac{5\pi}{6}}=\frac{\pi}{3}+\frac{\sqrt3}{4} ,$$

$$\int_{\frac{\pi}{6}}^{\frac{\pi}{4}}\cos^22x\,dx=\left[\frac x2+\frac{\sin 4x}{8}\right]_{\frac{\pi}{6}}^{\frac{\pi}{4}}=\frac{\pi}{24}-\frac{\sqrt3}{16} .$$

$$V=\pi\left(\frac{\pi}{3}+\frac{\sqrt3}{4}-\frac{\pi}{12}+\frac{\sqrt3}{8}\right)=\frac{\pi^2}{4}+\frac{3\sqrt3}{8}\pi .$$

### 検算

$\pi\displaystyle\int(\sin^2x-\cos^22x)\,dx$ を全区間で計算すると $\dfrac{3\sqrt3}{4}\pi\fallingdotseq4.08$ になり、正しい値 $\fallingdotseq4.51$ より小さい。軸をまたぐ区間で、くり抜いてはいけない部分をくり抜いているからである。

### 採点で見るところ

- $\cos 2x$ の符号で区間を分けているか。全区間で「外−内」を使った答案は、計算が合っていても誤答。
- 折り返した部分が外側の曲線を超えないことの確認($\sin x\geqq|\cos 2x|$)。
