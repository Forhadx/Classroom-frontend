const Reducer = (state, action) => {
  switch (action.type) {
    case "USER_SIGNUP_START":
      return {
        ...state,
        token: null,
        facultyId: null,
        studentId: null,
        loading: true,
        error: false,
        authSuccess: false,
      };
    case "USER_SIGNUP_ERROR":
      return {
        ...state,
        facultyId: null,
        studentId: null,
        loading: false,
        error: true,
        authSuccess: false,
      };
    case "USER_SIGNUP":
      return {
        ...state,
        facultyId: null,
        studentId: null,
        loading: false,
        error: false,
        authSuccess: true,
      };
    case "USER_LOGIN_START":
      return {
        ...state,
        token: null,
        facultyId: null,
        studentId: null,
        loading: true,
        error: false,
        authSuccess: false,
      };
    case "USER_LOGIN_ERROR":
      return {
        ...state,
        token: null,
        facultyId: null,
        studentId: null,
        loading: false,
        error: true,
      };
    case "USER_LOGIN":
      return {
        ...state,
        token: action.token,
        facultyId: action.facultyId,
        studentId: action.studentId,
        loading: false,
        error: false,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        token: null,
        facultyId: null,
        studentId: null,
        loading: false,
        error: false,
        userType: null,
      };
    case "USER_AUTO_LOGIN":
      return {
        ...state,
        token: action.token,
        facultyId: action.facultyId,
        studentId: action.studentId,
        loading: false,
        error: false,
        userType: action.userType,
      };
    case "ADD_USER_TYPE":
      return {
        ...state,
        userType: action.userType,
      };
    case "AUTO_USER_TYPE":
      return {
        ...state,
        userType: action.userType,
      };
    default:
      return state;
  }
};

export default Reducer;
