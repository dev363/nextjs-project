import { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link href="/">Nextjs</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Item>
              <Link href="/">Home</Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/blog">Blogs</Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/posts">Post</Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
