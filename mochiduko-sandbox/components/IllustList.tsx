'use client'
import useSWR from 'swr'
import Image from 'next/image';

import styles from '@/app/page.module.css'
import { Illust } from '@/types/api'

const fetcher = () => fetch('/api/mochiduko').then(res => res.json())

const IllustList: React.FC = () => {
    const { data, error } = useSWR('/api/user', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const illusts: Array<Illust> = data?.illusts ?? [];

  const fetchUrl = (id: string) => `http://embed.pixiv.net/decorate.php?illust_id=${id || ''}`

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
        <Image
            src={fetchUrl(illust.id.toString())}
            alt={illust.title}
            width={200}
            height={100}
            loading='lazy'
            className="white--text align-end"
         />
      </a>
    ))}
  </div>
}

export default IllustList