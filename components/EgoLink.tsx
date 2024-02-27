"use client";
import { Image, Grid, Divider, Box } from "@mantine/core";

import styles from "@/app/page.module.css";

interface MyLink {
  title: string;
  src: string;
  url: string;
  flex?: number;
}

const PIXIV_API_URL: string = "http://embed.pixiv.net/decorate.php";
const fetchUrl = (id: string) =>
  `${PIXIV_API_URL}?illust_id=${id || ""}&mode=sns-automator`;
const myLinks: Array<MyLink> = [
  {
    title: "pixiv",
    src: fetchUrl("56266129"),
    url: "https://www.pixiv.net/users/415546",
    flex: 12,
  },
  {
    title: "BOOTH",
    src: fetchUrl("58885220"),
    url: "https://motitago.booth.pm/",
    flex: 6,
  },
  {
    title: "Skeb",
    src: fetchUrl("86992637"),
    url: "https://skeb.jp/@mt_tg",
    flex: 6,
  },
  {
    title: "deviantART",
    src: fetchUrl("49554002"),
    url: "https://www.deviantart.com/motttey",
    flex: 6,
  },
  {
    title: "weibo",
    src: fetchUrl("56608401"),
    url: "https://weibo.com/7310121728",
    flex: 6,
  },
  {
    title: "X (Twitter)",
    src: fetchUrl("98419049"),
    url: "https://twitter.com/mt_tg",
    flex: 12,
  },
  {
    title: "Instagram",
    src: fetchUrl("49339965"),
    url: "https://www.instagram.com/tagosaku_mochiduki",
    flex: 6,
  },
  {
    title: "Hatena Blog",
    src: fetchUrl("83975466"),
    url: "http://motttey.hatenablog.com/",
    flex: 6,
  },
  {
    title: "Threads",
    src: fetchUrl("110011678"),
    url: "https://www.threads.net/@tagosaku_mochiduki",
    flex: 6,
  },
  {
    title: "Misskey.io",
    src: fetchUrl("98440437"),
    url: "https://misskey.io/@mt_tg",
    flex: 6,
  },
];

const chunkArray = (array: Array<MyLink>) => {
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

const handleClick = (e: { clientX: number; clientY: number }) => {
  const canvas = document.getElementById("fluidCanvas");
  if (canvas) {
    // 新しいイベントを作成し、Canvasに発火させる
    const event = new MouseEvent("click", {
      clientX: e.clientX,
      clientY: e.clientY,
    });
    canvas.dispatchEvent(event);
  }
};

const EgoLink: React.FC = () => {
  const groupedLinks = chunkArray(myLinks);
  return (
    <div
      id="egoLinkContainer"
      className={styles.egoLinkContainer}
      onClick={handleClick}
    >
      <Grid my="lg">
        <Grid.Col>
          <Divider
            className={styles.commonDivider}
            label={
              <>
                <Box ml={5}>
                  <h3>望月田吾作のリンク</h3>
                </Box>
              </>
            }
          />
        </Grid.Col>
        <div className={styles.diamondContainer}>
          {groupedLinks.map((group, groupIdx) => (
            <div
              className={`${styles.diamondRow} ${
                groupIdx % 2 === 0
                  ? styles.diamondRowEven
                  : styles.diamondRowOdd
              }`}
              key={groupIdx}
            >
              {group.map((link, index) => (
                <div
                  className={styles.diamond}
                  key={index.toString() + "_" + link.title}
                >
                  <a
                    href={link.url}
                    className={"linkHref"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={link.src}
                        className={styles.linkImage}
                        width={275}
                        height={275}
                        fit="cover"
                        alt={link.title}
                      />
                      <p>{link.title}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Grid>
    </div>
  );
};

export default EgoLink;
