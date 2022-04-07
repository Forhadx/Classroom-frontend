const Reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_STUDENTS_ATTENDANCE":
      let setAttendantList = [];
      for (let key in action.teamStudents) {
        setAttendantList.push({
          ...action.teamStudents[key],
          isAttend: false,
        });
      }
      return {
        ...state,
        currentAttendance: setAttendantList,
        attendanceSuccess: false,
      };

    case "YES_STUDENTS_ATTENDANCE":
      let updateYesList = state.currentAttendance;
      let yesIndex = updateYesList.findIndex((std) => std.id === action.sId);
      updateYesList[yesIndex].isAttend = true;
      return {
        ...state,
        currentAttendance: updateYesList,
      };

    case "NO_STUDENTS_ATTENDANCE":
      let updateNoList = state.currentAttendance;
      let noIndex = updateNoList.findIndex((std) => std.id === action.sId);
      updateNoList[noIndex].isAttend = false;
      return {
        ...state,
        currentAttendance: updateNoList,
      };

    case "SUBMIT_STUDENTS_ATTENDANCE_START":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
        attendanceSuccess: false,
      };
    case "SUBMIT_STUDENTS_ATTENDANCE_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.errorMsg,
        attendanceSuccess: false,
      };
    case "SUBMIT_STUDENTS_ATTENDANCE":
      let updateCurrentAttendance = state.currentAttendance;
      for (let key in updateCurrentAttendance) {
        updateCurrentAttendance[key].isAttend = false;
      }
      return {
        ...state,
        currentAttendance: updateCurrentAttendance,
        loading: false,
        error: false,
        errorMsg: "",
        attendanceSuccess: true,
      };

    default:
      return state;
  }
};

export default Reducer;
