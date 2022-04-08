import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { RiContactsBook2Fill, RiTeamFill } from "react-icons/ri";
import { BiCalendarCheck } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import TeamContext from "../../store/Team/Team-Context";
import AuthContext from "../../store/Auth/Auth-Context";
import AttendanceContext from "../../store/Attendance/Attendance-Context";

export default function FacultyLayout(props) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const { roomCode } = props;

  const AuthCtx = useContext(AuthContext);
  const { token } = AuthCtx;
  const TeamCtx = useContext(TeamContext);
  const { teamStudents, fetchAllTeamStudents } = TeamCtx;
  const AttendanceCtx = useContext(AttendanceContext);
  const { initialAttendance } = AttendanceCtx;

  useEffect(() => {
    if (token && roomCode) {
      fetchAllTeamStudents(roomCode, token);
    }
  }, [roomCode, token]);

  useEffect(() => {
    if (teamStudents.length > 0) {
      initialAttendance(teamStudents);
    }
  }, [initialAttendance, teamStudents]);

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
              <Link href={`/faculty/rooms/${roomCode}`}>
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
              <Link href={`/faculty/rooms/${roomCode}/attendance`}>
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
              <Link href={`/faculty/rooms/${roomCode}/students`}>
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
