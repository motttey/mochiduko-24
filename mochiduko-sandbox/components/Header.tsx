"use client"
import Link from "next/link";
import { Header } from "semantic-ui-react";

const SiteHeader: React.FC = () => {
  const title = 'Mochiduko 2024'
  return (
    <Header as='h1'>
      <div className="bg-white lg:pb-6">
        <div className="max-w-screen-2xl px-2 md:px-4 mx-auto">
          <Link href="/" className="header-link" aria-label="logo">
            {title}
          </Link>
        </div >
      </div >
    </Header>
  )
};

export default SiteHeader;
