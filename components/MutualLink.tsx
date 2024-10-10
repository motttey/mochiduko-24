"use client";

import { Grid, Divider, Box } from "@mantine/core";
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
              <>
                <Box ml={5}>
                  <h3>相互リンク</h3>
                </Box>
              </>
            }
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default MutualLink;
