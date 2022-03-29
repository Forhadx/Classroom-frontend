import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import HistoryAttendance from "../../../../components/Attendance/HistoryAttendance";
import NewAttendance from "../../../../components/Attendance/NewAttendance";
import FacultyLayout from "../../../../components/Layout/FacultyLayout";
import { useRouter } from "next/router";

export default function AttendancePage() {
  const [isHistory, setIsHistory] = useState(true);

  const router = useRouter();
  const roomCode = router.query.roomCode;

  return (
    <FacultyLayout roomCode={roomCode}>
      <Row>
        <Col sm="12">
          <div className="attendace-page">
            <div className="attendance-page-header">
              <button
                className={`header-btn ${isHistory ? "active" : ""}`}
                onClick={() => setIsHistory(true)}
              >
                History
              </button>
              <button
                className={`header-btn ${!isHistory ? "active" : ""}`}
                onClick={() => setIsHistory(false)}
              >
                New Attendance
              </button>
            </div>

            {isHistory ? <HistoryAttendance /> : <NewAttendance />}
          </div>
        </Col>
      </Row>
    </FacultyLayout>
  );
}
