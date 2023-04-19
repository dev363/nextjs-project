import Image from "next/image";
import { Fragment } from "react";
import { Spinner } from "react-bootstrap";

export default function Home() {
 
  return (
    <Fragment>
      <Image
        src="https://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg"
        alt="Picture of the author"
        width={1200}
        height={600}
      ></Image>
    </Fragment>
  );
}
