'use client'
import { Image, Grid, Divider } from '@mantine/core';

const PIXIV_API_URL: string = 'http://embed.pixiv.net/decorate.php';
const myLinks: Array<any> =  [
    { 
        title: 'pixiv',
        src: PIXIV_API_URL + '?illust_id=56266129',
        url: 'https://www.pixiv.net/users/415546',
        flex: 12 
    },
    { 
        title: 'BOOTH', 
        src: PIXIV_API_URL + '?illust_id=58885220',
        url: 'https://motitago.booth.pm/',
        flex: 6
    },
    { 
        title: 'Skeb',
        src: PIXIV_API_URL + '?illust_id=86992637',
        url: 'https://skeb.jp/@mt_tg',
        flex: 6
    },
    { 
        title: 'deviantART',
        src: PIXIV_API_URL + '?illust_id=49554002',
        url: 'https://www.deviantart.com/motttey',
        flex: 6
    },
    { 
        title: 'weibo',
        src: PIXIV_API_URL + '?illust_id=56608401',
        url: 'https://weibo.com/7310121728',
        flex: 6 
    },
    { 
        title: 'X (Twitter)',
        src: PIXIV_API_URL + '?illust_id=98419049',
        url: 'https://twitter.com/mt_tg',
        flex: 12
    },
    { 
        title: 'Instagram',
        src: PIXIV_API_URL + '?illust_id=49339965',
        url: 'https://www.instagram.com/tagosaku_mochiduki',
        flex: 6
    },
    {
        title: 'Blog',
        src: PIXIV_API_URL + '?illust_id=83975466',
        url: 'http://motttey.hatenablog.com/',
        flex: 6
    },
    { 
        title: 'Threads',
        src: PIXIV_API_URL + '?illust_id=110011678',
        url: 'https://www.threads.net/@tagosaku_mochiduki',
        flex: 6
    },
    { 
        title: 'Misskey.io',
        src: PIXIV_API_URL + '?illust_id=98440437',
        url: 'https://misskey.io/@mt_tg',
        flex: 6
    }        
];

const EgoLink: React.FC<any> = (_: any) => {
  return (
    <div style={{
        maxWidth: "100vw",
        minWidth: "80vw",
    }}>
        <Grid my="5" >
            <Grid.Col>
                <h2>Links</h2>
            </Grid.Col>
        </Grid>
        <Grid my="10">
            {myLinks.map((link, index) => (
                <Grid.Col 
                    span={4}
                    key={`${index}_${link.title.toString()}`}
                >
                    <a
                        href={link.url}
                        className="myLink"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                      <div className="relative aspect-square">
                            <Image
                                src={link.src}
                                height={200}
                                fit="cover"
                                alt={link.title}
                            />
                            <p>{link.title}</p>
                        </div>
                    </a>
                </Grid.Col>
            ))}
        </Grid>
    </div>
  )
}

export default EgoLink
