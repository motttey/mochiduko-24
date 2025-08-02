import { Container, Title, Text, Button, Center } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ height: "90vh" }}>
      <Center style={{ height: "100%" }}>
        <Container>
          <div style={{ textAlign: "center" }}>
            <Title
              order={1}
              style={{ fontSize: "2.5rem", fontWeight: "bold" }}
              mb={20}
            >
              404
            </Title>
            <Text size="xl" mt={12}>
              Page Not Found
            </Text>
            <Image
              src="/404notfound.webp"
              alt="404 Not Found"
              width={400}
              height={400}
              style={{
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                margin: "0 auto",
              }}
              unoptimized={true}
            />
            <Text mt={20}> お探しのページは見つかりませんでした。</Text>
            <Button
              component={Link}
              href="/"
              variant="outline"
              size="md"
              my={10}
            >
              ホームに戻る
            </Button>
          </div>
        </Container>
      </Center>
    </div>
  );
}
