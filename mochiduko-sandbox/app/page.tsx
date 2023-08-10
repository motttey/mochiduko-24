// import { Illust } from '@/types/api';
import styles from './page.module.css'
import IllustList from '@/components/IllustList'

export default async function Page() {
  const res: any = await fetch('https://mochiduko-api.netlify.app/each_illusts.json',
      { next: { revalidate: 60  } }
    )
    .then(async (res) => { 
      return {
        data: await res.json(),
        timestamp: new Date().toString()
      }
    });

  return (
    <main className={styles.main}>
      <p>{res.timestamp}</p>
      <IllustList initialContentsList={res.data}></IllustList>
    </main>
  )
}
