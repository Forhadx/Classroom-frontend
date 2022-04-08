import { Table } from "react-bootstrap";
import Image from "next/image";
// import { RiDeleteBinLine } from "react-icons/ri";
import moment from "moment";

export default function RoomStudents(props) {
  return (
    <Table hover className="student-table w-100">
      <thead>
        <tr>
          <th>{`Students(${props.students.length})`}</th>

          <th>Email</th>
          <th>Join</th>
        </tr>
      </thead>
      <tbody>
        {props.students.map((std, idx) => (
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
            <td>{std.email}</td>
            <td>{moment(std.createdAt).format("ll")}</td>
            {/* <td>
              <div className="remove-students">
                <RiDeleteBinLine />
              </div>
            </td> */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
