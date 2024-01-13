'use client'
import { Grid, Box, Divider } from '@mantine/core';

import styles from '@/app/page.module.css';

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
            </Grid>
        </div>
    )
};

export default MyWork;
