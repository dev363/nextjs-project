import Navbar from "components/Layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Container, Spinner } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <Navbar />
      <Link href={"/calculators/age-calculator"}>Age Calculator</Link>
    </Container>
  );
}
