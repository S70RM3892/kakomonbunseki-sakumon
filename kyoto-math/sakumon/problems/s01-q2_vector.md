---
set: 1
daimon: 2
field: 空間ベクトル
title: 四面体を切る平面
points: 30
---

# 四面体を切る平面(共面条件 → 面積比 / 想定 20 分 / 易〜標準)

狙い: 2023[2]・2024[3]・2025[4] と3年続いた「4点が同一平面上 ⇔ 係数の和が 1」をそのまま問う。(2) は切り口の四角形を同じ平面内の2つのベクトルで表し、面積比を係数から読む。易化年の[2]に相当。

## 問題

四面体 OABC において、辺 OA を $2{:}1$ に内分する点を P、辺 OB の中点を Q、辺 BC を $1{:}2$ に内分する点を R とする。3点 P, Q, R を通る平面と辺 AC の交点を S とする。

**(1)** $\mathrm{AS}{:}\mathrm{SC}$ を求めよ。

**(2)** 三角形 PQR の面積と四角形 PQRS の面積の比を求めよ。

## 解答

### 答

- (1) $\mathrm{AS}{:}\mathrm{SC}=1{:}4$
- (2) $(\triangle\mathrm{PQR}):(\text{四角形 PQRS})=5{:}9$

### (1)

$\overrightarrow{\mathrm{OA}}=\vec a$、$\overrightarrow{\mathrm{OB}}=\vec b$、$\overrightarrow{\mathrm{OC}}=\vec c$ とおく。

$$\overrightarrow{\mathrm{OP}}=\frac23\vec a,\qquad \overrightarrow{\mathrm{OQ}}=\frac12\vec b,\qquad \overrightarrow{\mathrm{OR}}=\frac{2\vec b+\vec c}{3}.$$

S は辺 AC 上にあるので、実数 $k$ を用いて $\overrightarrow{\mathrm{OS}}=(1-k)\vec a+k\vec c$ と表せる。S は平面 PQR 上にあるので、実数 $s,t$ を用いて

$$\overrightarrow{\mathrm{PS}}=s\,\overrightarrow{\mathrm{PQ}}+t\,\overrightarrow{\mathrm{PR}}$$

と表せる。すなわち

$$\overrightarrow{\mathrm{OS}}=\frac23(1-s-t)\vec a+\left(\frac s2+\frac{2t}{3}\right)\vec b+\frac t3\vec c .$$

O, A, B, C は同一平面上にないから $\vec a,\vec b,\vec c$ は1次独立で、係数を比べて

$$\frac23(1-s-t)=1-k,\qquad \frac s2+\frac{2t}{3}=0,\qquad \frac t3=k .$$

第2式から $s=-\dfrac43t$。第1式に代入して $\dfrac23\left(1+\dfrac t3\right)=1-\dfrac t3$、よって $t=\dfrac35$、$s=-\dfrac45$、$k=\dfrac15$。

$0<k<1$ なので S は確かに辺 AC 上にあり、$\mathrm{AS}{:}\mathrm{SC}=k:(1-k)=1{:}4$。

### (2)

(1) より $\overrightarrow{\mathrm{PS}}=-\dfrac45\overrightarrow{\mathrm{PQ}}+\dfrac35\overrightarrow{\mathrm{PR}}$。

$\overrightarrow{\mathrm{PQ}}$ の係数が負なので、S は直線 PR に関して Q と反対側にある。したがって四角形 PQRS は対角線 PR で $\triangle\mathrm{PQR}$ と $\triangle\mathrm{PRS}$ に分かれる。

$\triangle\mathrm{PQR}$ と $\triangle\mathrm{PRS}$ は辺 PR を共有するので、面積比は Q, S から直線 PR までの距離の比に等しい。$\overrightarrow{\mathrm{PS}}$ のうち $\overrightarrow{\mathrm{PR}}$ に平行な成分は距離に影響しないので、この比は $1{:}\dfrac45$。

$$\triangle\mathrm{PRS}=\frac45\triangle\mathrm{PQR},\qquad \text{四角形 PQRS}=\frac95\triangle\mathrm{PQR}.$$

よって求める比は $5{:}9$。

### 検算

閉じた折れ線 O→A→C→B→O に対するメネラウスの定理(空間版)$\dfrac{\mathrm{OP}}{\mathrm{PA}}\cdot\dfrac{\mathrm{AS}}{\mathrm{SC}}\cdot\dfrac{\mathrm{CR}}{\mathrm{RB}}\cdot\dfrac{\mathrm{BQ}}{\mathrm{QO}}=2\cdot\dfrac14\cdot2\cdot1=1$ と合う。答案ではこの定理を証明なしに使わず、上のように係数比較で書く。

### 採点で見るところ

- 「$\vec a,\vec b,\vec c$ が1次独立だから係数を比較できる」の一言。
- (2) で四角形の頂点の並び(S が PR に関して Q の反対側)を確認しているか。ここを飛ばすと、面積を足してよい理由がない。
