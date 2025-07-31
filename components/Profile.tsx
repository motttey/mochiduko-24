"use client";

import {
  Anchor,
  Image,
  Card,
  Grid,
  Text,
  Title,
  Box,
  Divider,
  Code,
} from "@mantine/core";
import React from "react";

import styles from "@/app/page.module.css";

const Profile: React.FC = () => {
  return (
    <div className={styles.profileContainer} id="profileContainer">
      <Grid mb="10">
        <Grid.Col>
          <Divider
            className={styles.topDivider}
            label={
              <Box mr={5} ml={5}>
                <h3>望月田吾作について</h3>
              </Box>
            }
          />
        </Grid.Col>
      </Grid>
      <Grid mb="50" visibleFrom="sm">
        <Grid.Col>
          <Title mr={20} ml={20} order={5} ta="center">
            Tagosaku Mochidhuki is a{" "}
            <Text c="cyan" fw={700} size="md" span>
              Hyper Doraemon Creator
            </Text>{" "}
            in JAPAN
          </Title>
        </Grid.Col>
      </Grid>
      <Grid my="5" className={styles.profileGrid} justify="center">
        <Grid.Col
          span={{ base: 12, md: 8, lg: 8 }}
          className={styles.profileCol}
        >
          <Card
            shadow="0"
            padding="md"
            radius="0"
            className={`${styles.profileImage} ${styles.profileImageClipped}`}
          >
            <Card.Section>
              <Image
                src="dora_topbg.webp"
                height={400}
                alt="Tagosaku Mochiduki Profile Image"
                style={{ objectFit: "cover", objectPosition: "left" }}
              />
            </Card.Section>
          </Card>
        </Grid.Col>
        <Grid.Col className={styles.profileCol}>
          <Card p="lg" className={styles.profileDescription}>
            <Card.Section my="-1rem" p="1rem">
              <Text my={4}>
                <Text span fw={700}>
                  望月田吾作(もちづき たごさく)
                </Text>
                と申します。ドラえもんや藤子不二雄作品の二次創作を中心に、イラストを描いています。
              </Text>
              <Text my={4}>
                お仕事のご依頼や感想は、{" "}
                <Text span fw={700}>
                  <Code>motitago(at)gmail.com</Code>
                </Text>
                までよろしくお願いします。
              </Text>
              <Text my={4}>
                もし応援いただける場合には、
                <Anchor
                  className="link"
                  target="blank"
                  underline="always"
                  href="https://www.amazon.jp/hz/wishlist/ls/1YEAX8DRN0GWO?ref_=wl_share"
                  fw={700}
                >
                  ほしいものリスト
                </Anchor>
                から何か送っていただけるとすごい喜びます。
              </Text>
              <Image
                src="signature.png"
                height={100}
                fit="contain"
                alt="Tagosaku Mochiduki Signature"
                style={{ filter: "invert(1)" }}
              />
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Profile;
