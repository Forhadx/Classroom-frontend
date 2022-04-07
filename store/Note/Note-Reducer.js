const Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ROOM_NOTES_START":
      return {
        ...state,
        noteList: [],
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "FETCH_ROOM_NOTES_ERROR":
      return {
        ...state,
        noteList: [],
        loading: false,
        error: true,
        errorMsg: action.errorMsg,
      };
    case "FETCH_ROOM_NOTES":
      return {
        ...state,
        noteList: action.noteList,
        loading: false,
        error: false,
        errorMsg: "",
      };
    case "ADD_ROOM_NOTES_START":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "ADD_ROOM_NOTES_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.errorMsg,
      };
    case "ADD_ROOM_NOTES":
      let afterAddNote = [action.note, ...state.noteList];
      return {
        ...state,
        noteList: afterAddNote,
        loading: false,
        error: false,
        errorMsg: "",
      };
    default:
      return state;
  }
};

export default Reducer;
