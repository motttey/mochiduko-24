'use client'
import { Anchor, Image, Card, Grid, Text, Title, Box, Divider } from '@mantine/core';
import styles from '@/app/page.module.css'

const Profile: React.FC = () => {
  return (
    <div className={styles.profileContainer} id="profileContainer">
        <Grid my="10" >
            <Grid.Col>
                <Title order={5} ta="center">
                    Tagosaku Mochidhuki is a <Text c="cyan" fw={700} size="lg" span>Hyper Doraemon Creator</Text> in JAPAN
                </Title>
            </Grid.Col>
        </Grid>
        <Grid my="5" >
            <Grid.Col>
                <Divider 
                    my="md"
                    label={
                        <>
                            <Box ml={5}><h2>望月田吾作について</h2></Box>
                        </>
                    }
                />
            </Grid.Col>
        </Grid>
        <Grid my="10">
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                <Card shadow="0" padding="md" radius="0">
                    <Card.Section>
                        <Image
                            src='https://motttey.github.io/doraemon-namecard.webp'
                            height={300}
                            style={{
                                maxWidth: "500px",
                                textAlign: "center"
                            }}
                            fit="cover"
                            alt="Tagosaku Mochiduki Profile"
                        />
                    </Card.Section>
                </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                <Card shadow="sm" p="lg" style={{ position: 'relative' }}>
                    <Card.Section>
                        <Text my={4}>
                            望月田吾作(もちづき たごさく)と申します。ドラえもんや藤子不二雄作品の二次創作を中心に、イラストを描いています。
                        </Text>
                        <Text my={4}>
                            お仕事のご依頼や感想は、 motitago(at)gmail.com までよろしくお願いします。
                        </Text>
                        <Text my={4}>
                            もし応援いただける場合には、
                                <Anchor
                                    className="link"
                                    target="blank"
                                    underline="always"
                                    href="https://www.amazon.jp/hz/wishlist/ls/1YEAX8DRN0GWO?ref_=wl_share"
                                >
                                    ほしいものリスト
                                </Anchor>
                                から何か送っていただけるとすごい喜びます。
                        </Text>
                        <div style={{
                            width: 0,
                            height: 0,
                            borderLeft: '15px solid transparent',
                            borderRight: '15px solid transparent',
                            borderTop: '15px solid #fff', // これはCardの背景色と同じにしてください
                            position: 'absolute',
                            bottom: '-15px', // 吹き出しの矢印の位置調整
                            left: '20px', // 吹き出しの矢印の位置調整
                        }} />
                    </Card.Section>
                </Card>
            </Grid.Col>
        </Grid>
    </div>
  )
}

export default Profile
