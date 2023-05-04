'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const [illustList, setIllustList]: any = useState([])
  useEffect(() => {
    const fetchIllustList = async () => {
      const response = await fetch('/api/mochiduko')
      const data: any = await response.json()
      setIllustList(data.illusts)
    }
    fetchIllustList()
  },[])

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {illustList.map((illust: any, index: number) => (
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
    </main>
  )
}
