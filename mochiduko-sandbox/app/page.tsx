import { Illust } from '@/types/api';
import styles from './page.module.css'
import IllustList from '@/components/IllustList'

export default function Home({initialContentsList}: any) {
  return (
    <main className={styles.main}>
      <IllustList initialContentsList={initialContentsList}></IllustList>
    </main>
  )
}

Home.getInitialProps = async (ctx: any) => {
  const res: any = await fetch(`https://mochiduko-api.netlify.app/each_illusts.json`)
  const data: Array<Illust> = await res.json()
  return { initialContentsList: data };
};
