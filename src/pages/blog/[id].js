import { Col, Container, Row,Card } from "react-bootstrap";

export default ({ post }) => {
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
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();
  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  const paths = posts.map((e) => ({
    params: { id: e.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};
