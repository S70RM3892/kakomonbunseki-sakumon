---
set: 1
daimon: 1
field: 小問集合
title: 定積分の計算と整式の割り算
points: 35
---

# 小問集合(定積分 2 題+整式の余り / 想定 20 分 / 易)

狙い: `analysis/trend.md` の「定積分の小問は奇数年に出る(2019・2023・2025)」に合わせた[1]。問1 は部分積分と $\tan$ 置換、問2 は 2023[1]問2 と同じ「割る式の根でべきが周期をもつ」型で、西暦 2027 を指数に使った。ここは満点以外ありえない、という位置づけ。

## 問題

次の各問に答えよ。

**問1** 次の定積分の値を求めよ。

$$\text{(1)}\ \ \int_0^{\frac{\pi}{4}} x\tan^2 x\,dx \qquad\qquad \text{(2)}\ \ \int_0^{1} \frac{dx}{x^2+x+1}$$

**問2** 整式 $x^{2027}+x+1$ を整式 $x^2-x+1$ で割ったときの余りを求めよ。

## 解答

### 答

- 問1 (1) $\dfrac{\pi}{4}-\dfrac{\pi^2}{32}-\dfrac{1}{2}\log 2$  (2) $\dfrac{\sqrt{3}}{9}\pi$
- 問2 $2$

### 問1 (1)

$\tan^2 x=\dfrac{1}{\cos^2 x}-1$ なので

$$\int_0^{\frac{\pi}{4}} x\tan^2 x\,dx=\int_0^{\frac{\pi}{4}} \frac{x}{\cos^2 x}\,dx-\int_0^{\frac{\pi}{4}} x\,dx .$$

第1項は部分積分で

$$\left[x\tan x\right]_0^{\frac{\pi}{4}}-\int_0^{\frac{\pi}{4}}\tan x\,dx=\frac{\pi}{4}+\left[\log(\cos x)\right]_0^{\frac{\pi}{4}}=\frac{\pi}{4}-\frac{1}{2}\log 2 .$$

第2項は $\dfrac{\pi^2}{32}$。よって値は $\dfrac{\pi}{4}-\dfrac{\pi^2}{32}-\dfrac{1}{2}\log 2$。

### 問1 (2)

$x^2+x+1=\left(x+\dfrac12\right)^2+\dfrac34$。$x+\dfrac12=\dfrac{\sqrt3}{2}\tan\theta$ とおくと $dx=\dfrac{\sqrt3}{2}\cdot\dfrac{d\theta}{\cos^2\theta}$、$x:0\to1$ のとき $\theta:\dfrac{\pi}{6}\to\dfrac{\pi}{3}$。

$$\int_0^1\frac{dx}{x^2+x+1}=\int_{\frac{\pi}{6}}^{\frac{\pi}{3}}\frac{4\cos^2\theta}{3}\cdot\frac{\sqrt3}{2}\cdot\frac{d\theta}{\cos^2\theta}=\frac{2}{\sqrt3}\left(\frac{\pi}{3}-\frac{\pi}{6}\right)=\frac{\sqrt3}{9}\pi .$$

### 問2

$(x+1)(x^2-x+1)=x^3+1$ だから、$x^3+1$ は $x^2-x+1$ で割り切れる。したがって $x^6-1=(x^3+1)(x^3-1)$ も割り切れる。

$2027=6\cdot337+5$ より

$$x^{2027}=x^5\left\{(x^6)^{337}-1\right\}+x^5 ,$$

$(x^6)^{337}-1$ は $x^6-1$ で割り切れるので、$x^{2027}$ を $x^2-x+1$ で割った余りは $x^5$ を割った余りに等しい。

$x^5=x^2(x^3+1)-x^2$、$-x^2=-(x^2-x+1)+(-x+1)$ より、$x^5$ の余りは $-x+1$。

よって $x^{2027}+x+1$ の余りは $(-x+1)+x+1=2$。

### 採点で見るところ

- 問1 (1): $\log(\cos x)$ の符号。(2): 置換後の積分区間。
- 問2: 「$x^3=-1$ を代入」と書くだけでは説明不足。$x^6-1$ が割り切れることを式で示してから指数を落とす。$x^2-x+1=0$ の解 $\alpha$ を使うなら、$\alpha$ と $\overline{\alpha}$ の両方で余り $ax+b$ の値が決まることまで書く。
