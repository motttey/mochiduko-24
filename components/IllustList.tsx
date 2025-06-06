"use client";

import { Grid, Image, Alert, TagsInput, Divider, Box } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import { Virtuoso } from "react-virtuoso";
import useSWR from "swr";

import styles from "@/app/page.module.css";
import { dispatchEventOnCanvas } from "@/app/utils/handleEvent";
import { Illust, Tag } from "@/types/api";

const chunkArray = (array: Array<Illust>) => {
  const results = [];
  let count = 0;

  while (count < array.length) {
    if (results.length % 2 === 0) {
      // 偶数行: 4要素
      results.push(array.slice(count, count + 4));
      count += 4;
    } else {
      // 奇数行: 3要素
      results.push(array.slice(count, count + 3));
      count += 3;
    }
  }

  return results;
};

const prefixPath = "";
const fetchUrl = (id: string) =>
  `https://embed.pixiv.net/decorate.php?illust_id=${id || ""}&mode=sns-automator`;
const fetchPixivLink = (id: string) =>
  `https://www.pixiv.net/artworks/${id || ""}`;

const IllustList: React.FC<{ initialContentsList: Array<Illust> }> = (props: {
  initialContentsList: Array<Illust>;
}) => {
  const fetcher = () =>
    fetch(prefixPath + "/api/mochiduko").then((res) => {
      return res.json();
    });

  const { data, error, isValidating } = useSWR("/api/mochiduko", fetcher, {
    refreshInterval: 0,
  });

  const [filterdIllusts, setFilteredIllusts] = useState([] as Array<Illust>);
  const [groupedIllusts, setGroupedIllusts] = useState(
    [] as Array<Array<Illust>>,
  );

  const searchParams = useSearchParams();
  /*
  const router = useRouter()
  const pathname = usePathname()
  */

  const searchParamsQueryList: Array<string> =
    searchParams.get("query")?.split(",") || [];
  const [queryList, setQueryList] = useState(searchParamsQueryList);

  const fetchedIllust: Array<Illust> = useMemo(
    () =>
      props.initialContentsList && !isValidating
        ? data?.illusts
        : props.initialContentsList || [],
    [data?.illusts, isValidating, props.initialContentsList],
  );

  useEffect(() => {
    const filterdIllusts = (
      (queryList.length > 0
        ? fetchedIllust.filter((illust: Illust) =>
            queryList.some(
              (query) =>
                illust.title.includes(query) ||
                illust.tags.some((tag: Tag) => tag.name === query),
            ),
          )
        : fetchedIllust) || []
    ).sort(() => Math.random() - 0.5);
    setFilteredIllusts(filterdIllusts);

    /*
    if (queryList.length > 0) {
      const params = new URLSearchParams()
      params.set('query', queryList.join(','))
      router.replace(pathname + '?' + params.toString());
    } else {
      router.replace(pathname);
    }
    */
  }, [queryList, fetchedIllust]);

  useMemo(() => {
    const groupedIllusts = chunkArray(filterdIllusts);
    setGroupedIllusts(groupedIllusts);
  }, [filterdIllusts]);

  if (error)
    return (
      <Alert
        variant="light"
        color="red"
        title="Failed to load"
        className={styles.alert}
      >
        failed to load
      </Alert>
    );

  if (!fetchedIllust || fetchedIllust.length === 0)
    return <div>loading...</div>;

  return (
    <div
      className={styles.illustContainer}
      id="illustContainer"
      onClick={dispatchEventOnCanvas}
    >
      <Grid my="lg">
        <Grid.Col>
          <Divider
            className={styles.commonDivider}
            label={
              <>
                <Box ml={5}>
                  <h3 id="illustration-heading">望月田吾作のイラスト</h3>
                </Box>
              </>
            }
            aria-labelledby="illustration-heading"
          />
          <TagsInput
            my={10}
            mx={100}
            data={[]}
            value={queryList}
            placeholder="Please input keywords"
            onChange={setQueryList}
            aria-label="キーワード入力"
          />
          <Divider
            my="md"
            size="xs"
            style={{
              width: "80%",
              margin: "0 auto",
            }}
            label={
              <>
                <span id="search-results-heading">検索結果</span>
              </>
            }
            aria-labelledby="search-results-heading"
          />
        </Grid.Col>
      </Grid>
      <Virtuoso
        className={styles.hexContainer}
        data={groupedIllusts}
        totalCount={groupedIllusts.length}
        itemContent={(groupIdx, group) => {
          return (
            !isValidating && (
              <div
                className={`${styles.hexRow} ${
                  groupIdx % 2 === 0 ? styles.hexRowEven : styles.hexRowOdd
                }`}
                key={groupIdx}
              >
                {group.map((illust, index) => (
                  <div
                    className={styles.hex}
                    key={index.toString() + "_" + illust.id}
                  >
                    <a
                      href={fetchPixivLink(illust.id.toString())}
                      className={styles.card}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={`${index}_${illust.id.toString()}`}
                      aria-label={`イラスト ${illust.title}`}
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={fetchUrl(illust.id.toString())}
                          alt={illust.title}
                          className={styles.illustImage}
                          loading="eager"
                          fallbackSrc="https://placehold.co/600x400?text=Loading..."
                        />
                        <p>{illust.title}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            )
          );
        }}
      />
    </div>
  );
};

export default IllustList;
