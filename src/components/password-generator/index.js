
import { Fragment, useEffect, useState } from "react";
import {
  Card,
  Container,
  Form,
  Badge,
  Row,
  Col,
  Button,
  ProgressBar,
} from "react-bootstrap";
import generator from "generate-password";
import CopyToClipboard from "components/common/CopyToClipboard";

export default () => {
  const [passwordLength, setPasswordlength] = useState(8);
  const [enableNumber, setEnableNumber] = useState(false);
  const [enableSymbols, setEnableSymbols] = useState(false);
  const [enableLowercase, setEnableLowercase] = useState(false);
  const [enableUppercase, setEnableUppercase] = useState(false);
  const [excludeSimilarCharacters, setExcludeSimilarCharacters] =
    useState(false);

  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    isSubmit && generatePasswords();
    console.log(result);
  }, [
    passwordLength,
    enableNumber,
    enableNumber,
    enableSymbols,
    enableLowercase,
    enableUppercase,
    excludeSimilarCharacters,
  ]);

  const resetCalculator = (e) => {
    e.preventDefault();
    setPasswordlength(8);
    setEnableNumber(false);
    setEnableSymbols(false);
    setEnableLowercase(false);
    setEnableUppercase(false);
    setExcludeSimilarCharacters(false);
    setResult(null);
    setIsSubmit(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    generatePasswords();
  };

  const generatePasswords = () => {
    try {
      let passwords = generator.generateMultiple(5, {
        length: passwordLength,
        uppercase: enableUppercase,
        lowercase: enableLowercase,
        numbers: enableNumber,
        symbols: enableSymbols,
        excludeSimilarCharacters,
        exclude: "",
        strict: true,
      });
      setResult(passwords);
      setError(null);
    } catch (e) {
      setError("Select any one option.");
    }
  };

  const StrengthChecker = (password) => {
    let strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    let mediumPassword = new RegExp(
      "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
    );
    if (strongPassword.test(password)) {
      return {
        variant: "success",
        length: 100,
      };
    } else if (mediumPassword.test(password)) {
      return {
        variant: "warning",
        length: 70,
      };
    } else {
      return {
        variant: "danger",
        length: 40,
      };
    }
  };
  return (
    <Card>
      <Card.Header>
        <Card.Title>Password Generator</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row className="p-3 mb-2 bg-light text-dark">
          <Col md={12} xs={12}>
            <Form.Group>
              <Form.Label>Password Length</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="10"
                min={0}
                max={100}
                value={passwordLength}
                onChange={(e) => setPasswordlength(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={12} xs={12}>
            <Form.Check
              inline
              label="Include Numbers (0-9)"
              id="Include Numbers (0-9)"
              name="group1"
              type={"checkbox"}
              checked={enableNumber}
              onChange={(e) => setEnableNumber(!enableNumber)}
            />
          </Col>
          <Col md={12} xs={12}>
            <Form.Check
              inline
              label="Include Lower Case (a-z)"
              id="Include Lower Case (a-z)"
              name="group1"
              type={"checkbox"}
              checked={enableLowercase}
              onChange={(e) => setEnableLowercase(!enableLowercase)}
            />
          </Col>
          <Col md={12} xs={12}>
            <Form.Check
              inline
              label="Include Upper Case (A-Z)"
              id="Include Upper Case (A-Z)"
              name="group1"
              type={"checkbox"}
              checked={enableUppercase}
              onChange={(e) => setEnableUppercase(!enableUppercase)}
            />
          </Col>
          <Col md={12} xs={12}>
            <Form.Check
              inline
              label="Include Symbols (!#$%&'()*+,-./:;<=>?@[\]^_`{|}~)"
              id={"Include Symbols (!#$%&'()*+,-./:;<=>?@[]^_`{|}~)"}
              name="group1"
              type={"checkbox"}
              checked={enableSymbols}
              onChange={(e) => setEnableSymbols(!enableSymbols)}
            />
          </Col>
          <Col md={12} xs={12}>
            <Form.Check
              inline
              label="No Repeated Characters"
              id={"No Repeated Characters"}
              name="group1"
              type={"checkbox"}
              checked={excludeSimilarCharacters}
              onChange={(e) =>
                setExcludeSimilarCharacters(!excludeSimilarCharacters)
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="button-section">
              <Button variant="primary" size="lg" onClick={onSubmit}>
                Generate
              </Button>
              <Button variant="secondary" size="lg" onClick={resetCalculator}>
                Clear
              </Button>
            </div>
          </Col>
        </Row>
        <section className="result-section">
          {result && (
            <section className="border p-2 rounded-1 mb-1">
              {result?.map((e, i) => {
                const { variant, length } = StrengthChecker(e);
                return (
                  <div className="response-li" key={i}>
                    <Badge bg="warning">{e}</Badge>
                    <div className="w-25">
                      <ProgressBar striped variant={variant} now={length} />
                    </div>
                    <span className="result-value">
                      <CopyToClipboard value={e} />
                    </span>
                  </div>
                );
              })}
            </section>
          )}
          {error && (
            <section className="border p-2 rounded-1 mb-1 text-danger">
              {error}
            </section>
          )}
        </section>
      </Card.Body>
      {/* <Card.Footer>
        Powered By : <a href="#">Hindishobha.com</a>
      </Card.Footer> */}
    </Card>
  );
};
