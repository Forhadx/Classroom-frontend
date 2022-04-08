import { Row, Col } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import StudentLayout from "../../../../components/Layout/StudentLayout";
import StudentAttendance from "../../../../components/Attendance/StudentAttendance";
import { useRouter } from "next/router";
import axios from "../../../../util/axios";
import AuthContext from "../../../../store/Auth/Auth-Context";

export default function AttendancePage() {
  const router = useRouter();
  const roomCode = router.query.roomCode;
  const AuthCtx = useContext(AuthContext);
  const { token } = AuthCtx;

  const [attendaceDetails, setAttendanceDetails] = useState([]);

  const fetchStudentAttendance = async (roomCode, token) => {
    try {
      let result = await axios.post(
        "/api/s/attendance",
        { roomCode },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setAttendanceDetails([...result.data.attendanceDetails]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token && roomCode) {
      fetchStudentAttendance(roomCode, token);
    }
  }, [roomCode, token]);

  return (
    <StudentLayout roomCode={roomCode}>
      <Row>
        <Col sm="12">
          <div className="attendace-page">
            {attendaceDetails && (
              <StudentAttendance attendaceDetails={attendaceDetails} />
            )}
          </div>
        </Col>
      </Row>
    </StudentLayout>
  );
}
