import { Table } from "react-bootstrap";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import FacultyLayout from "../../../../components/Layout/FacultyLayout";
import { useContext, useLayoutEffect } from "react";
import { useRouter } from "next/router";

export default function StudentsPage() {
  const router = useRouter();
  const AuthCtx = useContext(AuthContext);
  const { userType } = AuthCtx;

  useLayoutEffect(() => {
    if (userType !== "faculty") {
      router.push("/");
    }
  }, [userType, router]);
  // const router = useRouter();
  // console.log(router);
  // console.log(router.query.roomId);

  return (
    <FacultyLayout>
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
