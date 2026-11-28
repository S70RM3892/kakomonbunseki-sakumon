---
set: 2
daimon: 2
field: 空間図形
title: 対辺の中点を結ぶ線分が直交する四面体
points: 30
---

# 対辺の中点を結ぶ線分が直交する四面体(内積 → 辺の等式 → 体積 / 想定 30 分 / やや難)

狙い: 2016[3]・2017[2]・2018[6] の「四面体の論証」型。図形の条件を位置ベクトルの内積に直し、長さの等式に翻訳する。後半の体積は、直交する3本の線分を座標軸に取れるかどうかで計算量が決まる(2018[6] の四面体と同じ仲間で、直方体に埋め込める)。小問に分けていないのは 2026 年の形式に合わせた。

## 問題

四面体 ABCD において、辺 AB の中点と辺 CD の中点を結ぶ線分、辺 AC の中点と辺 BD の中点を結ぶ線分、辺 AD の中点と辺 BC の中点を結ぶ線分を考える。この3本の線分のうち、どの2本も互いに垂直であるとする。

このとき、四面体 ABCD の4つの面はすべて合同な三角形であることを示せ。また、3本の線分の長さが $1,\ 2,\ 3$ であるとき、四面体 ABCD の体積を求めよ。

## 解答

### 答

体積は $2$

### 前半(4つの面が合同)

ある点 O を始点とする A, B, C, D の位置ベクトルを $\vec a,\vec b,\vec c,\vec d$ とする。辺 CD の中点から辺 AB の中点に向かうベクトルなどを

$$\vec l=\frac{\vec a+\vec b-\vec c-\vec d}{2},\qquad \vec m=\frac{\vec a+\vec c-\vec b-\vec d}{2},\qquad \vec n=\frac{\vec a+\vec d-\vec b-\vec c}{2}$$

とおく。$\vec u=\vec a-\vec d$、$\vec v=\vec b-\vec c$ とすると $\vec l=\dfrac{\vec u+\vec v}{2}$、$\vec m=\dfrac{\vec u-\vec v}{2}$ だから

$$\vec l\cdot\vec m=\frac{|\vec u|^2-|\vec v|^2}{4}=\frac{\mathrm{AD}^2-\mathrm{BC}^2}{4} .$$

仮定より $\vec l\cdot\vec m=0$ なので $\mathrm{AD}=\mathrm{BC}$。

同様に、$\vec l=\dfrac{(\vec a-\vec c)+(\vec b-\vec d)}{2}$、$\vec n=\dfrac{(\vec a-\vec c)-(\vec b-\vec d)}{2}$ より $\vec l\cdot\vec n=\dfrac{\mathrm{AC}^2-\mathrm{BD}^2}{4}=0$、よって $\mathrm{AC}=\mathrm{BD}$。

$\vec m=\dfrac{(\vec a-\vec b)+(\vec c-\vec d)}{2}$、$\vec n=\dfrac{(\vec a-\vec b)-(\vec c-\vec d)}{2}$ より $\vec m\cdot\vec n=\dfrac{\mathrm{AB}^2-\mathrm{CD}^2}{4}=0$、よって $\mathrm{AB}=\mathrm{CD}$。

$\mathrm{AB}=\mathrm{CD}=x$、$\mathrm{AC}=\mathrm{BD}=y$、$\mathrm{AD}=\mathrm{BC}=z$ とおく。4つの面の3辺の長さは

- $\triangle\mathrm{ABC}$: $\mathrm{AB}=x,\ \mathrm{AC}=y,\ \mathrm{BC}=z$
- $\triangle\mathrm{ABD}$: $\mathrm{AB}=x,\ \mathrm{BD}=y,\ \mathrm{AD}=z$
- $\triangle\mathrm{ACD}$: $\mathrm{CD}=x,\ \mathrm{AC}=y,\ \mathrm{AD}=z$
- $\triangle\mathrm{BCD}$: $\mathrm{CD}=x,\ \mathrm{BD}=y,\ \mathrm{BC}=z$

であり、どの面も3辺が $x,y,z$ である。3辺がそれぞれ等しいから、4つの面はすべて合同である。(証明終)

### 後半(体積)

始点 O を $\vec a+\vec b+\vec c+\vec d=\vec 0$ となるように取り直す(4点の重心を O とする)。このとき

$$\vec l+\vec m+\vec n=\frac{3\vec a-\vec b-\vec c-\vec d}{2}=\frac{4\vec a}{2}=2\vec a$$

より $\vec a=\dfrac{\vec l+\vec m+\vec n}{2}$。同様に

$$\vec b=\frac{\vec l-\vec m-\vec n}{2},\qquad \vec c=\frac{-\vec l+\vec m-\vec n}{2},\qquad \vec d=\frac{-\vec l-\vec m+\vec n}{2} .$$

$\vec l,\vec m,\vec n$ は互いに垂直で、長さは $1,2,3$ を並べ替えたものである。体積は並べ替えによらないので $|\vec l|=1,\ |\vec m|=2,\ |\vec n|=3$ としてよい。O を原点とし、$\vec l,\vec m,\vec n$ の向きを $x,y,z$ 軸の正の向きとする座標をとると

$$\mathrm{A}\left(\tfrac12,1,\tfrac32\right),\quad \mathrm{B}\left(\tfrac12,-1,-\tfrac32\right),\quad \mathrm{C}\left(-\tfrac12,1,-\tfrac32\right),\quad \mathrm{D}\left(-\tfrac12,-1,\tfrac32\right) .$$

この4点は、原点を中心とし各辺が座標軸に平行な、辺の長さ $1,2,3$ の直方体の頂点のうち、どの2つも辺で結ばれていない4つである。

四面体 ABCD は、この直方体から、残り4つの頂点のまわりの三角錐を切り落としたものである。切り落とす三角錐はどれも、直交する3辺の長さが $1,2,3$ で、体積は $\dfrac13\cdot\dfrac12\cdot1\cdot2\cdot3=1$。

$$V=1\cdot2\cdot3-4\cdot1=2 .$$

### 検算

一般に3本の長さが $p,q,r$ なら $V=pqr-4\cdot\dfrac{pqr}{6}=\dfrac{pqr}{3}$。このとき辺の長さは $\sqrt{q^2+r^2},\ \sqrt{r^2+p^2},\ \sqrt{p^2+q^2}$、ここでは $\sqrt{13},\sqrt{10},\sqrt5$ で、前半の結論(対辺が等しい)と合う。

### 採点で見るところ

- 前半: 3組の内積をすべて計算しているか。「同様に」で済ませるなら、どの組み合わせを入れ替えるかを明示する。合同の根拠(三辺相等)まで書く。
- 後半: 直方体に埋め込めることを、頂点の座標で示しているか。「等面四面体は直方体に埋め込める」を既知として使うだけでは不十分。
