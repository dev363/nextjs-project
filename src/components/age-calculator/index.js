import { Fragment, useEffect, useState } from "react";
import { Card, Container, Form, Badge } from "react-bootstrap";

export default () => {
  const [startDate, setStartDate] = useState("07/04/1997");
  const [endDate, setEndDate] = useState(new Date());
  const [result, setResult] = useState({});

  const [isTotalDays, setIsTotalDays] = useState(false);
  const [isTotalWeeks, setIsTotalWeeks] = useState(false);
  const [isTotalMonths, setIsTotalMonths] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      getAge(startDate, endDate);
    }
  }, [startDate, endDate]);

  const getAge = (fromdate, todate) => {
    if (todate) todate = new Date(todate);
    else todate = new Date();

    var age = {},
      fromdate = new Date(fromdate),
      y = [todate.getFullYear(), fromdate.getFullYear()],
      ydiff = y[0] - y[1],
      m = [todate.getMonth(), fromdate.getMonth()],
      mdiff = m[0] - m[1],
      d = [todate.getDate(), fromdate.getDate()],
      ddiff = d[0] - d[1];
    console.log(y, m, d, 89898)

    if (mdiff < 0 || (mdiff === 0 && ddiff < 0)) --ydiff;
    if (mdiff < 0) mdiff += 12;
    if (ddiff < 0) {
      fromdate.setMonth(m[1] + 1, 0);
      ddiff = fromdate.getDate() - d[1] + d[0];
      --mdiff;
    }
    if (ydiff > 0) {
      age["year"] = ydiff;
    }

    if (mdiff > 0) {
      age["month"] = mdiff;
    }
    if (ddiff > 0) {
      age["day"] = ddiff;
    }
    setResult(age);
  };

  const countDays = () => {
    return (
      Number(result?.day || 0) +
      Number(result?.month || 0) * 30 +
      Number(result?.year || 0) * 365
    );
  };

  const countWeeks = () => {
    return `${Math.ceil(
      Number(result?.month || 0) / 4.28 + Number(result?.year || 0) * 52.14
    )} - ${Number(result?.day || 0)}  ${result?.month > 1 ? "Days" : "Day"}`;
  };

  const countMonths = () => {
    return `${
      Number(result?.month || 0) + Number(result?.year || 0) * 12
    } - ${Number(result?.day || 0)} ${result?.month > 1 ? "Days" : "Day"}`;
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Age Calculator</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <div key={`inline-checkbox`} className="mb-3 mt-3">
              <Form.Check
                inline
                label="Total Days"
                id="Total Days"
                name="group1"
                type={"checkbox"}
                checked={isTotalDays}
                onChange={(e) => setIsTotalDays(!isTotalDays)}
              />
              <Form.Check
                inline
                label="Total Weeks"
                id="Total Weeks"
                name="group1"
                type={"checkbox"}
                checked={isTotalWeeks}
                onChange={(e) => setIsTotalWeeks(!isTotalWeeks)}
              />
              <Form.Check
                inline
                label="Total Months"
                id="Total Months"
                name="group1"
                type={"checkbox"}
                checked={isTotalMonths}
                onChange={(e) => setIsTotalMonths(!isTotalMonths)}
              />
            </div>
          </Form.Group>
        </Form>
        <section className="result-section">
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
        </section>
      </Card.Body>
      <Card.Footer>
        Powered By : <a href="#">Hindishobha.com</a>
      </Card.Footer>
    </Card>
  );
};
