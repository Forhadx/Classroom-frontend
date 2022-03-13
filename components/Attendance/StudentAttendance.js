import { Table } from "react-bootstrap";
import { RiCheckDoubleFill, RiCloseFill } from "react-icons/ri";

export default function StudentAttendance() {
  return (
    <div className="student-history-table">
      <Table hover className="student-table w-100">
        <thead>
          <tr>
            <th>Class no</th>
            <th>Date</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>12/12/22, 2.23px</td>
            <td>
              <RiCheckDoubleFill className="yes-icon" />
            </td>
          </tr>
          <tr>
            <td>01</td>
            <td>12/12/22, 2.23px</td>
            <td>
              <RiCheckDoubleFill className="yes-icon" />
            </td>
          </tr>
          <tr>
            <td>01</td>
            <td>12/12/22, 2.23px</td>
            <td>
              <RiCloseFill className="no-icon" />
            </td>
          </tr>
          <tr>
            <td>01</td>
            <td>12/12/22, 2.23px</td>
            <td>
              <RiCheckDoubleFill className="yes-icon" />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
