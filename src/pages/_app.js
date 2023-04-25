import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "components/Layout/Navbar";
import { Container } from "react-bootstrap";
import "styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Navbar />
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
