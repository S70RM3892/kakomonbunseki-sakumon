---
set: 2
daimon: 5
field: 積分
title: 長さ1の線分の通過領域
points: 35
---

# 長さ 1 の線分の通過領域(回転対称 → 高さを固定して最大半径 → 積分 / 想定 35 分 / やや難〜難)

狙い: 2023[5](OP+OQ=1 の線分の通過領域)の条件を「PQ=1」に替えたもの。方針は同じ(回転対称性に気づき、$z$ を固定して軸からの距離の最大を求める)だが、最大化で3乗根が現れ、積分も重い。2020[6] と同じく「断面の半径を自分で式にする」体積の上位版。

## 問題

$xyz$ 空間において、点 P は $z$ 軸上の $z\geqq0$ の部分にあり、点 Q は $xy$ 平面上にあって、線分 PQ の長さは 1 であるとする。点 P と点 Q がこの条件を満たしながらくまなく動くとき、線分 PQ が通過してできる立体の体積を求めよ。

## 解答

### 答

$\dfrac{16}{105}\pi$

### 解答

条件は $z$ 軸のまわりの回転で変わらないから、求める立体は $z$ 軸を軸とする回転体である。また $\mathrm{OP}\leqq\mathrm{PQ}=1$ より、立体は $0\leqq z\leqq1$ の範囲にある。

$0<t<1$ とし、平面 $z=t$ による切り口を調べる。

$\mathrm{P}(0,0,p)$ $(0\leqq p\leqq1)$ とすると、$\mathrm{OQ}=\sqrt{1-p^2}$。線分 PQ が平面 $z=t$ と交わるのは $p\geqq t$ のときで、$p>0$ であり、交点 R は PQ を $(p-t):t$ に内分する。R と $z$ 軸の距離は

$$r=\frac{p-t}{p}\cdot\mathrm{OQ}=\left(1-\frac tp\right)\sqrt{1-p^2}\qquad(t\leqq p\leqq1) .$$

Q は原点を中心とする半径 $\sqrt{1-p^2}$ の円周上のどこにでもとれるので、R は $z$ 軸を中心とする半径 $r$ の円周上をくまなく動く。

$p=\sin\varphi$ $\left(\alpha\leqq\varphi\leqq\dfrac{\pi}{2}\text{、ただし }\sin\alpha=t,\ 0<\alpha<\dfrac{\pi}{2}\right)$ とおくと

$$r=f(\varphi)=\left(1-\frac{t}{\sin\varphi}\right)\cos\varphi=\cos\varphi-\frac{t\cos\varphi}{\sin\varphi} ,$$

$$f'(\varphi)=-\sin\varphi+\frac{t}{\sin^2\varphi}=\frac{t-\sin^3\varphi}{\sin^2\varphi} .$$

$\sin\beta=t^{\frac13}$ $\left(0<\beta<\dfrac{\pi}{2}\right)$ となる $\beta$ をとる。$0<t<1$ より $t<t^{\frac13}$ なので $\alpha<\beta<\dfrac{\pi}{2}$ であり、$f(\varphi)$ は $\alpha\leqq\varphi\leqq\beta$ で増加、$\beta\leqq\varphi\leqq\dfrac{\pi}{2}$ で減少する。$f(\alpha)=f\left(\dfrac{\pi}{2}\right)=0$ だから、$r$ は 0 から最大値 $f(\beta)$ までのすべての値をとる。最大値は、$t=\sin^3\beta$ を用いて

$$f(\beta)=\cos\beta-\sin^2\beta\cos\beta=\cos^3\beta=\left(1-t^{\frac23}\right)^{\frac32} .$$

したがって切り口は半径 $\left(1-t^{\frac23}\right)^{\frac32}$ の円板で、その面積は

$$S(t)=\pi\left(1-t^{\frac23}\right)^{3} .$$

($t=0,1$ のときもこの式は正しい値 $\pi$、0 を与える。)

求める体積は

$$V=\pi\int_0^1\left(1-3t^{\frac23}+3t^{\frac43}-t^2\right)dt=\pi\left(1-\frac95+\frac97-\frac13\right)=\frac{16}{105}\pi .$$

### 検算

$1-\dfrac95+\dfrac97-\dfrac13=\dfrac{105-189+135-35}{105}=\dfrac{16}{105}$。立体は半径1・高さ1の円錐(体積 $\dfrac{\pi}{3}\fallingdotseq1.05$)の内側に入るはずで、$\dfrac{16\pi}{105}\fallingdotseq0.479$ はそれより小さい。断面の輪郭 $r^{\frac23}+z^{\frac23}=1$ はアステロイドである。

### 採点で見るところ

- 「回転体であること」「$r$ が 0 から最大値までのすべての値をとること(切り口が円環でなく円板)」の2つを言葉で述べているか。
- 最大値を与える $\varphi$ が定義域 $\alpha\leqq\varphi\leqq\dfrac{\pi}{2}$ の内部にあることの確認($t<t^{1/3}$)。
- $p$ のまま微分してもよいが、根号の処理で計算が重くなる。三角関数で置くのは長さ1の線分(斜辺が1の直角三角形)という設定から自然に出てくる置き方。
