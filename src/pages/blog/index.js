import Link from "next/link";
import { Col, Container, Row, Card } from "react-bootstrap";

export default ({ posts }) => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <ul class="list-group">
            {posts.map((post) => (
              <li class="list-group-item" key={post.id}>
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};
