
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { Container, Spinner, ListGroup, Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <Row>
        <Col col={3}>
          <ListGroup>
            <ListGroup.Item>
              <Link href="/calculators/age-calculator">Age Calculator</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link href="/calculators/time-calculator">Time Calculator</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link href="/calculators/loan-emi-calculator">Loan Calculator</Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      {/* <iframe
        frameborder="0"
        scrolling="no"
        style={{ width: "100%" }}
        src={
          "https://nextjs-project-sooty-ten.vercel.app/calculators/time-calculator"
        }
      /> */}
    </Container>
  );
}
