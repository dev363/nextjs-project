import { getHours } from "actions/TimeActions";
import moment from "moment";
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
  const [showDate, setShowDate] = useState(false);
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [timeFormat, setTimeFormat] = useState(12);
  const [startH, setStartH] = useState(0);
  const [startM, setStartM] = useState(0);
  const [startS, setStartS] = useState(0);
  const [startType, setStartType] = useState("AM");

  const [calculateType, setCalculateType] = useState(true);

  const [endH, setEndH] = useState(0);
  const [endM, setEndM] = useState(0);
  const [endS, setEndS] = useState(0);
  const [endD, setEndD] = useState(0);

  const [result, setResult] = useState(null);

  useEffect(() => {
    setStartH(0);
  }, [timeFormat]);

  const resetCalculator = (e) => {
    e.preventDefault();
    setShowDate(false);
    setStartDate(new Date());
    setTimeFormat(12);
    setStartH(0);
    setStartM(0);
    setStartS(0);
    setStartType("AM");
    setCalculateType(true);
    setEndH(0);
    setEndM(0);
    setEndS(0);
    setEndD(0);
    setResult(null);
  };

  const calculateTime = (e) => {
    e.preventDefault();
    const STARTDATE = new Date(startDate);
    const Sday = STARTDATE.getDate();
    const Smonth = STARTDATE.getMonth();
    const Syear = STARTDATE.getFullYear();
    var d = new Date(Syear, Smonth, Sday, startH, startM, startS, 0);
    console.log(
      Number(timeFormat) === 12 && startType == "PM",
      timeFormat,
      startType
    );
    if (Number(timeFormat) === 12 && startType == "PM") {
      let startTimeH = startH > 0 ? Number(startH) + 12 : 0;

      console.log("u m m m m ");
      console.log("Date ", Syear, Smonth, Sday);
      console.log("Time", startTimeH, startM, startS);
      d = new Date(Syear, Smonth, Sday, startTimeH, startM, startS, 0);
    }
    console.log(moment(d).format("YYYY-MMM-DD hh:mm:ss A"), "Start Dste Time");

    let newTime = null;
    if (calculateType) {
      newTime = moment(d)
        .add({
          days: endD,
          hours: endH,
          minutes: endM,
          seconds: endS,
        })
        .format("YYYY-MMM-DD hh:mm:ss A");
      console.log(newTime, "End Dste Time");
    } else {
      newTime = moment(d)
        .subtract({
          days: endD,
          hours: endH,
          minutes: endM,
          seconds: endS,
        })
        .format("YYYY-MMM-DD hh:mm:ss A");
    }

    setResult({
      startDate: moment(d).format("YYYY-MMM-DD"),
      startTime: moment(d).format("hh:mm:ss A"),
      endDate: moment(newTime).format("YYYY-MMM-DD"),
      endTime: moment(newTime).format("hh:mm:ss A"),
    });
  };



  return (
    <Card>
      <Card.Header>
        <Card.Title>Time Calculator</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row className="p-3 mb-2 bg-light text-dark">
          <Col>
            <Form.Check
              inline
              label="Start Date"
              id="Start Date"
              name="group1"
              type={"checkbox"}
              checked={showDate}
              onChange={(e) => setShowDate(!showDate)}
            />
          </Col>
          {showDate && (
            <Col md={10} xs={12}>
              <Form.Group>
                <Form.Control
                  required
                  type="date"
                  placeholder="MM-DD-YYYY"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>
          )}
        </Row>
        <Row>
          <Col md={3} xs={12}>
            <Form.Group>
              <Form.Label>Time Format</Form.Label>
              <Form.Select
                placeholder="AM"
                value={timeFormat}
                onChange={(e) => setTimeFormat(e.target.value)}
              >
                <option value={12}>12 Hours</option>
                <option value={24}>24 Hours</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2} xs={12}>
            <Form.Group>
              <Form.Label>Hour</Form.Label>
              <Form.Select
                placeholder="00"
                value={startH}
                onChange={(e) => setStartH(e.target.value)}
              >
                {[...getHours(timeFormat)].map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2} xs={12}>
            <Form.Group>
              <Form.Label>Minutes</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                max={60}
                placeholder="00"
                value={startM}
                onChange={(e) => setStartM(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2} xs={12}>
            <Form.Group>
              <Form.Label>Seconds</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                max={60}
                placeholder="00"
                value={startS}
                onChange={(e) => setStartS(e.target.value)}
              />
            </Form.Group>
          </Col>
          {timeFormat == 12 && (
            <Col md={3} xs={12}>
              <Form.Group>
                <Form.Label>AM/PM</Form.Label>
                <Form.Select
                  placeholder="AM"
                  value={startType}
                  onChange={(e) => setStartType(e.target.value)}
                >
                  <option value={"AM"}>AM</option>
                  <option value={"PM"}>PM</option>
                </Form.Select>
              </Form.Group>
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <div className="d-flex justify-content-center mb-3 mt-3">
                <Form.Check
                  inline
                  label="Add"
                  id="Add"
                  name="operation"
                  type={"radio"}
                  checked={calculateType}
                  onChange={(e) => setCalculateType(!calculateType)}
                />
                <Form.Check
                  inline
                  label="Minus"
                  id="Minus"
                  name="operation"
                  type={"radio"}
                  checked={!calculateType}
                  onChange={(e) => setCalculateType(!calculateType)}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={3} xs={12}>
            <Form.Group>
              <Form.Label>Days</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                placeholder="00"
                value={endD}
                onChange={(e) => setEndD(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={3} xs={12}>
            <Form.Group>
              <Form.Label>Hours</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                max={24}
                placeholder="00"
                value={endH}
                onChange={(e) => setEndH(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={3} xs={12}>
            <Form.Group>
              <Form.Label>Minutes</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                max={60}
                placeholder="00"
                value={endM}
                onChange={(e) => setEndM(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={3} xs={12}>
            <Form.Group>
              <Form.Label>Seconds</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                max={60}
                placeholder="00"
                value={endS}
                onChange={(e) => setEndS(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="button-section">
              <Button variant="primary" size="lg" onClick={calculateTime}>
                Calculate
              </Button>
              <Button variant="secondary" size="lg" onClick={resetCalculator}>
                Clear
              </Button>
            </div>
          </Col>
        </Row>

        {result && (
          <section className="result-section">
            <section className="border p-2 rounded-1 mb-1">
              {result?.startDate && (
                <div className="response-li">
                  <Badge bg="warning">Start Date</Badge>
                  <span className="result-value">{result?.startDate}</span>
                </div>
              )}
              {result?.startTime && (
                <div className="response-li">
                  <Badge bg="warning">Start Time</Badge>
                  <span className="result-value">{result?.startTime}</span>
                </div>
              )}
              {result?.endDate && (
                <div className="response-li">
                  <Badge bg="success">Next Date</Badge>
                  <span className="result-value">{result?.endDate}</span>
                </div>
              )}
              {result?.endTime && (
                <div className="response-li">
                  <Badge bg="success">Next Time</Badge>
                  <span className="result-value">{result?.endTime}</span>
                </div>
              )}
            </section>
          </section>
        )}
      </Card.Body>
      {/* <Card.Footer>
        Powered By : <a href="#">Hindishobha.com</a>
      </Card.Footer> */}
    </Card>
  );
};
