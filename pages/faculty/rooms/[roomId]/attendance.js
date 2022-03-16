import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import HistoryAttendance from "../../../../components/Attendance/HistoryAttendance";
import NewAttendance from "../../../../components/Attendance/NewAttendance";
import FacultyLayout from "../../../../components/Layout/FacultyLayout";

export default function AttendancePage() {
  const [isHistory, setIsHistory] = useState(true);

  return (
    <FacultyLayout>
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
