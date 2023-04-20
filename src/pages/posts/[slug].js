import Image from "next/image";
import { Card, Container, Row, Col } from "react-bootstrap";

export default function Posts({ post }) {
  return (
    <Container>
      <Row>
        <Col md={4}>
          {!post?.id ? (
            <Card>
              <Card.Body>Post Not Found</Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Header>
                <Card.Title>{post.title}</Card.Title>
              </Card.Header>
              <Card.Body>{post.body}</Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export async function getServerSideProps({ params }) {
  // console.log(params, 9090)
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.slug}`
  );
  const post = await res.json();
  //   console.log(post, 8989);
  return { props: { post } };
}
