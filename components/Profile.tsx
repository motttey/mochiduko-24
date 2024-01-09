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
        <Grid my="10" className={styles.profileGrid}>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }} className={styles.profileCol}>
                <Card 
                    shadow="0"
                    padding="md"
                    radius="0"
                    className={styles.profileImage}
                >
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
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }} className={styles.profileCol}>
                <Card 
                    p="lg"
                    className={styles.profileDescription}
                >
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
                    </Card.Section>
                </Card>
            </Grid.Col>
        </Grid>
    </div>
  )
}

export default Profile
