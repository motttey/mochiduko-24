"use client";

import { Box, Divider, Grid, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

import styles from "@/app/page.module.css";
import { dispatchEventOnCanvas } from "@/app/utils/handleEvent";

/*
interface MutualLinkData {
  title: string;
  src: string;
  url: string;
  flex?: number;
}
*/

const MutualLink: React.FC = () => {
  return (
    <div
      id="mutualLinkContainer"
      className={styles.mutualLinkContainer}
      onClick={dispatchEventOnCanvas}
    >
      <Grid my="lg">
        <Grid.Col>
          <Divider
            className={styles.commonDivider}
            label={
              <Box ml={5}>
                <h3 id="illustration-heading">相互リンク</h3>
              </Box>
            }
          />

          <Text style={{ textAlign: "center" }}>
            相互リンク募集中です。 各種SNSやメールにて連絡いただけますと幸いです。
            <br />
            バナーが必要な場合は{" "}
            <Image
              className={styles.bannerImage}
              src="mochiduko_banner.jpg"
              width={200}
              height={40}
              style={{ objectFit: "cover" }}
              alt="モチヅ庫のバナー"
              unoptimized
            />{" "}
            をお使いください。
            <br />
          </Text>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default MutualLink;
