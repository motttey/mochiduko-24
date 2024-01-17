'use client'
import { Grid, Box, Divider, Image, Card, Text } from '@mantine/core';
import styles from '@/app/page.module.css';

interface MyWorks {
    title: string;
    year: number;
    src: string;
    url: string;
    description: string;
    flex?: number;
}

const worksArray: Array<MyWorks> = [
    {
      title: 'THE BOOK OF CIRCLES',
      year: 2022,
      src: 'bookofcircles.jpg',
      url: 'https://motitago.booth.pm/items/4441457',
      description: '2018-2022年に描いたドラえもんイラストメインにしたイラスト集です. C101にて頒布. B5 フルカラー / 36ページ (本文32ページ)',
      flex: 6
    },
    {
      title: 'フジコ・スピリット',
      year: 2022,
      src: 'fujikospirits.jpg',
      url: 'https://motttey.github.io/c101/',
      description: '藤子不二雄作品が好きな11名による一次創作合同誌 表紙イラストを担当',
      flex: 6
    },
    {
      title: 'モチヅ庫 10th Special Site',
      year: 2018,
      src: '10th.png',
      url: 'https://motttey.github.io/10th/',
      description: 'pixivに登録して10年たった記念に作ったサイトです. pixivのイラストをタグで検索できたり, 投稿数の統計とかもみれます. お祝いのコメントも入力できるのでお待ちしてます. ',
      flex: 6
    },
    {
      title: 'Perfect Blue',
      year: 2017,
      src: 'perfectblue.jpg',
      url: 'https://motitago.booth.pm/items/4441438',
      description: '青色のイラストをメインにしたイラスト集です. C93にて頒布. (C101で再販) B5 フルカラー / 32ページ (本文28ページ)',
      flex: 6
    },
    {
      title: 'パラレルソレイユ 9',
      year: 2017,
      src: 'parallel9.jpg',
      url: 'https://booth.pm/ja/items/723395',
      description: 'ひぐちあき様主催の藤子ファンの藤子ファンによる藤子ファンのための同人誌です. 表紙イラストを担当し, 喪黒さんを描かせていただきました. C93頒布. カラーページ込みA5 102ページ',
      flex: 6
    },
    {
      title: 'DORA THE PAST',
      year: 2016,
      src: 'dorathepast.jpg',
      url: 'https://www.deviantart.com/motttey',
      description: '[SOLD OUT] 2008-2016あたりに描いてきたドラえもん関連イラストの総集編 + 描き下しイラストな画集っぽい感じの本です. C91にて頒布 B5 96ページ, 収録作品数189',
      flex: 6
    }
];

const MyWork: React.FC = () => {
    return (
        <div className={styles.profileContainer} id="worksContainer">
            <Grid my="5" >
                <Grid.Col>
                    <Divider 
                        my="md"
                        label={
                            <>
                                <Box ml={5}><h2>望月田吾作の作品</h2></Box>
                            </>
                        }
                    />
                </Grid.Col>
            </Grid>
            <Grid my="5" className="worksGrid">
            {worksArray.map((work) => (
                <Grid.Col 
                    span={{ base: 12, md: 6, lg: 4 }}
                    key={work.title}
                    style={{
                        paddingBottom: "10px"
                    }}
                >
                    <Card
                        shadow="sm"
                        padding="md"
                        mx={{ base: "xl", md: "lg" }}
                        component="a"
                        href={work.url}
                        target="_blank"
                    >
                        <Card.Section>
                            <Image
                                src={work.src}
                                h={250}
                                alt={work.title}
                            />
                        </Card.Section>

                        <Text fw={500} size="lg" mt="md">
                            {work.title}
                        </Text>

                        <Text mt="xs" c="dimmed" size="sm">
                            {work.description}
                        </Text>
                    </Card>
                </Grid.Col>
            ))}
            </Grid>
        </div>
    )
};

export default MyWork;
