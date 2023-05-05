'use client'

import useSWR from 'swr'
import styles from './page.module.css'
import { ReactNode, useState } from 'react'

const fetcher = () => fetch('/api/mochiduko').then(res => res.json())

export default function Home() {
  const { data, error } = useSWR('/api/user', fetcher)

  async function fetchIllustList(): Promise<ReactNode>{
  
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    const illusts = data?.illusts ?? [];

    return <div className={styles.grid}>
      {illusts.map((illust: any, index: number) => (
        <a
          href={illust.url}
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
        >
          <h2>
            {illust.title}
          </h2>
          <p>{illust.date}</p>
        </a>
      ))}
    </div>
  }

  const [element, setElement] = useState<ReactNode>(null)

  fetchIllustList().then((illustList) => {
    setElement(illustList);
  });

  return (
    <main className={styles.main}>
      {element}
    </main>
  )
}
