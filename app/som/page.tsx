"use client";

import * as d3 from "d3";
import { hexbin as d3hexbin } from "d3-hexbin";
import { useEffect, useRef, useState } from "react";

import { mochidukoApiUrl } from "../data/constants";
import styles from "./Som.module.css";

const fetchUrl = (id: string) => `${mochidukoApiUrl}/thumbnails/${id}.jpg`;

type SomIllust = {
  id: number;
  u: number;
  v: number;
  url: string;
  thumb: string;
  title: string;
  date: string;
  tags: string[];
  bookmark: number;
};

const SomPage = () => {
  const chartRef = useRef(null);
  const panelRef = useRef(null);
  const hoverHintRef = useRef(null);
  const [data, setData] = useState<SomIllust[]>([]);
  const [isBinningMode, setIsBinningMode] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/som");
      const json = await res.json();
      setData(json.illusts);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0 || !chartRef.current) return;

    const width = Math.max(600, window.innerWidth - 340);
    const height = Math.max(450, window.innerHeight);

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const g = svg.append("g");
    const defs = svg.append("defs");

    const panel = d3.select(panelRef.current);
    const hoverHint = d3.select(hoverHintRef.current);

    if (isBinningMode) {
      renderBinned(g, defs, panel, hoverHint, width, height);
    } else {
      renderSingles(g, defs, panel, hoverHint, width, height);
    }

    function renderBinned(
      g: any,
      defs: any,
      panel: any,
      hoverHint: any,
      width: number,
      height: number,
    ) {
      const mappedData = data.map((d) => ({
        ...d,
        x: d.u * (width - 40) + 20,
        y: d.v * (height - 40) + 20,
      }));

      const hexRadius = 40;
      const hexbin = d3hexbin<any>()
        .x((d) => d.x)
        .y((d) => d.y)
        .radius(hexRadius)
        .extent([
          [0, 0],
          [width, height],
        ]);
      const bins = hexbin(mappedData);

      const maxCount = d3.max(bins, (b) => b.length) ?? 1;
      const color = d3
        .scaleSequential(d3.interpolateBlues)
        .domain([0, maxCount]);

      const hexPath = hexbin.hexagon();

      function pickRepresentative(bin: any[]) {
        return bin
          .slice()
          .sort((a, b) => (b.bookmark ?? 0) - (a.bookmark ?? 0))[0];
      }

      const reps = bins
        .map((bin) => ({ bin, rep: pickRepresentative(bin) }))
        .filter((d) => d.rep);

      const repGroups = g
        .selectAll(".hexrep")
        .data(reps)
        .join("g")
        .attr("class", "hexrep")
        .attr("transform", (d: any) => `translate(${d.bin.x},${d.bin.y})`);

      repGroups.each(function (d: any, i: number) {
        const id = `hexclip-${i}`;
        const cp = defs.append("clipPath").attr("id", id);
        cp.append("path").attr("d", hexPath);
        d.clipId = id;
      });

      repGroups
        .append("path")
        .attr("d", hexPath)
        .attr("fill", (d: any) => color(d.bin.length))
        .attr("stroke", (d: any) => color(d.bin.length))
        .attr("stroke-width", 1);

      const imgW = 2 * hexRadius;
      const imgH = Math.sqrt(3) * hexRadius;

      const imgX = -imgW / 2;
      const imgY = -imgH / 2;

      repGroups
        .append("image")
        .attr("href", (d: any) => fetchUrl(d.rep.id.toString()))
        .attr("x", imgX)
        .attr("y", imgY)
        .attr("width", imgW)
        .attr("height", imgH)
        .attr("preserveAspectRatio", "xMidYMid slice")
        .attr("clip-path", (d: any) => `url(#${d.clipId})`)
        .style("cursor", "pointer")
        .style("opacity", 0.75)
        .on("mouseenter", function (this: any, e: any, d: any) {
          hoverHint.style("display", "none");
          showBin(d.bin);
          d3.select(this.previousSibling)
            .attr("stroke", "#b5cdfb")
            .attr("stroke-width", 2);
        })
        .on("mouseleave", function (this: any, e: any, d: any) {
          d3.select(this.previousSibling)
            .attr("stroke", color(d.bin.length))
            .attr("stroke-width", 1);
        })
        .on("click", (e: any, d: any) =>
          window.open(d.rep.image ?? d.rep.thumb, "_blank"),
        );

      function showBin(bin: any[]) {
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
              .text((t: any) => String(t));
          }
        });
      }
    }

    function renderSingles(
      g: any,
      defs: any,
      panel: any,
      hoverHint: any,
      width: number,
      height: number,
    ) {
      const radiusSingle = 28;
      const hex = d3hexbin<any>()
        .x((d) => d.x)
        .y((d) => d.y)
        .radius(radiusSingle)
        .extent([
          [radiusSingle, radiusSingle],
          [width - radiusSingle, height - radiusSingle],
        ]);

      const centers = hex.centers().map(([x, y]) => ({ x, y }));

      const points = data
        .map((d) => ({
          ...d,
          x: d.u * (width - 40) + 20,
          y: d.v * (height - 40) + 20,
        }))
        .sort((a, b) => (b.bookmark ?? 0) - (a.bookmark ?? 0));

      function assign(
        points: any[],
        centers: { x: number; y: number; taken: boolean }[],
      ) {
        const placed = [];
        for (const p of points) {
          let best = null,
            bestDist = Infinity,
            bestIdx = -1;
          for (let i = 0; i < centers.length; i++) {
            const c = centers[i];
            if (c.taken) continue;
            const dx = c.x - p.x,
              dy = c.y - p.y;
            const dist = dx * dx + dy * dy;
            if (dist < bestDist) {
              bestDist = dist;
              best = c;
              bestIdx = i;
            }
          }
          if (best) {
            centers[bestIdx].taken = true;
            placed.push({ ...p, x: best.x, y: best.y });
          }
        }
        return placed;
      }
      const singles = assign(points, centers);

      const hexPath = hex.hexagon();

      const singleGroups = g
        .selectAll(".hexsingle")
        .data(singles)
        .join("g")
        .attr("class", "hexsingle")
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

      singleGroups.each(function (d: any, i: number) {
        const id = `hexclip-${i}`;
        const cp = defs.append("clipPath").attr("id", id);
        cp.append("path").attr("d", hexPath);
        d.clipId = id;
      });

      singleGroups
        .append("path")
        .attr("d", hexPath)
        .attr("fill", "#1e2a3a")
        .attr("stroke", "#253246")
        .attr("stroke-width", 0.5);

      const imgW = 2 * radiusSingle;
      const imgH = Math.sqrt(3) * radiusSingle;

      const imgX = -imgW / 2;
      const imgY = -imgH / 2;

      singleGroups
        .append("image")
        .attr("href", (d: any) => fetchUrl(d.id.toString()))
        .attr("x", imgX)
        .attr("y", imgY)
        .attr("width", imgW)
        .attr("height", imgH)
        .attr("preserveAspectRatio", "xMidYMid slice")
        .attr("clip-path", (d: any) => `url(#${d.clipId})`)
        .style("cursor", "pointer")
        .on("mouseenter", (e: any, d: any) => {
          hoverHint.style("display", "none");
          showItem(d);
          d3.select(e.currentTarget.previousSibling)
            .attr("stroke", "#b5cdfb")
            .attr("stroke-width", 1.5);
        })
        .on("mouseleave", (e: any) => {
          d3.select(e.currentTarget.previousSibling)
            .attr("stroke", "#253246")
            .attr("stroke-width", 0.5);
        })
        .on("click", (_e: any, d: any) => window.open(d.url, "_blank"));

      function showItem(item: any) {
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
            .text((t: any) => String(t));
        }
      }
    }
  }, [data, isBinningMode]);

  return (
    <div className={styles.wrap}>
      <div id="main" className={styles.main}>
        <svg id="chart" ref={chartRef}></svg>
      </div>
      <aside id="side" className={styles.side}>
        <div className={styles.header}>
          <h1>
            {isBinningMode ? "SOM × Hexbin" : "SOM | 全件スナップショット"}
          </h1>
          <button
            className={styles.toggleButton}
            onClick={() => setIsBinningMode(!isBinningMode)}
          >
            {isBinningMode ? "全件表示" : "密度表示"}
          </button>
        </div>
        <div className={styles.tip}>
          {isBinningMode
            ? "SOMで2次元に配置した画像点を、六角ビンで密度表示します。"
            : "SOMで2次元に配置した画像点を、最寄りの空き六角セルにスナップさせて一覧表示します。"}
        </div>
        <div
          className={styles.legend}
          style={{ display: isBinningMode ? "flex" : "none" }}
        >
          <div className={styles.box}></div>
          <div>濃いほど密度が高い</div>
        </div>
        <div className={styles.hoverHint} ref={hoverHintRef}>
          マウスオーバーしてください
        </div>
        <div id="panel" ref={panelRef}></div>
      </aside>
    </div>
  );
};

export default SomPage;
