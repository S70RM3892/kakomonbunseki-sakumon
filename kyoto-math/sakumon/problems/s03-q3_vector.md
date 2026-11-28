---
set: 3
daimon: 3
field: 空間ベクトル
title: 四面体の垂線の足と体積
points: 35
---

# 四面体の垂線の足と体積(内積を全部出す → 垂直条件 → 体積 / 想定 25 分 / 標準)

狙い: 2022[4] の型(辺の長さ・角から内積をすべて求め、垂直を内積 0 に直す)。平面上の点は係数の和が 1、平面に垂直は平面内の2つのベクトルと垂直、という2つの基本動作だけで解ける。(1) が (2) の高さを与える誘導つき。

## 問題

四面体 OABC が

$$\mathrm{OA}=2,\qquad \mathrm{OB}=\mathrm{OC}=3,\qquad \angle\mathrm{AOB}=\angle\mathrm{AOC}=\frac{\pi}{3},\qquad \angle\mathrm{BOC}=\frac{\pi}{2}$$

を満たしている。点 O から平面 ABC に下ろした垂線を OH とする。

**(1)** $\overrightarrow{\mathrm{OH}}$ を $\overrightarrow{\mathrm{OA}},\ \overrightarrow{\mathrm{OB}},\ \overrightarrow{\mathrm{OC}}$ を用いて表せ。

**(2)** 四面体 OABC の体積を求めよ。

## 解答

### 答

- (1) $\overrightarrow{\mathrm{OH}}=\dfrac35\overrightarrow{\mathrm{OA}}+\dfrac15\overrightarrow{\mathrm{OB}}+\dfrac15\overrightarrow{\mathrm{OC}}$
- (2) $\dfrac{3\sqrt2}{2}$

### (1)

$\overrightarrow{\mathrm{OA}}=\vec a$、$\overrightarrow{\mathrm{OB}}=\vec b$、$\overrightarrow{\mathrm{OC}}=\vec c$ とおく。条件より

$$|\vec a|^2=4,\quad |\vec b|^2=|\vec c|^2=9,\quad \vec a\cdot\vec b=2\cdot3\cdot\frac12=3,\quad \vec a\cdot\vec c=3,\quad \vec b\cdot\vec c=0 .$$

H は平面 ABC 上にあるので、実数 $s,t,u$ を用いて

$$\overrightarrow{\mathrm{OH}}=s\vec a+t\vec b+u\vec c,\qquad s+t+u=1$$

と表せる。OH は平面 ABC に垂直だから $\overrightarrow{\mathrm{OH}}\cdot\overrightarrow{\mathrm{AB}}=0$、$\overrightarrow{\mathrm{OH}}\cdot\overrightarrow{\mathrm{AC}}=0$。

$$\overrightarrow{\mathrm{OH}}\cdot(\vec b-\vec a)=s(3-4)+t(9-3)+u(0-3)=-s+6t-3u=0 ,$$

$$\overrightarrow{\mathrm{OH}}\cdot(\vec c-\vec a)=s(3-4)+t(0-3)+u(9-3)=-s-3t+6u=0 .$$

辺々引いて $9t-9u=0$、よって $t=u$。第1式から $s=3t$。$s+t+u=5t=1$ より $t=u=\dfrac15$、$s=\dfrac35$。

$$\overrightarrow{\mathrm{OH}}=\frac35\vec a+\frac15\vec b+\frac15\vec c .$$

### (2)

**高さ。**

$$|\overrightarrow{\mathrm{OH}}|^2=\frac{1}{25}\left|3\vec a+\vec b+\vec c\right|^2=\frac{1}{25}\left(9\cdot4+9+9+2\cdot3\cdot3+2\cdot3\cdot3+2\cdot0\right)=\frac{90}{25} ,$$

よって $\mathrm{OH}=\dfrac{3\sqrt{10}}{5}$。

**底面積。**

$$\mathrm{AB}^2=|\vec b-\vec a|^2=9-6+4=7,\qquad \mathrm{AC}^2=7,\qquad \mathrm{BC}^2=|\vec c-\vec b|^2=9+9=18 .$$

$\triangle\mathrm{ABC}$ は $\mathrm{AB}=\mathrm{AC}=\sqrt7$ の二等辺三角形で、BC の中点を M とすると $\mathrm{BM}=\dfrac{3\sqrt2}{2}$、

$$\mathrm{AM}=\sqrt{7-\frac92}=\sqrt{\frac52},\qquad \triangle\mathrm{ABC}=\frac12\cdot3\sqrt2\cdot\sqrt{\frac52}=\frac{3\sqrt5}{2} .$$

**体積。**

$$V=\frac13\cdot\frac{3\sqrt5}{2}\cdot\frac{3\sqrt{10}}{5}=\frac{3\sqrt{50}}{10}=\frac{3\sqrt2}{2} .$$

### 検算

$\triangle\mathrm{OBC}$ を底面と見る。面積は $\dfrac12\cdot3\cdot3=\dfrac92$。A から平面 OBC までの距離を $h$ とすると、$\vec a$ の $\vec b,\vec c$ 方向の成分はそれぞれ $2\cos\dfrac{\pi}{3}=1$ だから $h=\sqrt{4-1-1}=\sqrt2$。$V=\dfrac13\cdot\dfrac92\cdot\sqrt2=\dfrac{3\sqrt2}{2}$ で一致する。(2) だけならこちらのほうが速い。

### 採点で見るところ

- (1): 「H が平面 ABC 上 ⇔ 係数の和が 1」「OH⊥平面 ABC ⇔ 平面内の平行でない2つのベクトルと垂直」の2つを明記しているか。
- (2): 底面と高さの組をどう取るかは自由。(1) を使わない解法でも満点。
