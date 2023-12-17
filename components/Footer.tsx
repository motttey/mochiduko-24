"use client"
import Link from "next/link";
import { Container, Divider } from '@mantine/core';

const SiteFooter: React.FC = () => {
  const title = `© ${new Date().getFullYear()} Tagosaku Mochiduki`
  return (
    <footer style={{
      minWidth: "100vw"
    }}>
      <Container size="md">
        <Divider className="my-4"></Divider>
        <Link href="/" className="footer-link" aria-label="logo">
        {title}
        </Link>
      </Container>
    </footer>
  )
};

export default SiteFooter;
