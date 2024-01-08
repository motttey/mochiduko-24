"use client"
import styles from '@/app/page.module.css'
import { Anchor, Box, Container, Group, Image } from '@mantine/core';
import { useState } from 'react';

const linksHref = [
  { link: '#profileContainer', label: 'Profile' },
  { link: '#egoLinkContainer', label: 'Links' },
  { link: '#illustContainer', label: 'Works' }
];

const SiteHeader: React.FC = () => {
  const title = 'Mochiduko 2024'
  const [active, setActive] = useState(0);

  const mainItems = linksHref.map((item, index) => (
    <Anchor<'a'>
      href={item.link}
      key={item.label}
      data-active={index === active || undefined}
      className={styles.mainLink}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
      }}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <header>
      <Container size="md" className={styles.header}>
        <Group justify="space-between" h="100%" className={styles.inner}>
          <Image 
              className={styles.hex}
              h={64}
              alt="header image of doraemon"
              src='https://motttey.github.io/doraemon-namecard.webp'
            />
          {/*
          <Anchor<'a'> href="/" className="header-link" aria-label="logo">
            {title}
          </Anchor>
          */}
          <Box className={styles.links} visibleFrom="sm">
            <Group justify="flex-end">{title}</Group>
            <Group gap={0} justify="flex-end" className={styles.mainLinks}>
              {mainItems}
            </Group>
          </Box>
        </Group>
      </Container>
    </header>
  )
};

export default SiteHeader;
