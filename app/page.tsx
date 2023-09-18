// server component
import { Illust } from '@/types/api'
import styles from './page.module.css'
import IllustList from '@/components/IllustList'
import { Suspense } from 'react'

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
 
// This component passed as fallback to the Suspense boundary
// will be rendered in place of the search bar in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<SearchBar>` component.

// https://nextjs.org/docs/messages/deopted-into-client-rendering
function SearchBarFallback() {
  return <>placeholder</>
}

export default async function Page() {
  let initialContentsList: Array<Illust> = new Array<Illust>();
  
  if (process.env.DEPLOY_MODE !== "SSR") { 
    const res: any = await getData()
    initialContentsList = res.data;
  }
  return (
    <main className={styles.main}>
      <Suspense fallback={<SearchBarFallback />}>
        <IllustList initialContentsList={initialContentsList}></IllustList>
      </Suspense>
    </main>
  )
}
