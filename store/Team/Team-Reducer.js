const Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_FACULTY_TEAM_STUDENTS_START":
      return {
        ...state,
        teamStudents: [],
        teamRequestStudents: [],
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "FETCH_FACULTY_TEAM_STUDENTS_ERROR":
      return {
        ...state,
        teamStudents: [],
        teamRequestStudents: [],
        loading: false,
        error: true,
        errorMsg: action.errorMsg,
      };
    case "FETCH_FACULTY_TEAM_STUDENTS":
      return {
        ...state,
        teamStudents: action.teamStudents,
        teamRequestStudents: action.teamRequestStudents,
        loading: false,
        error: false,
        errorMsg: "",
      };
    case "ACCEPT_TEAM_STUDENT_START":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "ACCEPT_TEAM_STUDENT_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.errorMsg,
      };
    case "ACCEPT_TEAM_STUDENT":
      let updateTeamStudenst = [...state.teamStudents, action.student];
      let updateTeamRequestStudents = state.teamRequestStudents.filter(
        (std) => std.id !== action.student.id
      );
      return {
        ...state,
        teamStudents: updateTeamStudenst,
        teamRequestStudents: updateTeamRequestStudents,
        loading: false,
        error: false,
        errorMsg: "",
      };
    default:
      return state;
  }
};

export default Reducer;
