// server component
import { Illust } from '@/types/api'
import styles from './page.module.css'
import IllustList from '@/components/IllustList'

const getData = async () => {
  // 1時間ごとにprefetchする
  let res: Array<Illust> = new Array<Illust>();
  
  if (process.env.DEPLOY_MODE !== "SSR") { 
    res = await fetch('https://mochiduko-api.netlify.app/each_illusts.json',
      { next: { revalidate: 60 * 60 } }
    )
    .then((res) => res.json())
  }

  return {
    data: res
  }
}

export default async function Page() {
  let initialContentsList: Array<Illust> = new Array<Illust>();
  
  if (process.env.DEPLOY_MODE !== "SSR") { 
    const res: any = await getData()
    initialContentsList = res.data;
  }
  return (
    <main className={styles.main}>
      <IllustList initialContentsList={initialContentsList}></IllustList>
    </main>
  )
}
