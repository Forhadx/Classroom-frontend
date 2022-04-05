import { createContext, useCallback, useReducer } from "react";
import axios from "../../util/axios";
import Reducer from "./Team-Reducer";

const TeamContext = createContext({
  teamStudents: [],
  teamRequestStudents: [],
  loading: false,
  error: false,
  errorMsg: "",
  fetchAllTeamStudents: function (data, token) {},
  acceptTeamStudent: function (data, token) {},
});

const initialState = {
  teamStudents: [],
  teamRequestStudents: [],
  loading: false,
  error: false,
  errorMsg: "",
};

export function TeamContextProvider(props) {
  const [teamState, dispatch] = useReducer(Reducer, initialState);

  // FETCH FACULTY TEAM STUDENTS
  const onFetchAllTeamStudents = useCallback(async (data, token) => {
    dispatch({
      type: "FETCH_FACULTY_TEAM_STUDENTS_START",
    });
    try {
      let result = await axios.post("/api/f/team/students", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch({
        type: "FETCH_FACULTY_TEAM_STUDENTS",
        teamStudents: result.data.teamStudents,
        teamRequestStudents: result.data.teamRequestStudents,
      });
    } catch (err) {
      dispatch({
        type: "FETCH_FACULTY_TEAM_STUDENTS_ERROR",
        errorMsg: err.response.data.message,
      });
    }
  }, []);

  // ACCEPT TEAM STUDENT
  const onAcceptTeamStudent = useCallback(async (roomCode, student, token) => {
    dispatch({
      type: "ACCEPT_TEAM_STUDENT_START",
    });
    try {
      await axios.post(
        "/api/f/team/accept",
        { roomCode: roomCode, studentId: student.id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({
        type: "ACCEPT_TEAM_STUDENT",
        student: student,
      });
    } catch (err) {
      dispatch({
        type: "ACCEPT_TEAM_STUDENT_ERROR",
        errorMsg: err.response.data.message,
      });
    }
  }, []);

  const context = {
    teamStudents: teamState.teamStudents,
    teamRequestStudents: teamState.teamRequestStudents,
    loading: teamState.loading,
    error: teamState.error,
    errorMsg: teamState.errorMsg,
    fetchAllTeamStudents: onFetchAllTeamStudents,
    acceptTeamStudent: onAcceptTeamStudent,
  };
  return (
    <TeamContext.Provider value={context}>
      {props.children}
    </TeamContext.Provider>
  );
}

export default TeamContext;
