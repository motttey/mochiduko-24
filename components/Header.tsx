"use client";

import React, { useState } from "react";
import { Anchor, Box, Container, Group, Image, Text } from "@mantine/core";
import styles from "@/app/page.module.css";

const linksHref = [
  { link: "#profileContainer", label: "Profile" },
  { link: "#worksContainer", label: "Works" },
  { link: "#egoLinkContainer", label: "Links" },
  { link: "#illustContainer", label: "Illusts" },
  { link: "https://motttey.github.io/dialy/", label: "Dialy" },
];

const SiteHeader: React.FC = () => {
  const title = "モチヅ庫'24";
  const [active, setActive] = useState(0);

  const mainItems = linksHref.map((item, index) => (
    <Anchor<"a">
      href={item.link}
      key={item.label}
      data-active={index === active || undefined}
      className={styles.mainLink}
      onClick={() => {
        setActive(index);
      }}
      visibleFrom="xs"
    >
      {item.label}
    </Anchor>
  ));

  return (
    <header>
      <Container size="md" className={styles.header}>
        <Group justify="space-between" className={styles.inner}>
          <Image
            className={styles.hex}
            h={64}
            alt="header image of doraemon"
            src="./doraemon-namecard.webp"
          />
          <Box className={styles.links}>
            <Group justify="flex-end">
              <Text c="cyan" fw={700} size="lg" span>
                {title}
              </Text>
            </Group>
            <Group gap={0} justify="space-between" className={styles.mainLinks}>
              {mainItems}
            </Group>
          </Box>
        </Group>
      </Container>
    </header>
  );
};

export default SiteHeader;
