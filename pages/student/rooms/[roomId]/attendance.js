import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import StudentLayout from "../../../../components/Layout/StudentLayout";
import StudentAttendance from "../../../../components/Attendance/StudentAttendance";
import AuthContext from "../../../../store/auth-context";
import { useContext, useLayoutEffect } from "react";
import { useRouter } from "next/router";

export default function AttendancePage() {
  const [isHistory, setIsHistory] = useState(true);

  const router = useRouter();
  const AuthCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    if (AuthCtx.userType !== "student") {
      router.push("/");
    }
  }, []);

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
