import { Table } from "react-bootstrap";
import { RiCheckDoubleFill, RiCloseFill } from "react-icons/ri";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AttendanceContext from "../../store/Attendance/Attendance-Context";
import AuthContext from "../../store/Auth/Auth-Context";
import { useRouter } from "next/router";
import moment from "moment";

export default function HistoryAttendance() {
  const [currentAttendance, setCurrentAttendance] = useState([]);

  const router = useRouter();
  const roomCode = router.query.roomCode;

  const AuthCtx = useContext(AuthContext);
  const { token } = AuthCtx;
  const AttendaceCtx = useContext(AttendanceContext);
  const { attendanceList, fetchAllAttendanceList } = AttendaceCtx;

  useEffect(() => {
    if (token && roomCode) {
      fetchAllAttendanceList(roomCode, token);
    }
  }, [roomCode, token, fetchAllAttendanceList]);

  useEffect(() => {
    if (attendanceList) {
      setCurrentAttendance(attendanceList[0]);
    }
  }, [attendanceList]);

  const changeSelectValueHandler = (index) => {
    setCurrentAttendance(attendanceList[+index]);
  };

  return (
    <>
      {currentAttendance && (
        <>
          <div className="attendance-page-form">
            <div className="d-flex align-items-center mb-4">
              <select
                className="select-class me-4 "
                onChange={(e) => changeSelectValueHandler(e.target.value)}
              >
                {[...Array(attendanceList.length).keys()].map((v) => (
                  <option key={v} value={v}>{`class ${
                    attendanceList.length - v
                  }`}</option>
                ))}
              </select>
              <h6>{moment(currentAttendance.createdAt).format("lll")} </h6>
            </div>
          </div>
          <div className="history-table">
            <Table hover className="student-table w-100">
              <thead>
                <tr>
                  <th>Students</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {currentAttendance.students &&
                  currentAttendance.students.map((std) => (
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
                      {std.attendanceList && (
                        <td>
                          {std.attendanceList.isAttend ? (
                            <RiCheckDoubleFill className="yes-icon" />
                          ) : (
                            <RiCloseFill className="no-icon" />
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </>
  );
}
