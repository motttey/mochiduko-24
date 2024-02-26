'use client'
import { Anchor, Image, Card, Grid, Text, Title, Box, Divider } from '@mantine/core';
import styles from '@/app/page.module.css';

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
                    className={styles.commonDivider}
                    label={
                        <>
                            <Box ml={5}><h3>望月田吾作について</h3></Box>
                        </>
                    }
                />
            </Grid.Col>
        </Grid>
        <Grid my="5" className={styles.profileGrid}>
            <Grid.Col span={{ base: 12, md: 8, lg: 6 }} className={styles.profileCol}>
                <Card 
                    shadow="0"
                    padding="md"
                    radius="0"
                    className={styles.profileImage}
                >
                    <Card.Section>
                        <Image
                            src="dora2024.webp"
                            height={500}
                            fit="cover"
                            alt="Tagosaku Mochiduki Profile"
                        />
                    </Card.Section>
                </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 6 }} className={styles.profileCol}>
                <Card 
                    p="lg"
                    className={styles.profileDescription}
                >
                    <Card.Section my="-1rem" p="1rem">
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
                        <Image
                            src="signature.png"
                            height={60}
                            fit="contain"
                            alt="Tagosaku Mochiduki Signature"
                            style={{ filter: "invert(1)" }}
                        />
                    </Card.Section>
                </Card>
            </Grid.Col>
        </Grid>
    </div>
  )
}

export default Profile;
