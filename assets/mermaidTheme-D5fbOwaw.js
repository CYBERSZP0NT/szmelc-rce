var r = {
        cssVar: "var(--gray-0)",
        value: "#ffffff"
    },
    a = {
        cssVar: "var(--surface-2)",
        value: "#ffffff",
        dark: "#1a1a19"
    },
    e = {
        cssVar: "var(--surface-3)",
        value: "#ffffff",
        dark: "#20201f"
    },
    o = {
        cssVar: "var(--bg-tint-red-opaque)",
        value: "#fad6d6",
        dark: "#3c0e0e"
    },
    t = {
        cssVar: "var(--bg-tint-yellow-opaque)",
        value: "#f9dca4",
        dark: "#311a00"
    },
    l = {
        cssVar: "var(--bg-tint-green-opaque)",
        value: "#caeac7",
        dark: "#11260f"
    },
    c = {
        cssVar: "var(--bg-tint-blue-opaque)",
        value: "#cde2fb",
        dark: "#032042"
    },
    i = {
        cssVar: "var(--bg-tint-violet-opaque)",
        value: "#dfdbfd",
        dark: "#1d1649"
    },
    s = {
        cssVar: "var(--text-tint-red)",
        value: "#8e2626",
        dark: "#ec7e7e"
    },
    n = {
        cssVar: "var(--text-tint-blue)",
        value: "#184f95",
        dark: "#6da7ec"
    },
    d = {
        cssVar: "var(--text-secondary)",
        value: "#52514e",
        dark: "#c3c2b7"
    },
    C = {
        cssVar: "var(--chart-categorical-1)",
        value: "#2a78d6",
        dark: "#3987e5"
    },
    v = {
        cssVar: "var(--chart-categorical-8)",
        value: "#e34948",
        dark: "#e66767"
    },
    k = {
        cssVar: "var(--chart-muted)",
        value: "#c3c2b7",
        dark: "#5f5e5a"
    },
    u = r => r.dark ?? r.value,
    f = [e, d],
    x = [...[
        [C, c, n],
        [{
            cssVar: "var(--chart-categorical-2)",
            value: "#eb6834",
            dark: "#d95926"
        }, {
            cssVar: "var(--bg-tint-orange-opaque)",
            value: "#f7d8cb",
            dark: "#371407"
        }, {
            cssVar: "var(--text-tint-orange)",
            value: "#863311",
            dark: "#ec835a"
        }],
        [{
            cssVar: "var(--chart-categorical-3)",
            value: "#1baf7a",
            dark: "#199e70"
        }, {
            cssVar: "var(--bg-tint-aqua-opaque)",
            value: "#bfebdb",
            dark: "#022720"
        }, {
            cssVar: "var(--text-tint-aqua)",
            value: "#065f49",
            dark: "#3bbd8c"
        }],
        [{
            cssVar: "var(--chart-categorical-4)",
            value: "#eda100",
            dark: "#c98500"
        }, t, {
            cssVar: "var(--text-tint-yellow)",
            value: "#734500",
            dark: "#db9300"
        }],
        [{
            cssVar: "var(--chart-categorical-5)",
            value: "#e87ba4",
            dark: "#d55181"
        }, {
            cssVar: "var(--bg-tint-magenta-opaque)",
            value: "#f9d4e2",
            dark: "#390f1f"
        }, {
            cssVar: "var(--text-tint-magenta)",
            value: "#862a4c",
            dark: "#e87ba4"
        }],
        [{
            cssVar: "var(--chart-categorical-6)",
            value: "#008300"
        }, l, {
            cssVar: "var(--text-tint-green)",
            value: "#006300",
            dark: "#55bf50"
        }],
        [{
            cssVar: "var(--chart-categorical-7)",
            value: "#6250d6",
            dark: "#9085e9"
        }, i, {
            cssVar: "var(--text-tint-violet)",
            value: "#4a3aa7",
            dark: "#a096eb"
        }],
        [v, o, s]
    ], ...Array.from({
        length: 4
    }, () => [k, ...f])],
    b = Object.fromEntries(x.flatMap(([a], e) => [
        [`cScale${e}`, u(a)],
        [`cScaleInv${e}`, u(a)],
        [`cScaleLabel${e}`, u(r)]
    ])),
    g = (r, [a, e, o]) => ` ${r} rect, ${r} path, ${r} circle, ${r} polygon { fill: ${u(e)}; } ${r} .node-bkg, ${r} .label-container { stroke: ${u(a)}; } ${r} text { fill: ${u(o)}; }`,
    p = x.map((r, a) => g(".section-" + (a - 1), r)).join("") + g(".section-root", [{
        cssVar: "var(--chart-reference)",
        value: "#898781",
        dark: "#97958d"
    }, ...f]),
    m = "#E5E5E5",
    T = "#A1A1A1",
    V = x.map(([r]) => u(r)),
    y = {
        ...Object.fromEntries(V.map((r, a) => [`pie${a+1}`, r])),
        pieStrokeColor: u(a),
        pieOuterStrokeColor: u(a),
        pieSectionTextColor: u(r),
        quadrantPointFill: u(C),
        radar: {
            axisColor: T,
            graticuleColor: u({
                cssVar: "var(--chart-grid)",
                value: "rgba(11, 11, 11, 0.1)",
                dark: "rgba(255, 255, 255, 0.1)"
            })
        },
        xyChart: {
            ...Object.fromEntries(["titleColor", "legendTextColor", "xAxisTitleColor", "xAxisLabelColor", "xAxisTickColor", "xAxisLineColor", "yAxisTitleColor", "yAxisLabelColor", "yAxisTickColor", "yAxisLineColor"].map(r => [r, m])),
            dataLabelColor: u(r),
            backgroundColor: "transparent",
            plotColorPalette: V.join(",")
        }
    },
    B = {
        activationBkgColor: u(e),
        activationBorderColor: T,
        compositeBackground: u(e),
        clusterBkg: u(e),
        clusterBorder: T,
        altBackground: u(e),
        secondBkg: u(e),
        secondaryBorderColor: T,
        secondaryTextColor: m,
        archGroupBorderColor: T,
        ...Object.fromEntries([1, 2, 3, 4].map(r => [`quadrant${r}Fill`, u(e)])),
        ...Object.fromEntries(x.slice(0, 8).map(([, r], a) => [`fillType${a}`, u(r)])),
        activeTaskBkgColor: u({
            cssVar: "var(--blue-500)",
            value: "#256abf"
        }),
        activeTaskBorderColor: u(n),
        doneTaskBkgColor: u({
            cssVar: "var(--gray-550)",
            value: "#5f5e5a"
        }),
        doneTaskBorderColor: u(d),
        critBkgColor: u({
            cssVar: "var(--red-450)",
            value: "#d03b3b"
        }),
        critBorderColor: u(s),
        taskTextDarkColor: u(r),
        taskTextClickableColor: u(r),
        pieTitleTextColor: m,
        pieLegendTextColor: m,
        packet: {
            startByteColor: m,
            endByteColor: m,
            labelColor: m,
            titleColor: m,
            blockStrokeColor: T,
            blockFillColor: u(e)
        },
        treeView: {
            labelColor: m,
            lineColor: T
        },
        cynefin: {
            complexBg: u(l),
            complicatedBg: u(c),
            chaoticBg: u(o),
            clearBg: u(t),
            confusionBg: u(i),
            boundaryColor: T,
            cliffColor: u(v),
            arrowColor: T,
            textColor: m,
            labelColor: m
        }
    },
    $ = ` text[fill="#444444"] { fill: ${m}; stroke: ${u(a)}; stroke-width: 3px; paint-order: stroke; } line[stroke="#444444"], path[stroke="#444444"][marker-end], path[stroke="#444444"][marker-start], rect[stroke="#444444"] { stroke: ${T}; }`,
    h = {
        primaryTextColor: m,
        lineColor: T,
        primaryColor: "transparent",
        primaryBorderColor: T,
        secondaryColor: "transparent",
        tertiaryColor: "#CC785C",
        actorTextColor: m,
        actorLineColor: T,
        signalColor: m,
        signalTextColor: m,
        noteBkgColor: "#2D2D2D",
        noteTextColor: m,
        noteBorderColor: T,
        ...b,
        ...y,
        ...B
    },
    S = r => ` text.journey-section { fill: ${r}; }`,
    q = p + ` .items .node rect { fill: ${u(e)}; } .critText0, .critText1, .critText2, .critText3 { fill: ${u(r)}; }` + S(m) + ` .titleText, .sectionTitle0, .sectionTitle1, .sectionTitle2, .sectionTitle3 { fill: ${m}; } rect.treemapSection { fill-opacity: 0.3; }` + $,
    A = "#91918D",
    D = {
        primaryTextColor: "#191919",
        lineColor: A,
        primaryColor: "#F0F0EB",
        primaryBorderColor: "#D9D8D5",
        secondaryColor: "#F5E6D8",
        tertiaryColor: "#CC785C",
        actorTextColor: "#191919",
        actorLineColor: A,
        signalColor: "#191919",
        signalTextColor: "#191919",
        noteBkgColor: "#F0F0EB",
        noteTextColor: "#191919",
        noteBorderColor: "#D9D8D5",
        clusterBkg: e.value,
        clusterBorder: A,
        altBackground: e.value
    },
    E = {
        axisColor: A,
        axisTextColor: D.primaryTextColor,
        componentStroke: A,
        componentLabelColor: D.primaryTextColor,
        linkStroke: A,
        annotationStroke: A,
        annotationTextColor: D.primaryTextColor
    },
    L = " .mindmap-node .label { transform: translate(-50%, -50%); transform-box: fill-box; }",
    j = r => ` .block .node .cluster, .statediagram-state rect.divider { stroke: ${r}; }`,
    F = r => "dark" === r ? {
        themeVariables: {
            ...h,
            wardley: E
        },
        themeCSS: q + j(h.clusterBorder) + L
    } : {
        themeVariables: D,
        themeCSS: S(D.primaryTextColor) + j(D.clusterBorder) + L
    };
export {
    F as themeFor
};