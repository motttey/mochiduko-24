"use client"
import Link from "next/link";
import { Divider, Header, Image } from "semantic-ui-react";

const SiteHeader: React.FC = () => {
  const title = 'Mochiduko 2024'
  return (
    <Header as='h1'>
      <Image spaced='right' circular alt="header-img" src='https://motttey.github.io/doraemon-namecard.webp' />  
      <Link href="/" className="header-link" aria-label="logo">
        {title}
      </Link>
      <Divider horizontal>◇</Divider>
    </Header>
  )
};

export default SiteHeader;
