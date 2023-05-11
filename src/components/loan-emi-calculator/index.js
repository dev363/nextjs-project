import { currencyValue } from "actions/common";
import RangeInput from "components/common/RangeInput";
import { Fragment, useEffect, useState, useRef } from "react";
// import * as am4core from "@amcharts/amcharts4/core";

import {
  Card,
  Container,
  Form,
  Badge,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("./pieChart"), { ssr: false });

export default () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanInterest, setLoanInterest] = useState(10);
  const [loanTimePeriord, setLoanTimePeriord] = useState(12);
  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);

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

  useEffect(() => {
    calculateEMI();
  }, [isSubmit, loanAmount, loanInterest, loanTimePeriord]);

  const calculateEMI = () => {
    var time = Number(loanTimePeriord);
    var rate = Number(loanInterest);
    var amount = Number(loanAmount);

    var principal = parseFloat(amount);
    var interest = parseFloat(rate) / 100 / 12;
    var payments = parseFloat(time);

    var x = Math.pow(1 + interest, payments);
    var emi = (principal * x * interest) / (x - 1);

    setResult({
      monthltEmi: emi,
      total: emi * payments,
      totalInterest: emi * payments - principal,
    });
    setChartData({
      principal,
      emi: emi * payments - principal,
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
                  <Badge bg="success">A) Loan Amount</Badge>
                  <span className="result-value">
                    {currencyValue(loanAmount)}
                  </span>
                </div>
              )}
              {result?.totalInterest && (
                <div className="response-li">
                  <Badge bg="secondary">B) Total Interest</Badge>
                  <span className="result-value">
                    {currencyValue(result?.totalInterest)}
                  </span>
                </div>
              )}

              {result?.totalInterest && (
                <div className="response-li">
                  <Badge bg="info">C) Total Payable Amount (A+B) </Badge>
                  <span className="result-value">
                    {currencyValue(Number(result?.total))}
                  </span>
                </div>
              )}

              {result?.monthltEmi && (
                <div className="response-li">
                  <Badge bg="warning">D) Monthly EMI</Badge>
                  <span className="result-value">
                    {currencyValue(result.monthltEmi)}
                  </span>
                </div>
              )}
            </section>
            <LineChart data={chartData} />
          </section>
        )}
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};
