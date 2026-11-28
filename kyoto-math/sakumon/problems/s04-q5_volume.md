---
set: 4
daimon: 5
field: 積分
title: 軸を含まない平面上の円板の回転体
points: 35
---

# 軸を含まない平面上の円板の回転体(断面は線分 → 軸に最も近い点の場合分け → 円の面積で積分 / 想定 35 分 / やや難)

狙い: 2016[4] の型(回転軸を含まない平面上の図形の回転体)。断面の線分のうち軸に最も近い点が、線分の途中にある場合と端にある場合とで変わる。01セット[5]で「最も近い点は端とは限らない」を扱ったが、今回はそれが高さによって切り替わる。2026[5] と同じく、場合分けを落とすと答が変わる。

## 問題

$xyz$ 空間において、平面 $x=1$ 上にあり、点 $\left(1,\dfrac12,0\right)$ を中心とする半径 1 の円板(周および内部)を $D$ とする。$D$ を $z$ 軸のまわりに1回転させてできる立体の体積を求めよ。

## 解答

### 答

$\dfrac{2}{3}\pi^2+\dfrac{3\sqrt3}{4}\pi$

### 解答

$D$ は $x=1$、$\left(y-\dfrac12\right)^2+z^2\leqq1$ で表される。

$-1\leqq t\leqq1$ とし、$w=\sqrt{1-t^2}$ とおく。平面 $z=t$ による $D$ の切り口は

$$x=1,\qquad\frac12-w\leqq y\leqq\frac12+w,\qquad z=t$$

という線分である。この線分上の点 $(1,y,t)$ と $z$ 軸の距離を $r$ とすると $r^2=1+y^2$。

**最大値。** $\left|\dfrac12+w\right|\geqq\left|\dfrac12-w\right|$ だから、$r^2$ の最大値は $1+\left(\dfrac12+w\right)^2$。

**最小値。** 線分が $y=0$ を含むかどうかで分かれる。$\dfrac12-w\leqq0$、すなわち $w\geqq\dfrac12$ となるのは $|t|\leqq\dfrac{\sqrt3}{2}$ のときである。

- $|t|\leqq\dfrac{\sqrt3}{2}$ のとき: $y=0$ で最小値 1。
- $\dfrac{\sqrt3}{2}\leqq|t|\leqq1$ のとき: $y=\dfrac12-w\ (\geqq0)$ で最小値 $1+\left(\dfrac12-w\right)^2$。

$r$ は最小値と最大値の間のすべての値をとるので、立体の平面 $z=t$ による切り口は円環で、面積 $S(t)$ は

$$S(t)=\begin{cases}\pi\left(\dfrac12+w\right)^2=\pi\left(\dfrac14+w+w^2\right) & \left(|t|\leqq\dfrac{\sqrt3}{2}\right)\\[2mm] \pi\left\{\left(\dfrac12+w\right)^2-\left(\dfrac12-w\right)^2\right\}=2\pi w & \left(\dfrac{\sqrt3}{2}\leqq|t|\leqq1\right)\end{cases}$$

$S(t)$ は偶関数だから

$$V=2\pi\left\{\int_0^{\frac{\sqrt3}{2}}\left(\frac14+w+w^2\right)dt+\int_{\frac{\sqrt3}{2}}^{1}2w\,dt\right\} .$$

**各項の計算。** $w^2=1-t^2$ より

$$\int_0^{\frac{\sqrt3}{2}}\frac14\,dt=\frac{\sqrt3}{8},\qquad\int_0^{\frac{\sqrt3}{2}}(1-t^2)\,dt=\frac{\sqrt3}{2}-\frac{\sqrt3}{8}=\frac{3\sqrt3}{8} .$$

$\displaystyle\int_0^{\frac{\sqrt3}{2}}\sqrt{1-t^2}\,dt$ は、単位円の $0\leqq t\leqq\dfrac{\sqrt3}{2}$ の部分の面積で、中心角 $\dfrac{\pi}{3}$ の扇形と、底辺 $\dfrac{\sqrt3}{2}$・高さ $\dfrac12$ の直角三角形の和だから

$$\int_0^{\frac{\sqrt3}{2}}\sqrt{1-t^2}\,dt=\frac{\pi}{6}+\frac{\sqrt3}{8},\qquad\int_{\frac{\sqrt3}{2}}^{1}\sqrt{1-t^2}\,dt=\frac{\pi}{4}-\frac{\pi}{6}-\frac{\sqrt3}{8}=\frac{\pi}{12}-\frac{\sqrt3}{8} .$$

よって

$$V=2\pi\left\{\frac{\sqrt3}{8}+\frac{\pi}{6}+\frac{\sqrt3}{8}+\frac{3\sqrt3}{8}+\frac{\pi}{6}-\frac{\sqrt3}{4}\right\}=2\pi\left(\frac{\pi}{3}+\frac{3\sqrt3}{8}\right)=\frac23\pi^2+\frac{3\sqrt3}{4}\pi .$$

### 検算

数値では $V\fallingdotseq10.66$。立体は、$z$ 軸からの距離が $\sqrt{1+\left(\frac32\right)^2}\fallingdotseq1.80$ 以下、$|z|\leqq1$ の円柱(体積 $\fallingdotseq20.4$)に入り、それより小さい。場合分けをせず全区間で $2\pi w$ を積分すると $\pi^2\fallingdotseq9.87$、全区間で $\pi\left(\frac12+w\right)^2$ を積分すると $\fallingdotseq11.4$ で、正しい値はその間にある。

### 採点で見るところ

- 最小距離の場合分け。$|t|=\dfrac{\sqrt3}{2}$ で切り替わることを、線分が $y=0$ を含む条件から導いているか。
- $\sqrt{1-t^2}$ の定積分を、扇形と三角形の面積で出す(または $t=\sin\theta$ で置換する)。
- 軸を含まない平面上の図形なので、「重心が描く円周×面積」の公式は使えない。
