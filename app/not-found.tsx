import { Container, Title, Text, Center, Anchor } from "@mantine/core";
import Image from "next/image";

export default function NotFound() {
  return (
    <div style={{ height: "90vh" }}>
      <Center style={{ height: "100%" }}>
        <Container>
          <div style={{ textAlign: "center" }}>
            <Title
              order={1}
              style={{ fontSize: "2.5rem", fontWeight: "bold" }}
              mb={10}
            >
              404
            </Title>
            <Text size="xl" my={12}>
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
            <Text my={20}> お探しのページは見つかりませんでした。</Text>
            <Anchor href="/">ホームに戻る</Anchor>
          </div>
        </Container>
      </Center>
    </div>
  );
}
