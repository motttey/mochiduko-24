'use client'
import useSWR from 'swr'
import styles from '@/app/page.module.css'
import { Illust } from '@/types/api'

const fetcher = () => fetch('/api/mochiduko').then(res => res.json())

const IllustList: React.FC = () => {
    const { data, error } = useSWR('/api/user', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const illusts: Array<Illust> = data?.illusts ?? [];

  return <div className={styles.grid}>
    {illusts.map((illust: Illust, index: number) => (
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

export default IllustList