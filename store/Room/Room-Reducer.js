const Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_FACULTY_ROOMS_START":
      return {
        ...state,
        rooms: [],
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "FETCH_FACULTY_ROOMS_ERROR":
      return {
        ...state,
        rooms: [],
        loading: false,
        error: true,
        errorMsg: action.errorMsg,
      };
    case "FETCH_FACULTY_ROOMS":
      return {
        ...state,
        rooms: action.rooms,
        loading: false,
        error: false,
        errorMsg: "",
      };
    case "INIT_ADD_FACULTY_ROOM":
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
      };
    case "ADD_FACULTY_ROOM_START":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "ADD_FACULTY_ROOM_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.errorMsg,
      };
    case "ADD_FACULTY_ROOM":
      let afterAddArray = [action.room, ...state.rooms];
      return {
        ...state,
        rooms: afterAddArray,
        loading: false,
        error: false,
        errorMsg: "",
      };
    default:
      return state;
  }
};

export default Reducer;
