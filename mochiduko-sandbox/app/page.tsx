import { Illust } from '@/types/api'
import styles from './page.module.css'
import IllustList from '@/components/IllustList'

const getData = async () => {
  const res: Array<Illust> = await fetch('https://mochiduko-api.netlify.app/each_illusts.json',
    { next: { revalidate: 60  } }
  )
  .then((res) => res.json())

  return {
    data: res,
    timestamp: new Date().toString()    
  }
}

export default async function Page() {
  const res: any = await getData()

  return (
    <main className={styles.main}>
      <p>{res.timestamp}</p>
      <IllustList initialContentsList={res.data}></IllustList>
    </main>
  )
}
