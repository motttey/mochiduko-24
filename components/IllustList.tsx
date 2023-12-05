'use client'
import useSWR from 'swr'
import { useState, useEffect, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Grid, Input, Image, Alert } from '@mantine/core';

import styles from '@/app/page.module.css'
import { Illust } from '@/types/api';

const chunkArray = (array: Array<Illust>) => {
  const results = [];
  let count = 0;
  
  while (count < array.length) {
    if (results.length % 2 === 0) {
      // 偶数行: 4要素
      results.push(array.slice(count, count + 4));
      count += 4;
    } else {
      // 奇数行: 3要素
      results.push(array.slice(count, count + 3));
      count += 3;
    }
  }
  
  return results;
};

const isProd = process.env.NODE_ENV === 'production'
const prefixPath = isProd ? '/mochiduko-24' : ''

const IllustList: React.FC<{initialContentsList: Array<Illust>}> = (props: any) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const fetcher = () =>  fetch(prefixPath + '/api/mochiduko').then((res) => {
      setIsProcessing(false);
      return res.json();
    });
  
  const { data, error } = useSWR(
    '/api/mochiduko',
    fetcher,
    {refreshInterval: (isProcessing) ? 5000 : 0}
  );

  const [illusts, setIllusts] = useState(props.initialContentsList);
  const [filterdIllusts, setFilteredIllusts] = useState([] as  Array<Illust>);
  const [groupedIllusts, setGroupedIllusts] = useState([] as Array<Array<Illust>>);

  const searchParams = useSearchParams();
  const router = useRouter()
  const pathname = usePathname()

  const [query, setQuery] = useState(searchParams.get("title" || ''));
  const [queryList, setQueryList] = useState([]);

  useMemo(() => {
    const fetchedIllust: Array<Illust> = data?.illusts ?? [];
    setIllusts(fetchedIllust);
  }, [data?.illusts]);

  useEffect(() => {
    const filterdIllusts = 
      ((query && query.length > 0) ? illusts.filter(
          (illust: Illust) => illust.title.includes(query)
        ) : illusts)
        .sort(() => Math.random() - 0.5);
    setFilteredIllusts(filterdIllusts);
  }, [query, illusts]);
    
  useMemo(() => {
    const groupedIllusts = chunkArray(filterdIllusts);
    setGroupedIllusts(groupedIllusts);
  }, [filterdIllusts]);

  if (error) return (
    <Alert variant="light" color="red" title="Failed to load">
      failed to load
    </Alert>
  );

  if (!data || data.length === 0) return <div>loading...</div>;

  const fetchUrl = (id: string) => `http://embed.pixiv.net/decorate.php?illust_id=${id || ''}&mode=sns-automator`;
  const fetchPixivLink = (id: string) => `https://www.pixiv.net/artworks/${id || ''}`;

  const handleChangeQuery = (value: string) => {
    // パラメータをセット
    setQuery(value);
  }
  const handleOnBlur = () => {
    // 対象のパスに遷移
    const params = new URLSearchParams()
    params.set('title', query || '')
    router.replace(pathname + '?' + params.toString());
  }

  return (
    <div style={{maxWidth: "100%"}}>
      <Grid className="formContainer">
        <Grid.Col>
          <h2>My Illust List (from pixiv)</h2>
          <div className='illustFilterTag' style={{
            marginBottom: "5px"
          }}>
            {
              /*
                {query ? <Label as='span' color='teal' tag>
                  {query}
                </Label>: ''}
              */
            }
          </div>
          <Input 
            placeholder='Search...'
            value={query || ''}
            onChange={(e) => handleChangeQuery(e.target.value)}
            onBlur={() => handleOnBlur()}
          />
        </Grid.Col>
      </Grid>
      {groupedIllusts.map((group, groupIdx) => (
        <div 
          className={
            `${styles.hexRow} ${(groupIdx % 2 === 0) ? 
            styles.hexRowEven : 
            styles.hexRowOdd}`
          }
          key={groupIdx}
        >
          {group.map((illust, index) => (
            <div
              className={styles.hex}
              key={index.toString() + '_' + illust.id}
              >
              <a
                href={fetchPixivLink(illust.id.toString())}
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
                key={`${index}_${illust.id.toString()}`}
              >
                {/*
                  <h2>
                    {illust.title}
                  </h2>
                  <p>{illust.date}</p>
                */}
                  <div className="relative aspect-square">
                    <Image
                      src={fetchUrl(illust.id.toString())}
                      alt={illust.title}
                      style={{objectFit: "cover"}}
                      className={styles.illustImage}
                    />
                    <p>{illust.title}</p>
                  </div>
              </a>
              </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default IllustList
