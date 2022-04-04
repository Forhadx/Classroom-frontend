import { Table } from "react-bootstrap";
import Image from "next/image";

export default function StudentRequest(props) {
  return (
    <Table className="student-table student-request-table w-100">
      <thead>
        <tr>
          <th>You have student request</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.students &&
          props.students.map((std, idx) => (
            <tr key={idx}>
              <td>
                <div className="d-flex align-items-center">
                  <Image
                    src={process.env.NEXT_PUBLIC_BASE_URL + "/" + std.image}
                    alt="student"
                    width={40}
                    height={40}
                  />
                  <span className="ms-3">{std.name}</span>
                </div>
              </td>
              <td>
                <button className="cancel-btn btn">Cancel</button>
                <button
                  className="accept-btn btn"
                  onClick={() => props.acceptStudentHandler(std)}
                >
                  Accept
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
