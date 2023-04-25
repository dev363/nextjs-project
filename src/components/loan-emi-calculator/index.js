import RangeInput from "components/common/RangeInput";
import { Fragment, useEffect, useState } from "react";
import { Card, Container, Form, Badge } from "react-bootstrap";

export default () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanInterest, setLoanInterest] = useState(10);
  const [loanTimePeriord, setLoanTimePeriord] = useState(12);

  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [value, setState] = useState(0);
  return (
    <Card>
      <Card.Header>
        <Card.Title>Loan Calculator</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
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
              isCurrency={true}
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
        {/* <section className="result-section">
          <section className="border p-2 rounded-1 mb-1">
            {result?.year && (
              <div className="response-li">
                <Badge bg="success">Year{result?.year > 0 ? "s" : ""}</Badge>
                <span className="result-value">{result?.year}</span>
              </div>
            )}
            {result?.month && (
              <div className="response-li">
                <Badge bg="warning">Month{result?.month > 0 ? "s" : ""}</Badge>
                <span className="result-value"> {result?.month} </span>
              </div>
            )}
            {result?.day && (
              <div className="response-li">
                <Badge bg="primary">Day{result?.day > 0 ? "s" : ""}</Badge>
                <span className="result-value"> {result?.day} </span>
              </div>
            )}
          </section>
          {(result?.day || result?.month || result?.year) &&
          (isTotalDays || isTotalWeeks || isTotalMonths) ? (
            <section className="border p-2 rounded-1">
              {isTotalDays && (
                <div className="response-li">
                  <Badge bg="info">Total Days</Badge>
                  <span className="result-value">{countDays()}</span>
                </div>
              )}
              {isTotalWeeks && (
                <div className="response-li">
                  <Badge bg="info">Total Weeks</Badge>
                  <span className="result-value">{countWeeks()}</span>
                </div>
              )}
              {isTotalMonths && (
                <div className="response-li">
                  <Badge bg="info">Total Months</Badge>
                  <span className="result-value">{countMonths()}</span>
                </div>
              )}
            </section>
          ) : null}
        </section> */}
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};
