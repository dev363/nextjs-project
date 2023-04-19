import Image from "next/image";
import { Card, Container, Row, Col } from "react-bootstrap";

export default function Posts({ post }) {
  console.log(post, 122333);
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>
              <Card.Title>{post.title}</Card.Title>
            </Card.Header>
            <Card.Body>{post.body}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`);
  const post = await res.json();
  //   console.log(post, 8989);
  return { props: { post } };
}
