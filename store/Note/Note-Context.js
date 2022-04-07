import { createContext, useCallback, useReducer } from "react";
import axios from "../../util/axios";
import Reducer from "./Note-Reducer";

const NoteContext = createContext({
  noteList: [],
  loading: false,
  error: false,
  errorMsg: "",
  fetchRoomNotes: function (roomCode, token) {},
  addNewNotes: function (data, token) {},
});

const initialState = {
  noteList: [],
  loading: false,
  error: false,
  errorMsg: "",
};

export function NoteContextProvider(props) {
  const [noteState, dispatch] = useReducer(Reducer, initialState);

  // FETCH ROOM NOTES
  const onFetchRoomNotes = useCallback(async (roomCode, token) => {
    dispatch({
      type: "FETCH_ROOM_NOTES_START",
    });
    try {
      let result = await axios.post(
        "/api/f/notes",
        {
          roomCode: roomCode,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({
        type: "FETCH_ROOM_NOTES",
        noteList: result.data.notes,
      });
    } catch (err) {
      dispatch({
        type: "FETCH_ROOM_NOTES_ERROR",
        errorMsg: err.response.data.message,
      });
    }
  }, []);

  // ADD ROOM NOTES
  const onAddNewNotes = useCallback(async (data, token) => {
    dispatch({
      type: "ADD_ROOM_NOTES_START",
    });
    try {
      let result = await axios.post("/api/f/note", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch({
        type: "ADD_ROOM_NOTES",
        note: result.data.note,
      });
    } catch (err) {
      dispatch({
        type: "ADD_ROOM_NOTES_ERROR",
        errorMsg: err.response.data.message,
      });
    }
  }, []);

  const context = {
    noteList: noteState.noteList,
    loading: noteState.loading,
    error: noteState.error,
    errorMsg: noteState.errorMsg,
    fetchRoomNotes: onFetchRoomNotes,
    addNewNotes: onAddNewNotes,
  };
  return (
    <NoteContext.Provider value={context}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteContext;
