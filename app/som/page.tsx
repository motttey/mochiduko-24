"use client";

import * as d3 from "d3";
import { hexbin as d3hexbin } from "d3-hexbin";
import { useEffect, useRef, useState } from "react";

import { pixivApiUrl } from "@/app/data/constants";

import styles from "./Som.module.css";

const fetchUrl = (id: string) =>
  `${pixivApiUrl}?illust_id=${id || ""}&mode=sns-automator`;

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

    svg.selectAll("g").remove();

    const g = svg.append("g");
    const defs = svg.append("defs");

    const panel = d3.select(panelRef.current);
    const hoverHint = d3.select(hoverHintRef.current);

    const mappedData = data.map((d) => ({
      ...d,
      x: d.u * (width - 40) + 20,
      y: d.v * (height - 40) + 20,
    }));

    const hexRadius = 45;
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
    const color = d3.scaleSequential(d3.interpolateBlues).domain([0, maxCount]);

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
      .attr("transform", (d) => `translate(${d.bin.x},${d.bin.y})`);

    repGroups.each(function (d: any, i) {
      const id = `hexclip-${i}`;
      const cp = defs.append("clipPath").attr("id", id);
      cp.append("path").attr("d", hexPath);
      d.clipId = id;
    });

    repGroups
      .append("path")
      .attr("d", hexPath)
      .attr("fill", (d) => color(d.bin.length))
      .attr("stroke", (d) => color(d.bin.length))
      .attr("stroke-width", 1);

    const imgW = 2 * hexRadius;
    const imgH = Math.sqrt(3) * hexRadius;

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
      .attr("clip-path", (d: any) => `url(#${d.clipId})`)
      .style("cursor", "pointer")
      .style("opacity", 0.75)
      .on("mouseenter", (e, d) => {
        hoverHint.style("display", "none");
        showBin(d.bin);
        d3.select(e.currentTarget.previousSibling)
          .attr("stroke", "#b5cdfb")
          .attr("stroke-width", 2);
      })
      .on("mouseleave", (e, d) => {
        d3.select(e.currentTarget.previousSibling)
          .attr("stroke", color(d.bin.length))
          .attr("stroke-width", 1);
      })
      .on("click", (_e, d) =>
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
            .text((t) => String(t));
        }
      });
    }
  }, [data]);

  return (
    <div className={styles.wrap}>
      <div id="main" className={styles.main}>
        <svg id="chart" ref={chartRef}></svg>
      </div>
      <aside id="side" className={styles.side}>
        <h1>SOM × Hexbin 可視化</h1>
        <div className={styles.tip}>
          SOMで2次元に配置した画像点を、六角ビンで密度表示。Hexをホバーすると中身のサムネが右側に出ます。
        </div>
        <div className={styles.legend}>
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
