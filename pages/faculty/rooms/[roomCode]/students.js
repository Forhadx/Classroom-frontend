import FacultyLayout from "../../../../components/Layout/FacultyLayout";
import { useRouter } from "next/router";
import StudentRequest from "../../../../components/StudetDetails/StudentRequest";
import RoomStudents from "../../../../components/StudetDetails/RoomStudents";
import { useEffect, useState } from "react";
import axios from "../../../../util/axios";

export default function StudentsPage() {
  const [acitveStudents, setActiveStudents] = useState([]);
  const [requestStudents, setRequestStudenst] = useState([]);

  const router = useRouter();
  // console.log("r ", router);
  const roomCode = router.query.roomCode;

  useEffect(() => {
    if (roomCode) {
      const teamStudents = async () => {
        try {
          const result = await axios.post("/api/f/team/students", { roomCode });
          // console.log("data: ", result.data);
          let students = result.data.roomStudents.students;
          let actStd = [];
          let rqstStd = [];
          for (let key in students) {
            // console.log("k: ", key);
            // console.log("d: ", students[key]);
            if (students[key].teamList.isAccept) {
              // setActiveStudents([...acitveStudents, students[key]]);
              actStd.push(students[key]);
            } else {
              rqstStd.push(students[key]);
              // setRequestStudenst([...requestStudents, students[key]]);
            }
          }
          setActiveStudents(actStd);
          setRequestStudenst(rqstStd);
        } catch (err) {
          console.log(err);
        }
        teamStudents();
      };
    }
  }, [roomCode]);

  // console.log("active : ", acitveStudents);
  // console.log("requst : ", requestStudents);

  return (
    <FacultyLayout roomCode={roomCode}>
      <StudentRequest students={requestStudents} />
      <RoomStudents students={acitveStudents} />
    </FacultyLayout>
  );
}
