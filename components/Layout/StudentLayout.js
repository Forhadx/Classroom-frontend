import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { RiContactsBook2Fill } from "react-icons/ri";
import { BiCalendarCheck } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { useRouter } from "next/router";

export default function FacultyLayout(props) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const { roomCode } = props;

  return (
    <Container>
      <Row>
        <Col>
          <div className="cover-img">
            <h2>This is your classroom</h2>
            <img
              src="/images/a.png"
              alt="faculty-cover"
              className="w-100 h-100"
            />
            <div className="room-code">
              <MdContentCopy />
              {roomCode}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <ul className="room-sidebar">
            <li>
              <Link href={`/student/rooms/${roomCode}`}>
                <a
                  className={
                    currentRoute === `/student/rooms/[roomCode]` ? "active" : ""
                  }
                >
                  <RiContactsBook2Fill /> Notes
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/student/rooms/${roomCode}/attendance`}>
                <a
                  className={
                    currentRoute === `/student/rooms/[roomCode]/attendance`
                      ? "active"
                      : ""
                  }
                >
                  <BiCalendarCheck /> Attendance
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
