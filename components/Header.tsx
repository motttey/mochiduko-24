"use client"
import styles from '@/app/page.module.css'
import { Anchor, Container, Group, Image } from '@mantine/core';

const SiteHeader: React.FC = () => {
  const title = 'Mochiduko 2024'
  return (
    <header>
      <Container size="md" className={styles.header}>
        <Group justify="space-between" h="100%" className={styles.inner}>
          <Image 
              className={styles.hex}
              h={64}
              src='https://motttey.github.io/doraemon-namecard.webp'
            />
          <Anchor<'a'> href="/" className="header-link" aria-label="logo">
            {title}
          </Anchor>
        </Group>
      </Container>
    </header>
  )
};

export default SiteHeader;
