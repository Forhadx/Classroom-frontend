import { Table } from "react-bootstrap";
import { RiCheckDoubleFill, RiCloseFill } from "react-icons/ri";
import Image from "next/image";

export default function HistoryAttendance() {
  return (
    <>
      <div className="attendance-page-form">
        <div className="d-flex align-items-center mb-2">
          <select className="select-class me-4">
            <option>class 2</option>
            <option>class 2</option>
            <option>class 2</option>
            <option>class 2</option>
          </select>
          <h6>23/23/23</h6>
        </div>
        <p>Attended 7 students out of 11.</p>
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
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <Image
                    src="/images/forhad.jpg"
                    alt="student"
                    width={40}
                    height={40}
                  />
                  <span className="ms-3">Md Shamsul Haque Forhad</span>
                </div>
              </td>
              <td>
                <RiCheckDoubleFill className="yes-icon" />
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <Image
                    src="/images/forhad.jpg"
                    alt="student"
                    width={40}
                    height={40}
                  />
                  <span className="ms-3">Md Shamsul Haque Forhad</span>
                </div>
              </td>
              <td>
                <RiCloseFill className="no-icon" />
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <Image
                    src="/images/forhad.jpg"
                    alt="student"
                    width={40}
                    height={40}
                  />
                  <span className="ms-3">Md Shamsul Haque Forhad</span>
                </div>
              </td>
              <td>
                <RiCheckDoubleFill className="yes-icon" />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}
