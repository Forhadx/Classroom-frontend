import FacultyLayout from "../../../../components/Layout/FacultyLayout";
import { useRouter } from "next/router";
import StudentRequest from "../../../../components/StudetDetails/StudentRequest";
import RoomStudents from "../../../../components/StudetDetails/RoomStudents";
import { useEffect, useState, useContext } from "react";
import axios from "../../../../util/axios";
import AuthContext from "../../../../store/Auth/Auth-Context";

export default function StudentsPage() {
  const [acitveStudents, setActiveStudents] = useState([]);
  const [requestStudents, setRequestStudenst] = useState([]);

  const AuthCtx = useContext(AuthContext);
  const { token } = AuthCtx;

  const router = useRouter();
  // console.log("r ", router);
  const roomCode = router.query.roomCode;

  useEffect(() => {
    if (roomCode) {
      const teamStudents = async () => {
        console.log("tokeN: ", roomCode);
        try {
          const result = await axios.post(
            "/api/f/team/students",
            { roomCode },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          console.log("data: ", result.data);
          let students = result.data.roomStudents.students;
          let actStd = [];
          let rqstStd = [];
          for (let key in students) {
            if (students[key].teamList.isAccept) {
              actStd.push(students[key]);
            } else {
              rqstStd.push(students[key]);
            }
          }
          setActiveStudents(actStd);
          setRequestStudenst(rqstStd);
        } catch (err) {
          console.log(err);
        }
      };
      teamStudents();
    }
  }, [roomCode]);

  const acceptStudentHandler = async (std) => {
    // console.log("sId: ", id);
    try {
      await axios.post(
        "/api/f/team/accept",
        { roomCode: roomCode, studentId: std.id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setActiveStudents([...acitveStudents, std]);
      setRequestStudenst((oldStd) => {
        return oldStd.filter((std) => std.id !== std.id);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FacultyLayout roomCode={roomCode}>
      <StudentRequest
        students={requestStudents}
        acceptStudentHandler={acceptStudentHandler}
      />
      <RoomStudents students={acitveStudents} />
    </FacultyLayout>
  );
}
