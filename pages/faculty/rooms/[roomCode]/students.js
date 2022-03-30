import { Table } from "react-bootstrap";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import FacultyLayout from "../../../../components/Layout/FacultyLayout";
import { useRouter } from "next/router";

export default function StudentsPage() {
  const router = useRouter();
  const roomCode = router.query.roomCode;

  return (
    <FacultyLayout roomCode={roomCode}>
      <Table className="student-table student-request-table w-100">
        <thead>
          <tr>
            <th>You have student request</th>
            <th></th>
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
              <button className="cancel-btn btn">Cancel</button>
              <button className="accept-btn btn">Accept</button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Table hover className="student-table w-100">
        <thead>
          <tr>
            <th>20 students</th>
            <th>
              Presents(<span>out of 20</span>)
            </th>
            <th></th>
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
            <td>12</td>
            <td>
              <div className="remove-students">
                <RiDeleteBinLine />
              </div>
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
            <td>12</td>
            <td>
              <div className="remove-students">
                <RiDeleteBinLine />
              </div>
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
            <td>12</td>
            <td>
              <div className="remove-students">
                <RiDeleteBinLine />
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </FacultyLayout>
  );
}
