// import { Illust } from '@/types/api';
import styles from './page.module.css'
import IllustList from '@/components/IllustList'

export default async function Home() {
  const res: string = await fetch('http://localhost:3000/api/mochiduko',
      { next: { revalidate: 1 } }
    )
    .then((res) => res.json())
    .then((_) => new Date().toString())

  return (
    <main className={styles.main}>
      <p>{Math.random()}</p>
      <p>{res}</p>
      <IllustList></IllustList>
    </main>
  )
}
