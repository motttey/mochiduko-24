"use client";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Anchor, Box, Container, Group, Image, Text } from "@mantine/core";
import React, { useState } from "react";

import styles from "@/app/page.module.css";

config.autoAddCss = false;

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
  const iconStyle: React.CSSProperties = { marginLeft: 4, fontSize: 12 };

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
    >
      <span>
        {item.label}
        {item.external && (
          <FontAwesomeIcon
            icon={faUpRightFromSquare}
            style={iconStyle}
            color="#22b8cf"
          />
        )}
      </span>
    </Anchor>
  ));

  return (
    <header>
      <Container size="md" className={styles.header}>
        <Group className={styles.inner}>
          <Image
            className={styles.hex}
            h={64}
            w={64}
            alt="header image of doraemon"
            src="./doraemon-namecard.webp"
            visibleFrom="xs"
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
