import { useState } from "react";
import { Button } from "react-bootstrap";

const CopyToClipboard = ({ value }) => {
  const [copy, setCopy] = useState(false);
  const copyText = () => {
    setCopy(!copy);
    let copyThis = !copy ? value : "";
    navigator.clipboard.writeText(copyThis);
  };
  return (
    <Button size="sm" onClick={(e) => copyText()} >
      {copy ? "Copied" : "Copy"}
    </Button>
  );
};
export default CopyToClipboard;
