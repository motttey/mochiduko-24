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

    svg.selectAll("*").remove(); // Clear previous render

    const g = svg.append("g");

    const panel = d3.select(panelRef.current);
    const hoverHint = d3.select(hoverHintRef.current);

    const mappedData = data.map((d) => ({
      ...d,
      x: d.u * (width - 40) + 20,
      y: d.v * (height - 40) + 20,
    }));

    const hexRadius = 18;
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
      .scaleSequential(d3.interpolateViridis)
      .domain([0, maxCount]);

    const hex = g
      .selectAll(".hex")
      .data(bins)
      .join("path")
      .attr("class", styles.hex)
      .attr("d", hexbin.hexagon())
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .attr("fill", (d) => color(d.length))
      .attr("stroke", "#253246")
      .attr("stroke-width", 0.5)
      .attr("opacity", 0.95);

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      .attr("stroke", "#1d2633");

    hex
      .on("mouseenter", (e, d) => {
        hoverHint.style("display", "none");
        showBin(d);
        d3.select(e.currentTarget)
          .attr("stroke", "#b5cdfb")
          .attr("stroke-width", 1.5);
      })
      .on("mouseleave", (e) => {
        d3.select(e.currentTarget)
          .attr("stroke", "#253246")
          .attr("stroke-width", 0.5);
      })
      .on("click", (e, d) => showBin(d));

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
            .text((t: any) => t);
        }
      });
    }
  }, [data]);

  return (
    <div className={styles.wrap}>
      <svg id="chart" ref={chartRef}></svg>
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
