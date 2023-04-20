import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ErrorSvg from "../../public/404.svg";
import "./404.css";

export default () => {
  return (
    <Fragment>
      <main>
        <div className="container">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <Image src={ErrorSvg} />
            </div>
            <div className="col-md-6 align-self-center">
              <h1>404</h1>
              <h2>UH OH! You're lost.</h2>
              <p>
                The page you are looking for does not exist. How you got here is
                a mystery. But you can click the button below to go back to the
                homepage.
              </p>
              <Button variant="info">
                <Link href="/">HOME</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};
