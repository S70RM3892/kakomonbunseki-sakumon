# セット01 の図(SVG)を生成する。  python3 make_figures.py
import math
import os

HERE = os.path.dirname(os.path.abspath(__file__))
FONT = 'font-family="Latin Modern Roman, IPAexMincho, serif"'


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;')


def rich(s, fs):
    """'CH_2OH' や 'O^{2-}' を下付き・上付きの tspan にする。"""
    out, i = '', 0
    while i < len(s):
        c = s[i]
        if c in '_^':
            if s[i + 1] == '{':
                k = s.index('}', i)
                tok, i = s[i + 2:k], k + 1
            else:
                tok, i = s[i + 1], i + 2
            kind = 'sub' if c == '_' else 'super'
            out += f'<tspan baseline-shift="{kind}" font-size="{fs * 0.7:.1f}">{esc(tok)}</tspan>'
        else:
            out += esc(c)
            i += 1
    return out


def tw(s, fs):
    """文字列のおおよその幅。"""
    w, i = 0.0, 0
    while i < len(s):
        c = s[i]
        if c in '_^':
            if s[i + 1] == '{':
                k = s.index('}', i)
                w += 0.36 * (k - i - 2)
                i = k + 1
            else:
                w += 0.36
                i += 2
            continue
        w += 1.0 if ord(c) > 0x2E80 else (0.75 if c in 'OHCRN' else 0.5)
        i += 1
    return w * fs


def text(x, y, s, fs=17, anchor='middle', extra=''):
    return f'<text x="{x:.1f}" y="{y + fs * 0.34:.1f}" font-size="{fs}" text-anchor="{anchor}" {extra}>{rich(s, fs)}</text>'


def line(x1, y1, x2, y2, w=1.3, extra=''):
    return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="#000" stroke-width="{w}" {extra}/>'


def save(name, w, h, body):
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" {FONT}>'
           f'<rect width="{w}" height="{h}" fill="#fff"/>\n' + '\n'.join(body) + '\n</svg>\n')
    with open(os.path.join(HERE, name), 'w') as f:
        f.write(svg)


def arrow(x1, y, x2, label=''):
    b = [line(x1, y, x2, y), f'<path d="M{x2},{y} l-9,-4.5 v9 z" fill="#000"/>']
    if label:
        b.append(text((x1 + x2) / 2, y - 14, label, 14))
    return b


# ---------- 鎖状の構造式: tokens = [(ラベル, 上の置換基 or None), ...] ----------
def chain(x, y, tokens, fs=17, bond=15):
    b = []
    for i, (lab, top) in enumerate(tokens):
        w = tw(lab, fs)
        if i:
            b.append(line(x + 2, y, x + bond - 2, y))
            x += bond
        cx = x + w / 2
        b.append(text(cx, y, lab, fs))
        if top:
            b.append(line(cx - 2.5, y - 11, cx - 2.5, y - 27))
            b.append(line(cx + 2.5, y - 11, cx + 2.5, y - 27))
            b.append(text(cx, y - 37, top, fs))
        x += w
    return b, x


# ---------- 環: kinds は頂点ごとの 'CO'(C=O), 'O', 'CH2' ----------
def ring(cx, cy, R, kinds, start=90, fs=16):
    n = len(kinds)
    pts = [(cx + R * math.cos(math.radians(start - 360 * i / n)), cy - R * math.sin(math.radians(start - 360 * i / n))) for i in range(n)]
    b = []
    for i in range(n):
        (x1, y1), (x2, y2) = pts[i], pts[(i + 1) % n]
        d = math.hypot(x2 - x1, y2 - y1)
        ux, uy = (x2 - x1) / d, (y2 - y1) / d
        b.append(line(x1 + ux * 11, y1 + uy * 11, x2 - ux * 11, y2 - uy * 11))
    for (x, y), k in zip(pts, kinds):
        if k == 'O':
            b.append(text(x, y, 'O', fs))
        elif k == 'CO':
            b.append(text(x, y, 'C', fs))
            d = math.hypot(x - cx, y - cy)
            ux, uy = (x - cx) / d, (y - cy) / d
            px, py = -uy * 2.5, ux * 2.5
            for s in (1, -1):
                b.append(line(x + ux * 11 + s * px, y + uy * 11 + s * py, x + ux * 26 + s * px, y + uy * 26 + s * py))
            b.append(text(x + ux * 37, y + uy * 37, 'O', fs))
        else:
            cw = tw('C', fs) / 2
            if x >= cx - 1:
                b.append(text(x - cw, y, 'CH_2', fs, 'start'))
            else:
                b.append(text(x + cw, y, 'H_2C', fs, 'end'))
    return b


# ---------- 投影式 ----------
def fischer(x, y, top, rows, bottom, numbers=True, fs=16, step=34):
    b = [text(x, y, top, fs)]
    yy = y + step
    for i, (l, r) in enumerate(rows):
        b.append(line(x, yy - step + (12 if i == 0 else 0), x, yy))
        b.append(line(x - 26, yy, x + 26, yy))
        b.append(text(x - 30, yy, l, fs, 'end'))
        b.append(text(x + 30, yy, r, fs, 'start'))
        if numbers:
            b.append(text(x + 7, yy - 11, str(i + 2), 10, 'start'))
        yy += step
    b.append(line(x, yy - step, x, yy - 12))
    b.append(text(x - tw('C', fs) / 2, yy, bottom, fs, 'start'))
    if numbers:
        b.append(text(x + 16, y - 13, '1', 10, 'start'))
        b.append(text(x + 7, yy - 16, str(len(rows) + 2), 10, 'start'))
    return b


# ===== 大問1 図1: ペロブスカイト型構造 =====
def q1():
    def P(x, y, z):
        return 110 + 170 * x + 78 * y, 250 - 170 * z - 50 * y
    b = []
    edges = [((0, 0, 0), (1, 0, 0)), ((1, 0, 0), (1, 0, 1)), ((1, 0, 1), (0, 0, 1)), ((0, 0, 1), (0, 0, 0)),
             ((0, 1, 0), (1, 1, 0)), ((1, 1, 0), (1, 1, 1)), ((1, 1, 1), (0, 1, 1)), ((0, 1, 1), (0, 1, 0)),
             ((0, 0, 0), (0, 1, 0)), ((1, 0, 0), (1, 1, 0)), ((1, 0, 1), (1, 1, 1)), ((0, 0, 1), (0, 1, 1))]
    for p, q in edges:
        hidden = (0, 1, 0) in (p, q)
        b.append(line(*P(*p), *P(*q), 1.1, 'stroke-dasharray="5 4"' if hidden else ''))
    atoms = [((x, y, z), 'A') for x in (0, 1) for y in (0, 1) for z in (0, 1)]
    atoms += [((.5, .5, 0), 'O'), ((.5, .5, 1), 'O'), ((.5, 0, .5), 'O'), ((.5, 1, .5), 'O'), ((0, .5, .5), 'O'), ((1, .5, .5), 'O')]
    atoms += [((.5, .5, .5), 'B')]
    style = {'A': (15, '#fff'), 'O': (11, '#bbb'), 'B': (7.5, '#000')}
    for (p, k) in sorted(atoms, key=lambda a: -a[0][1]):
        X, Y = P(*p)
        r, fill = style[k]
        b.append(f'<circle cx="{X:.1f}" cy="{Y:.1f}" r="{r}" fill="{fill}" stroke="#000" stroke-width="1.2"/>')
    lx = 410
    for i, (k, lab) in enumerate([('A', 'A(Sr^{2+})'), ('B', 'B(Ti^{4+})'), ('O', 'O^{2−}')]):
        r, fill = style[k]
        yy = 90 + i * 44
        b.append(f'<circle cx="{lx}" cy="{yy}" r="{r}" fill="{fill}" stroke="#000" stroke-width="1.2"/>')
        b.append(text(lx + 28, yy, lab, 17, 'start'))
    (x1, y1), (x2, y2) = P(0, 0, 0), P(1, 0, 0)
    b.append(line(x1, y1 + 30, x2, y2 + 30, 0.8))
    b.append(line(x1, y1 + 24, x1, y1 + 36, 0.8))
    b.append(line(x2, y2 + 24, x2, y2 + 36, 0.8))
    b.append(text((x1 + x2) / 2, y1 + 46, 'a', 17, 'middle', 'font-style="italic"'))
    save('s01-q1-1.svg', 560, 310, b)


# ===== 大問2 図1: 1/v 対 1/[S] のグラフ(選択肢) =====
def q2():
    b = []
    # (切片なし, 傾きなし), (切片あり, 傾きあり)
    panels = [('①', (0.25, 0.55), (0.25, 1.15)), ('②', (0.25, 0.55), (0.6, 0.55)),
              ('③', (0.2, 0.5), (0.4, 1.0)), ('④', (0.25, 0.9), (0.25, 0.4))]
    W, H = 130, 120
    for i, (name, (c0, m0), (c1, m1)) in enumerate(panels):
        ox, oy = 50 + i * 185, 170
        b += [line(ox, oy, ox + W + 8, oy), line(ox, oy, ox, oy - H - 8)]
        b.append(f'<path d="M{ox + W + 8},{oy} l-8,-4 v8 z M{ox},{oy - H - 8} l-4,8 h8 z" fill="#000"/>')
        for (c, m), dash in (((c0, m0), ''), ((c1, m1), 'stroke-dasharray="6 4"')):
            xe = min(1.0, (1.0 - c) / m)
            b.append(line(ox, oy - c * H, ox + xe * W, oy - (c + m * xe) * H, 1.5, dash))
        b.append(text(ox - 6, oy + 12, '0', 13, 'end'))
        b.append(f'<text x="{ox + W - 8}" y="{oy + 30}" font-size="15" text-anchor="middle"><tspan>1/[S]</tspan></text>')
        b.append(f'<text x="{ox - 10}" y="{oy - H - 14}" font-size="15" text-anchor="middle">1/<tspan font-style="italic">v</tspan></text>')
        b.append(text(ox + W / 2, oy + 58, name, 17))
    b.append(line(250, 262, 290, 262, 1.5))
    b.append(text(298, 262, '阻害剤 I なし', 15, 'start'))
    b.append(line(430, 262, 470, 262, 1.5, 'stroke-dasharray="6 4"'))
    b.append(text(478, 262, '阻害剤 I あり', 15, 'start'))
    save('s01-q2-1.svg', 780, 285, b)


# ===== 大問3 図1: 反応X の例 =====
def q3():
    b = [text(20, 62, '(a)', 16, 'start')]
    c, x = chain(70, 62, [('CH_3', None), ('C', 'O'), ('CH_2', None), ('CH_3', None)])
    b += c
    b += arrow(x + 22, 62, x + 92, '過酸')
    c, x = chain(x + 114, 62, [('CH_3', None), ('C', 'O'), ('O', None), ('CH_2', None), ('CH_3', None)])
    b += c
    b.append(text(20, 190, '(b)', 16, 'start'))
    b += ring(140, 200, 44, ['CO', 'CH2', 'CH2', 'CH2', 'CH2'])
    b += arrow(250, 190, 320, '過酸')
    b += ring(430, 200, 48, ['CO', 'O', 'CH2', 'CH2', 'CH2', 'CH2'], start=120)
    save('s01-q3-1.svg', 600, 275, b)
    # 解答用: 化合物 L(ε-カプロラクトン)
    b = ring(110, 110, 56, ['CO', 'O', 'CH2', 'CH2', 'CH2', 'CH2', 'CH2'], start=90 + 360 / 14)
    save('s01-q3-ans-L.svg', 230, 210, b)


# ===== 大問4 図1: α-グルコースと鎖状構造の投影式 =====
def q4():
    b = [text(140, 20, '(a)', 16), text(430, 20, '(b)', 16)]
    cx, cy = 140, 140
    v = {1: (cx + 78, cy), 2: (cx + 38, cy + 46), 3: (cx - 38, cy + 46), 4: (cx - 78, cy), 5: (cx - 38, cy - 46), 'O': (cx + 38, cy - 46)}
    order = [1, 2, 3, 4, 5, 'O']
    for i in range(6):
        (x1, y1), (x2, y2) = v[order[i]], v[order[(i + 1) % 6]]
        if 'O' in (order[i], order[(i + 1) % 6]):
            d = math.hypot(x2 - x1, y2 - y1)
            ux, uy = (x2 - x1) / d, (y2 - y1) / d
            if order[i] == 'O':
                x1, y1 = x1 + ux * 10, y1 + uy * 10
            else:
                x2, y2 = x2 - ux * 10, y2 - uy * 10
        b.append(line(x1, y1, x2, y2, 1.4))
    b.append(text(*v['O'], 'O', 16))
    subs = {1: ('H', 'OH'), 2: ('H', 'OH'), 3: ('OH', 'H'), 4: ('H', 'OH'), 5: ('CH_2OH', 'H')}
    for k, (up, down) in subs.items():
        x, y = v[k]
        b.append(line(x, y, x, y - 16))
        b.append(line(x, y, x, y + 16))
        if up == 'CH_2OH':
            b.append(text(x - tw('C', 16) / 2, y - 27, up, 16, 'start'))
            b.append(text(x + 30, y - 40, '6', 10))
        else:
            b.append(text(x, y - 27, up, 16))
        b.append(text(x, y + 27, down, 16))
    for k, (dx, dy) in {1: (-12, 0), 2: (-9, -7), 3: (9, -7), 4: (12, 0), 5: (9, 7)}.items():
        b.append(text(v[k][0] + dx, v[k][1] + dy, str(k), 10))
    b += fischer(430, 50, 'CHO', [('H', 'OH'), ('HO', 'H'), ('H', 'OH'), ('H', 'OH')], 'CH_2OH')
    save('s01-q4-1.svg', 560, 250, b)
    # 解答用: 2,3-ジ-O-メチルグルコースの投影式
    b = fischer(120, 30, 'CHO', [('H', 'OCH_3'), ('CH_3O', 'H'), ('H', 'OH'), ('H', 'OH')], 'CH_2OH', numbers=False)
    save('s01-q4-ans-Z.svg', 240, 225, b)


q1()
q2()
q3()
q4()
print('ok')
