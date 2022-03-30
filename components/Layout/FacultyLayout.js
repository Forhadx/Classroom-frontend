import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { RiContactsBook2Fill, RiTeamFill } from "react-icons/ri";
import { BiCalendarCheck } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { useRouter } from "next/router";

export default function FacultyLayout(props) {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <Container>
      <Row>
        <Col>
          <div className="cover-img">
            <h2>Class 10 semester 1</h2>
            <img
              src="/images/a.png"
              alt="faculty-cover"
              className="w-100 h-100"
            />
            <div className="room-code">
              <MdContentCopy />
              {props.roomCode}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <ul className="room-sidebar">
            <li>
              <Link href={`/faculty/rooms/${props.roomCode}`}>
                <a
                  className={
                    currentRoute === `/faculty/rooms/[roomCode]` ? "active" : ""
                  }
                >
                  <RiContactsBook2Fill /> Notes
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/faculty/rooms/${props.roomCode}/attendance`}>
                <a
                  className={
                    currentRoute === `/faculty/rooms/[roomCode]/attendance`
                      ? "active"
                      : ""
                  }
                >
                  <BiCalendarCheck /> Attendance
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/faculty/rooms/${props.roomCode}/students`}>
                <a
                  className={
                    currentRoute === `/faculty/rooms/[roomCode]/students`
                      ? "active"
                      : ""
                  }
                >
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
