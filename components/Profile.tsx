'use client'
import { Text, Image, Card, Grid } from '@mantine/core';

const Profile: React.FC<any> = (_: any) => {

  return (
    <Grid className="formContainer">
        <Grid.Col>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                        src='https://motttey.github.io/doraemon-namecard.webp'
                        w={160}
                        alt="No way!"
                    />
                    <Text fw={500}>Tagosaku Mochiduki</Text>
                </Card.Section>
                <Text fw={500} size="lg" mt="md">
                    Hyper Doraemon Creator
                </Text>
            </Card>
        </Grid.Col>
    </Grid>
  )
}

export default Profile
