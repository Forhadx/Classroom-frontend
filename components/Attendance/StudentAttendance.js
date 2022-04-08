import { Table } from "react-bootstrap";
import { RiCheckDoubleFill, RiCloseFill } from "react-icons/ri";
import moment from "moment";

export default function StudentAttendance(props) {
  const { attendaceDetails } = props;

  return (
    <div className="student-history-table">
      {attendaceDetails ? (
        <Table hover responsive className="student-table w-100">
          <thead>
            <tr>
              <th>Class no</th>
              <th>Date</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendaceDetails.map((std, idx) => (
              <tr key={idx}>
                <td>{props.attendaceDetails.length - idx}</td>
                <td>{moment(std.createdAt).format("lll")}</td>
                <td>
                  {std.isAttend ? (
                    <RiCheckDoubleFill className="yes-icon" />
                  ) : (
                    <RiCloseFill className="no-icon" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h6>This Classroom does not take any attendace.</h6>
      )}
    </div>
  );
}
