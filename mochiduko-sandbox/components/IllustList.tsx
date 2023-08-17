'use client'
import useSWR from 'swr'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Grid, Input, Image} from 'semantic-ui-react';

import styles from '@/app/page.module.css'
import { Illust } from '@/types/api';
import { useState, useEffect, useMemo, useRef } from 'react';

const IllustList: React.FC<{initialContentsList: Array<Illust>}> = (props: any) => {
  const [isProcessing, setIsProcessing] = useState(true)
  const fetcher = () => fetch('/api/mochiduko').then((res) => {
    setIsProcessing(false);
    return res.json();
  });
  
  const { data, error } = useSWR(
    '/api/user',
    fetcher,
    {refreshInterval: (isProcessing) ? 5000 : 0}
  );

  const [illusts, setIllusts] = useState(props.initialContentsList);
  const [filterdIllusts, setFilteredIllusts] = useState([] as  Array<Illust>);

  const searchParams = useSearchParams();
  const router = useRouter()
  const pathname = usePathname()

  const [query, setQuery] = useState(searchParams.get("title" || ''));
  const illustsRef = useRef(illusts);

  useMemo(() => {
    const fetchedIllust: Array<Illust> = data?.illusts ?? [];
    setIllusts(fetchedIllust);
    setFilteredIllusts(fetchedIllust);
  }, [data?.illusts]);

  useEffect(() => {
    illustsRef.current = illusts
  }, [illusts]);

  useEffect(() => {
    const filterdIllusts = illustsRef.current.filter((illust: Illust) => illust.title.includes(query || ''));
    setFilteredIllusts(filterdIllusts);
  }, [query, illustsRef]);


  useEffect(() => {
    const params = new URLSearchParams()
    params.set('title', query || '')
    router.push(pathname + '?' + params.toString())
  }, [pathname, query, router]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const fetchUrl = (id: string) => `http://embed.pixiv.net/decorate.php?illust_id=${id || ''}&mode=sns-automator`;
  const fetchPixivLink = (id: string) => `https://www.pixiv.net/artworks/${id || ''}`;

  return <div>
    <Grid className="formContainer">
      <Grid.Column textAlign="center">
        <Input placeholder='Search...' value={query || ''} onChange={(e) => setQuery(e.target.value)}/>
      </Grid.Column>
    </Grid>
    <Grid className="illustList">
      {filterdIllusts.map((illust: Illust, index: number) => (
        <Grid.Column 
          mobile={16} tablet={8} computer={4}
          key={index.toString() + '_' + illust.id}
        >
          <a
            href={fetchPixivLink(illust.id.toString())}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
            key={illust.id}
          >
            <h2>
              {illust.title}
            </h2>
            <p>{illust.date}</p>
            <div className={styles.hex}>
              <div className="relative aspect-square">
                <Image
                  centered
                  fluid
                  src={fetchUrl(illust.id.toString())}
                  alt={illust.title}
                  style={{objectFit: "contain"}}
                  loading='lazy'
                  className="illust_image"
                />
              </div>
            </div>
          </a>
        </Grid.Column>
      ))}
    </Grid>
  </div>;
}

export default IllustList