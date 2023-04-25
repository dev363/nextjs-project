import { currencyValue } from "actions/common";
import RangeInput from "components/common/RangeInput";
import { Fragment, useEffect, useState } from "react";
import {
  Card,
  Container,
  Form,
  Badge,
  Row,
  Col,
  Button,
} from "react-bootstrap";

export default () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanInterest, setLoanInterest] = useState(10);
  const [loanTimePeriord, setLoanTimePeriord] = useState(12);
  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    isSubmit && calculateEMI();
  }, [isSubmit]);

  const resetCalculator = () => {
    setLoanAmount(0);
    setLoanInterest(0);
    setLoanTimePeriord(0);
    setIsSubmit(false);
    setResult(null);
  };
  const onSubmit = (e) => {
    setIsSubmit(true);
    calculateEMI();
  };

  const calculateEMI = () => {
    var numberOfMonths = Number(loanTimePeriord);
    var rateOfInterest = Number(loanInterest);
    var monthlyInterestRatio = rateOfInterest / 100 / 12;

    var top = Math.pow(1 + monthlyInterestRatio, numberOfMonths);
    var bottom = top - 1;
    var sp = top / bottom;
    var emi = loanAmount * monthlyInterestRatio * sp;
    var full = numberOfMonths * emi;
    var interest = full - loanAmount;
    var int_pge = (interest / full) * 100;

    console.log(top, bottom, sp, emi, full, interest, int_pge);

    setResult({
      monthltEmi: emi,
      totalInterest: interest,
      totalPay: full,
      totalInterest: int_pge,
    });
  };
  return (
    <Card>
      <Card.Header>
        {/* <Card.Title>Loan Calculator</Card.Title> */}
      </Card.Header>
      <Card.Body>
        <Form as={Row}>
          <Form.Group>
            <Form.Label>Loan Amount</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="1,00,000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              min={0}
            />
            <RangeInput
              value={loanAmount}
              max={10000000}
              step={500}
              iscurrency={"true"}
              onChange={setLoanAmount}
            ></RangeInput>
          </Form.Group>
          <Form.Group>
            <Form.Label>Loan Interest</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="12"
              value={loanInterest}
              onChange={(e) => setLoanInterest(e.target.value)}
              min={0}
            />

            <RangeInput
              value={loanInterest}
              max={20}
              step={1}
              onChange={setLoanInterest}
            ></RangeInput>
          </Form.Group>
          <Form.Group>
            <Form.Label>Time Periord</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="12"
              value={loanTimePeriord}
              onChange={(e) => setLoanTimePeriord(e.target.value)}
              min={0}
            />
            <RangeInput
              value={loanTimePeriord}
              max={12}
              step={1}
              onChange={setLoanTimePeriord}
            ></RangeInput>
          </Form.Group>
        </Form>
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
        {result?.monthltEmi && (
          <section className="result-section">
            <section className="border p-2 rounded-1 mb-1">
              {loanAmount && (
                <div className="response-li">
                  <Badge bg="success">Loan Amount</Badge>
                  <span className="result-value">
                    {currencyValue(loanAmount)}
                  </span>
                </div>
              )}
              {result?.totalInterest && (
                <div className="response-li">
                  <Badge bg="success">Total Interest</Badge>
                  <span className="result-value">
                    {currencyValue(result?.totalInterest)}
                  </span>
                </div>
              )}

              {result?.totalInterest && (
                <div className="response-li">
                  <Badge bg="info">Total Payable Amount</Badge>
                  <span className="result-value">
                    {currencyValue(
                      Number(result?.totalInterest) + Number(loanAmount)
                    )}
                  </span>
                </div>
              )}

              {result?.monthltEmi && (
                <div className="response-li">
                  <Badge bg="warning">Monthly EMI</Badge>
                  <span className="result-value">
                    {currencyValue(result.monthltEmi)}{" "}
                  </span>
                </div>
              )}
            </section>
          </section>
        )}
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};
