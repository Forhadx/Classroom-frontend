import RoomLayout from "../../../../components/Layout/RoomLayout";
import { Row, Col, Table } from "react-bootstrap";
import { RiCheckDoubleFill, RiCloseFill } from "react-icons/ri";
import Image from "next/image";
import { useState } from "react";
import HistoryAttendance from "../../../../components/Attendance/HistoryAttendance";
import NewAttendance from "../../../../components/Attendance/NewAttendance";

export default function AttendancePage() {
  const [isHistory, setIsHistory] = useState(true);

  return (
    <RoomLayout>
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
    </RoomLayout>
  );
}
