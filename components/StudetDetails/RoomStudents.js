import { Table } from "react-bootstrap";
import Image from "next/image";
// import { RiDeleteBinLine } from "react-icons/ri";

export default function RoomStudents(props) {
  return (
    <Table hover className="student-table w-100">
      <thead>
        <tr>
          <th>{`${props.students.length} students`}</th>
          {/* <th>
            Presents(<span>out of 20</span>)
          </th>
          <th></th> */}
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
            {/* <td>12</td> */}
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
