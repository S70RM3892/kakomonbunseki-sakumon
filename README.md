# kakomonbunseki-sakumon

過去問を分析し、それをもとに作問するための作業机。

## 構成

- `kyoto-chemistry/` 京都大学 化学
  - `analysis/CODEBOOK.md` 分析の物差し(範囲外度 L0〜L3 など)
  - `analysis/years/YYYY.md` 年度別の分析(2006〜2026、2009 を除く)
  - `analysis/data/YYYY.json` 同、集計用データ
  - `analysis/trend.md` 横断分析の結論
  - `analysis/official-intent.md` 京大公式「出題意図」の要点
  - `sakumon/blueprint.md` 作問設計図
  - `sakumon/problems/` 作った問題(1 題 1 ファイル)
  - `sakumon/pdf/NNセット/問題/`、`sakumon/pdf/NNセット/回答/` 大問ごとの PDF(`node build-pdf.mjs` で生成)

- `kyoto-math/` 京都大学 数学(理系)
  - `analysis/CODEBOOK.md` 分析の物差し(分野、誘導 G0〜G2、難易度、型)
  - `analysis/build.py` 元データ(1 パート 1 行)。`python3 build.py` で下の 2 つを生成
  - `analysis/years/YYYY.md` 年度別の分析(2014〜2026)
  - `analysis/data/YYYY.json`、`analysis/data/stats.json` 同、集計用データ
  - `analysis/trend.md` 横断分析の結論
  - `analysis/official-intent.md` 京大公式の出題意図、工学部の配点、合格者得点
  - `sakumon/problems/` 作った問題(1 題 1 ファイル、解答・採点の観点つき)
  - `sakumon/pdf/NNセット/問題/`、`sakumon/pdf/NNセット/回答/` 大問ごとの PDF(`node build-pdf.mjs` で生成)

## 方針

- 過去問の PDF・問題文そのものは著作物なのでリポジトリに入れない。分析は要旨と構造だけを書く。
- 科目を増やすときは `大学-科目/` を同じ構成で追加する。
