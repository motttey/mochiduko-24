'use client'
import { Image, Card, Grid, Blockquote } from '@mantine/core';

const Profile: React.FC<any> = (_: any) => {
  return (
    <div style={{
        maxWidth: "100vw",
        minWidth: "80vw"
    }}>
        <Grid my="base" >
            <Grid.Col>
                <h2>Profile</h2>
            </Grid.Col>
        </Grid>
        <Grid my="base" >
            <Grid.Col span={6}>
                <Card shadow="sm" padding="md" radius="20">
                    <Card.Section>
                        <Image
                            src='https://motttey.github.io/doraemon-namecard.webp'
                            height={360}
                            alt="Tagosaku Mochiduki Profile"
                        />
                    </Card.Section>
                </Card>
            </Grid.Col>
            <Grid.Col span={6}>
                <Card shadow="sm" padding="md" radius="20">
                    <Card.Section>
                        <Blockquote cite="Tagosaku Mochiduki">
                            He is a Hyper Doraemon Creator
                        </Blockquote>
                    </Card.Section>
                </Card>
            </Grid.Col>
        </Grid>
    </div>
  )
}

export default Profile
