import { createContext, useCallback, useReducer } from "react";
import axios from "../../util/axios";
import Reducer from "./Attendance-Reducer";

const AttendanceContext = createContext({
  attendanceList: [],
  currentAttendance: [],
  loading: false,
  error: false,
  errorMsg: "",
  attendanceSuccess: false,
  initialAttendance: function (teamStudents) {},
  yesAttendance: function (sId) {},
  noAttendance: function (sId) {},
  submitAttendance: function (data) {},
});

const initialState = {
  attendanceList: [],
  currentAttendance: [],
  loading: false,
  error: false,
  errorMsg: "",
  attendanceSuccess: false,
};

export function AttendanceContextProvider(props) {
  const [attendanceState, dispatch] = useReducer(Reducer, initialState);

  // INITIAL STUDENTS ATTENDANCE
  const onInitialAttendance = useCallback(async (teamStudents) => {
    dispatch({
      type: "INITIAL_STUDENTS_ATTENDANCE",
      teamStudents: teamStudents,
    });
  }, []);

  // YES STUDENTS ATTENDANCE
  const onYesAttendance = useCallback(async (sId) => {
    dispatch({
      type: "YES_STUDENTS_ATTENDANCE",
      sId: sId,
    });
  }, []);

  // NO STUDENTS ATTENDANCE
  const onNoAttendance = useCallback(async (sId) => {
    dispatch({
      type: "NO_STUDENTS_ATTENDANCE",
      sId: sId,
    });
  }, []);

  // SUBMIT STUDENTS ATTENDANCE
  const onSubmitAttendance = useCallback(
    async (attendanceData, roomCode, token) => {
      console.log("action..");
      dispatch({ type: "SUBMIT_STUDENTS_ATTENDANCE_START" });
      try {
        let result = await axios.post(
          "/api/f/attendance/mark",
          { studentList: attendanceData, roomCode: roomCode },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        dispatch({
          type: "SUBMIT_STUDENTS_ATTENDANCE",
          attendanceData: attendanceData,
        });
      } catch (err) {
        dispatch({
          type: "SUBMIT_STUDENTS_ATTENDANCE_ERROR",
          errorMsg: err.response.data.message,
        });
      }
    },
    []
  );

  const context = {
    attendanceList: attendanceState.attendanceList,
    currentAttendance: attendanceState.currentAttendance,
    loading: attendanceState.loading,
    error: attendanceState.error,
    errorMsg: attendanceState.errorMsg,
    attendanceSuccess: attendanceState.attendanceSuccess,
    initialAttendance: onInitialAttendance,
    yesAttendance: onYesAttendance,
    noAttendance: onNoAttendance,
    submitAttendance: onSubmitAttendance,
  };
  return (
    <AttendanceContext.Provider value={context}>
      {props.children}
    </AttendanceContext.Provider>
  );
}

export default AttendanceContext;
