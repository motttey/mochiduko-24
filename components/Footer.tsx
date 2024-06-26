"use client";

import React from "react";
import Link from "next/link";
import { Container, Divider } from "@mantine/core";
import styles from "@/app/page.module.css";

const SiteFooter: React.FC = () => {
  const title = `© ${new Date().getFullYear()} Tagosaku Mochiduki`;
  return (
    <footer
      style={{
        minWidth: "100vw",
        fontWeight: "700",
        margin: "10px 0px",
        color: "#868e96",
      }}
    >
      <Container size="md">
        <Divider
          className={styles.commonDivider}
          style={{
            marginBottom: "10px",
          }}
        ></Divider>
        <Link href="/" className="footer-link" aria-label="logo">
          {title}
        </Link>
      </Container>
    </footer>
  );
};

export default SiteFooter;
