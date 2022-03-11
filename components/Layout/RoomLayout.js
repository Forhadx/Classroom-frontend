import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { RiContactsBook2Fill, RiTeamFill } from "react-icons/ri";
import { BiCalendarCheck } from "react-icons/bi";

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
              <Link href="/rooms/1">
                <a>
                  <RiContactsBook2Fill /> Notes
                </a>
              </Link>
            </li>
            <li>
              <Link href="/rooms/1/attendance">
                <a>
                  <BiCalendarCheck /> Attendance
                </a>
              </Link>
            </li>
            <li>
              <Link href="/rooms/1/students">
                <a>
                  <RiTeamFill />
                  Student
                </a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col lg="8">{props.children}</Col>
      </Row>
    </Container>
  );
}
