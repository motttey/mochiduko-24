import styles from './page.module.css'
import IllustList from '@/components/IllustList'

export default function Home() {
  return (
    <main className={styles.main}>
      <IllustList></IllustList>
    </main>
  )
}
