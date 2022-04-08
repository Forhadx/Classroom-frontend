import { Table, Button } from "react-bootstrap";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AttendanceContext from "../../store/Attendance/Attendance-Context";
import AuthContext from "../../store/Auth/Auth-Context";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function NewAttendance() {
  const [flag, setFlag] = useState(false);

  const router = useRouter();
  const roomCode = router.query.roomCode;

  const AuthCtx = useContext(AuthContext);
  const { token } = AuthCtx;
  const AttendanceCtx = useContext(AttendanceContext);
  const {
    loading,
    attendanceSuccess,
    currentAttendance,
    yesAttendance,
    noAttendance,
    submitAttendance,
  } = AttendanceCtx;

  const submitAttendanceHandler = (currentAttendance, roomCode, token) => {
    submitAttendance(currentAttendance, roomCode, token);
    setFlag(true);
  };

  useEffect(() => {
    if (attendanceSuccess && flag) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Attendance Submitted!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [attendanceSuccess, flag]);

  return (
    <div className="new-attendance">
      {currentAttendance ? (
        <>
          <Table className="student-table w-100">
            <thead>
              <tr>
                <th>Students</th>
                <th>Today</th>
              </tr>
            </thead>
            <tbody>
              {currentAttendance &&
                currentAttendance.map((std) => (
                  <tr key={std.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_BASE_URL + "/" + std.image
                          }
                          alt="student"
                          width={40}
                          height={40}
                        />
                        <span className="ms-3">{std.name}</span>
                      </div>
                    </td>
                    <td>
                      {std.isAttend ? (
                        <button
                          className="yes-btn"
                          onClick={() => noAttendance(std.id)}
                        >
                          Yes
                        </button>
                      ) : (
                        <button
                          className="no-btn"
                          onClick={() => yesAttendance(std.id)}
                        >
                          No
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {currentAttendance.length > 0 && (
            <Button
              varient="primary"
              className="mt-4"
              disabled={loading}
              onClick={() =>
                submitAttendanceHandler(currentAttendance, roomCode, token)
              }
            >
              Submit
            </Button>
          )}
        </>
      ) : (
        <p>No Student Added...</p>
      )}
    </div>
  );
}

/**
 <button className="yes-btn">Yes</button>
  <button className="no-btn">No</button>
 */
