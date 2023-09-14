"use client"
import Link from "next/link";
import { Divider, Header, Image } from "semantic-ui-react";
import styles from '@/app/page.module.css'

const SiteHeader: React.FC = () => {
  const title = 'Mochiduko 2024'
  return (
    <Header as='h1' dividing>
      <Image 
        spaced='right'
        className={styles.hex}
        src='https://motttey.github.io/doraemon-namecard.webp'
      />  
      <Link href="/" className="header-link" aria-label="logo">
        {title}
      </Link>
    </Header>
  )
};

export default SiteHeader;
