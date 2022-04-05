import FacultyLayout from "../../../../components/Layout/FacultyLayout";
import { useRouter } from "next/router";
import StudentRequest from "../../../../components/StudetDetails/StudentRequest";
import RoomStudents from "../../../../components/StudetDetails/RoomStudents";
import { useEffect, useContext } from "react";
import AuthContext from "../../../../store/Auth/Auth-Context";
import TeamContext from "../../../../store/Team/Team-Context";

export default function StudentsPage() {
  const AuthCtx = useContext(AuthContext);
  const { token } = AuthCtx;

  const TeamCtx = useContext(TeamContext);
  const {
    teamStudents,
    teamRequestStudents,
    fetchAllTeamStudents,
    acceptTeamStudent,
  } = TeamCtx;

  const router = useRouter();
  const roomCode = router.query.roomCode;

  useEffect(() => {
    if (roomCode) {
      fetchAllTeamStudents({ roomCode }, token);
    }
  }, [roomCode]);

  const acceptStudentHandler = async (std) => {
    acceptTeamStudent(roomCode, std, token);
  };

  return (
    <FacultyLayout roomCode={roomCode}>
      <StudentRequest
        students={teamRequestStudents}
        acceptStudentHandler={acceptStudentHandler}
      />
      <RoomStudents students={teamStudents} />
    </FacultyLayout>
  );
}
