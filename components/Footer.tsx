"use client"
import Link from "next/link";
import { Container, Divider } from '@mantine/core';
import styles from '@/app/page.module.css';

const SiteFooter: React.FC = () => {
  const title = `© ${new Date().getFullYear()} Tagosaku Mochiduki`
  return (
    <footer style={{
      minWidth: "100vw"
    }}>
      <Container size="md">
        <Divider className={styles.commonDivider}></Divider>
        <Link href="/" className="footer-link" aria-label="logo">
        {title}
        </Link>
      </Container>
    </footer>
  )
};

export default SiteFooter;
