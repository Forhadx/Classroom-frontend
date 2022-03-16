import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import StudentLayout from "../../../../components/Layout/StudentLayout";
import StudentAttendance from "../../../../components/Attendance/StudentAttendance";

export default function AttendancePage() {
  return (
    <StudentLayout>
      <Row>
        <Col sm="12">
          <div className="attendace-page">
            <StudentAttendance />
          </div>
        </Col>
      </Row>
    </StudentLayout>
  );
}
