import { Table } from "react-bootstrap";
import Image from "next/image";

export default function NewAttendance() {
  return (
    <div className="new-attendance">
      <Table className="student-table w-100">
        <thead>
          <tr>
            <th>Students</th>
            <th>Today</th>
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
              <button className="no-btn">No</button>
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
              <button className="yes-btn">Yes</button>
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
              <button className="no-btn">No</button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
