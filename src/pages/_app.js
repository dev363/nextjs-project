import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import "./styles.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
