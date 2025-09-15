"use client";

import * as d3 from "d3";
import { hexbin as d3hexbin, type HexbinBin } from "d3-hexbin";
import { useEffect, useRef, useState } from "react";

import { mochidukoApiUrl } from "../data/constants";
import styles from "./Som.module.css";

const MARGIN = 20;
const BIN_RADIUS = 40;
const SINGLE_RADIUS = 28;

export type SomIllust = {
  id: number;
  u: number; // 0..1
  v: number; // 0..1
  url: string;
  thumb: string;
  title: string;
  date: string;
  tags: string[];
  bookmark: number;
};

const fetchUrl = (id: string) => `${mochidukoApiUrl}/thumbnails/${id}.jpg`;
const fetchPixivLink = (id: string) =>
  `https://www.pixiv.net/artworks/${id || ""}`;

const toPixel = (d: SomIllust, w: number, h: number) => ({
  ...d,
  x: d.u * (w - 2 * MARGIN) + MARGIN,
  y: d.v * (h - 2 * MARGIN) + MARGIN,
});

const buildSvg = (svgEl: SVGSVGElement, width: number, height: number) => {
  const svg = d3.select(svgEl).attr("width", width).attr("height", height);
  svg.selectAll("*").remove();
  const g = svg.append("g");
  const defs = svg.append("defs");
  return { svg, g, defs };
};

const makeHexbin = (radius: number, width: number, height: number) =>
  d3hexbin<SomIllust & { x: number; y: number }>()
    .x((d) => d.x)
    .y((d) => d.y)
    .radius(radius)
    .extent([
      [radius, radius],
      [width - radius * 2, height - radius],
    ]);

const pickRepresentative = (
  bin: HexbinBin<SomIllust & { x: number; y: number }>,
) => bin.slice().sort((a, b) => (b.bookmark ?? 0) - (a.bookmark ?? 0))[0];

const renderBinPanel = (
  panel: d3.Selection<HTMLDivElement, unknown, null, undefined>,
  bin: HexbinBin<SomIllust & { x: number; y: number }>,
) => {
  panel.html("");
  const head = panel.append("div");
  head
    .append("div")
    .style("font-size", "14px")
    .style("margin-bottom", "6px")
    .text(`Images: ${bin.length}`);

  const avgBookmark = d3.mean(bin, (d) => d.bookmark ?? 0) ?? 0;
  head
    .append("div")
    .attr("class", styles.tip)
    .text(`Avg. bookmark: ${avgBookmark.toFixed(1)}`);

  const thumbs = panel.append("div").attr("class", styles.thumbs);
  bin.slice(0, 24).forEach((d) => {
    const wrap = thumbs
      .append("a")
      .attr("href", d.url)
      .attr("target", "_blank")
      .attr("title", `${d.title} (${d.date})`);

    wrap.append("img").attr("src", fetchUrl(d.id.toString()));

    if (d.tags?.length) {
      wrap
        .append("div")
        .selectAll("span")
        .data(d.tags.slice(0, 2))
        .join("span")
        .attr("class", styles.chip)
        .text((t) => String(t));
    }
  });
};

const renderItemPanel = (
  panel: d3.Selection<HTMLDivElement, unknown, null, undefined>,
  item: SomIllust,
) => {
  panel.html("");
  const head = panel.append("div");
  head
    .append("div")
    .style("font-size", "14px")
    .style("margin-bottom", "6px")
    .text(item.title);

  head
    .append("div")
    .attr("class", styles.tip)
    .text(`Bookmark: ${item.bookmark}`);

  const thumbs = panel.append("div").attr("class", styles.thumbs);
  const wrap = thumbs
    .append("a")
    .attr("href", item.url)
    .attr("target", "_blank")
    .attr("title", `${item.title} (${item.date})`);

  wrap.append("img").attr("src", fetchUrl(item.id.toString()));

  if (item.tags?.length) {
    wrap
      .append("div")
      .selectAll("span")
      .data(item.tags.slice(0, 4))
      .join("span")
      .attr("class", styles.chip)
      .text((t) => String(t));
  }
};

function renderBinned(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  defs: d3.Selection<SVGDefsElement, unknown, null, undefined>,
  panel: d3.Selection<HTMLDivElement, unknown, null, undefined>,
  width: number,
  height: number,
  data: SomIllust[],
) {
  const mapped = data.map((d) => toPixel(d, width, height));

  const hexbin = makeHexbin(BIN_RADIUS, width, height);
  const bins = hexbin(mapped);

  const maxCount = d3.max(bins, (b) => b.length) ?? 1;
  const color = d3.scaleSequential(d3.interpolateOrRd).domain([0, maxCount]);

  const hexPath = hexbin.hexagon();

  const reps = bins
    .map((bin) => ({ bin, rep: pickRepresentative(bin) }))
    .filter(
      (
        d,
      ): d is {
        bin: (typeof bins)[number];
        rep: SomIllust & { x: number; y: number };
      } => Boolean(d.rep),
    );

  const repGroups = g
    .selectAll<
      SVGGElement,
      { bin: (typeof bins)[number]; rep: SomIllust & { x: number; y: number } }
    >(".hexrep")
    .data(reps)
    .join("g")
    .attr("class", "hexrep")
    .attr("transform", (d) => `translate(${d.bin.x},${d.bin.y})`);

  // Clip paths per group
  repGroups.each(function (_d, i) {
    const id = `hexclip-${i}`;
    const cp = defs.append("clipPath").attr("id", id);
    cp.append("path").attr("d", hexPath);
    d3.select(this).attr("data-clip-id", id);
  });

  repGroups
    .append("path")
    .attr("d", hexPath)
    .attr("fill", "white")
    .attr("stroke", (d) => color(d.bin.length))
    .attr("stroke-width", 1);

  const imgW = 2 * BIN_RADIUS;
  const imgH = Math.sqrt(3) * BIN_RADIUS;
  const imgX = -imgW / 2;
  const imgY = -imgH / 2;

  repGroups
    .append("image")
    .attr("href", (d) => fetchUrl(d.rep.id.toString()))
    .attr("x", imgX)
    .attr("y", imgY)
    .attr("width", imgW)
    .attr("height", imgH)
    .attr("preserveAspectRatio", "xMidYMid slice")
    .attr("clip-path", function () {
      const id = d3.select(this.parentNode as SVGGElement).attr("data-clip-id");
      return `url(#${id})`;
    })
    .style("cursor", "pointer")
    .style("opacity", (d) => Math.max(Math.min(d.bin.length, 10) / 10, 0.5))
    .on("mouseenter", function (_e, d) {
      renderBinPanel(panel, d.bin);
      const path = (this.previousSibling as SVGPathElement) || null;
      if (path)
        d3.select(path).attr("stroke", "#b5cdfb").attr("stroke-width", 2);
    })
    .on("mouseleave", function (_e, d) {
      const path = (this.previousSibling as SVGPathElement) || null;
      if (path)
        d3.select(path)
          .attr("stroke", color(d.bin.length))
          .attr("stroke-width", 1);
    })
    .on("click", (_e, d) => {
      window.open(fetchPixivLink(d.rep.id.toString()) ?? d.rep.thumb, "_blank");
    });
}

function renderSingles(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  defs: d3.Selection<SVGDefsElement, unknown, null, undefined>,
  panel: d3.Selection<HTMLDivElement, unknown, null, undefined>,
  width: number,
  height: number,
  data: SomIllust[],
) {
  const hex = makeHexbin(SINGLE_RADIUS, width, height);
  const centers = hex.centers().map(([x, y]) => ({ x, y, taken: false }));

  const points = data
    .map((d) => toPixel(d, width, height))
    .sort((a, b) => (b.bookmark ?? 0) - (a.bookmark ?? 0));

  const assignToNearest = (
    pts: (SomIllust & { x: number; y: number })[],
    slots: { x: number; y: number; taken: boolean }[],
  ) => {
    const placed: (SomIllust & { x: number; y: number; clipId?: string })[] =
      [];
    for (const p of pts) {
      let bestIdx = -1;
      let bestDist = Infinity;
      for (let i = 0; i < slots.length; i++) {
        const c = slots[i];
        if (c.taken) continue;
        const dx = c.x - p.x;
        const dy = c.y - p.y;
        const dist = dx * dx + dy * dy;
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }
      if (bestIdx >= 0) {
        const c = slots[bestIdx];
        c.taken = true;
        placed.push({ ...p, x: c.x, y: c.y });
      }
    }
    return placed;
  };

  const singles = assignToNearest(points, centers);
  const hexPath = hex.hexagon();

  const singleGroups = g
    .selectAll<
      SVGGElement,
      SomIllust & { x: number; y: number; clipId?: string }
    >(".hexsingle")
    .data(singles)
    .join("g")
    .attr("class", "hexsingle")
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  // Clip paths per group
  singleGroups.each(function (_d, i) {
    const id = `hexclip-${i}`;
    const cp = defs.append("clipPath").attr("id", id);
    cp.append("path").attr("d", hexPath);
    d3.select(this).attr("data-clip-id", id);
  });

  singleGroups
    .append("path")
    .attr("d", hexPath)
    .attr("fill", "#1e2a3a")
    .attr("stroke", "#253246")
    .attr("stroke-width", 0.5);

  const imgW = 2 * SINGLE_RADIUS;
  const imgH = 2 * SINGLE_RADIUS;
  const imgX = -imgW / 2;
  const imgY = -imgH / 2;

  singleGroups
    .append("image")
    .attr("href", (d) => fetchUrl(d.id.toString()))
    .attr("x", imgX)
    .attr("y", imgY)
    .attr("width", imgW)
    .attr("height", imgH)
    .attr("preserveAspectRatio", "xMidYMid slice")
    .attr("clip-path", function () {
      const id = d3.select(this.parentNode as SVGGElement).attr("data-clip-id");
      return `url(#${id})`;
    })
    .style("cursor", "pointer")
    .on("mouseenter", function (_e, d) {
      renderItemPanel(panel, d);
      const path = (this.previousSibling as SVGPathElement) || null;
      if (path)
        d3.select(path).attr("stroke", "#b5cdfb").attr("stroke-width", 1.5);
    })
    .on("mouseleave", function () {
      const path = (this.previousSibling as SVGPathElement) || null;
      if (path)
        d3.select(path).attr("stroke", "#253246").attr("stroke-width", 0.5);
    })
    .on("click", (_e, d) => {
      window.open(fetchPixivLink(d.id.toString()), "_blank");
    });
}

const SomPage = () => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [data, setData] = useState<SomIllust[]>([]);
  const [isBinningMode, setIsBinningMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 初回読み込み
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/som");
      const json = await res.json();
      setData(json.illusts as SomIllust[]);
    })();
  }, []);

  // Render
  useEffect(() => {
    if (!chartRef.current || !panelRef.current) return;
    if (data.length === 0) return;

    const width = Math.max(300, window.innerWidth - 340);
    const height =
      Math.ceil(data.length / Math.floor(width / (SINGLE_RADIUS * 2))) *
      SINGLE_RADIUS;

    const { g, defs } = buildSvg(chartRef.current, width, height);
    const panel = d3.select(panelRef.current);

    if (isBinningMode) {
      renderBinned(g, defs, panel, width, height, data);
    } else {
      renderSingles(g, defs, panel, width, height, data);
    }
  }, [data, isBinningMode]);

  return (
    <div className={`${styles.wrap} ${isMenuOpen ? styles.menuOpen : ""}`}>
      <div id="main" className={styles.main}>
        <svg id="chart" ref={chartRef}></svg>
      </div>
      <button
        className={styles.mobileMenuButton}
        onClick={() => setIsMenuOpen((o) => !o)}
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>
      <aside id="side" className={styles.side}>
        <div className={styles.header}>
          <div>
            <h1>{`SOM (Self-Organizing Maps)`}</h1>
            <h2>{`${isBinningMode ? "Hexbin Illust Collection" : "全件スナップショット"}`}</h2>
          </div>
          <div>
            <button
              className={styles.toggleButton}
              onClick={() => setIsBinningMode((m) => !m)}
            >
              {isBinningMode ? "全件表示" : "密度表示"}
            </button>
          </div>
        </div>
        <div className={styles.tip}>
          {isBinningMode
            ? "SOMで2次元に配置したイラストを、六角ビンで密度表示します。"
            : "SOMで2次元に配置したイラストを、同じビンに含まれるものが近接するように一覧表示します。"}
        </div>
        <div id="panel" ref={panelRef}></div>
      </aside>
    </div>
  );
};

export default SomPage;
