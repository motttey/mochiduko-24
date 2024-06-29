"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
import { Anchor, Box, Container, Group, Image, Text } from "@mantine/core";

import styles from "@/app/page.module.css";

const linksHref = [
  { link: "#profileContainer", label: "Profile", external: false },
  { link: "#worksContainer", label: "Works", external: false },
  { link: "#egoLinkContainer", label: "Links", external: false },
  { link: "#illustContainer", label: "Illusts", external: false },
  { link: "https://motttey.github.io/dialy/", label: "Dialy", external: true },
];
const SiteHeader: React.FC = () => {
  const title = "モチヅ庫'24";
  const [active, setActive] = useState(0);
  const mainItems = linksHref.map((item, index) => (
    <Anchor<"a">
      href={item.link}
      key={item.label}
      target={item.external ? "_blank" : "_self"}
      data-active={index === active || undefined}
      className={styles.mainLink}
      onClick={() => {
        setActive(index);
      }}
      visibleFrom="xs"
    >
      <span>{item.label}</span>
      {item.external && (
        <FontAwesomeIcon
          icon={faUpRightFromSquare}
          className={styles.icon}
          size="sm"
          color="#22b8cf"
        />
      )}
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
