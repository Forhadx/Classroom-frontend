import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

export default function RoomLayout(props) {
  return (
    <Container>
      <Row>
        <Col>
          <div className="cover-img">
            <h2>Class 10 semester 1</h2>
            <img src="/images/a.png" className="w-100 h-100" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <ul className="room-sidebar">
            <li>
              <Link href="/">Notes</Link>{" "}
            </li>
            <li>
              <Link href="/">Attendanc</Link>{" "}
            </li>
            <li>
              <Link href="/">Student</Link>{" "}
            </li>
          </ul>
        </Col>
        <Col lg="8">{props.children}</Col>
      </Row>
    </Container>
  );
}
