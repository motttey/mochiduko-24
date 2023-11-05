'use client'
import { Grid, Card } from 'semantic-ui-react';

const Profile: React.FC<any> = (_: any) => {

  return (
    <div>
        <Grid.Row className="formContainer">
            <Grid.Column textAlign="center">
                <Card>
                    <Card.Content>
                    <Card.Header>Tagosaku Mochiduki</Card.Header>
                    <Card.Meta>
                        {/* <span className='date'>Joined in 2015</span> */}
                    </Card.Meta>
                    <Card.Description>
                        Hyper Doraemon Creator
                    </Card.Description>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column textAlign="center">
                {/* 画像 */}
            </Grid.Column>
        </Grid.Row>
    </div>
  )
}

export default Profile
