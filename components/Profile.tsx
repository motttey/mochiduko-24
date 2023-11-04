'use client'
import { Grid } from 'semantic-ui-react';

const Profile: React.FC<any> = (props: any) => {

  return (
    <div>
        <Grid className="formContainer">
            <Grid.Column textAlign="center">
                プロフィール
            </Grid.Column>
            <Grid.Column textAlign="center">
                画像
            </Grid.Column>
        </Grid>
    </div>
  )
}

export default Profile
