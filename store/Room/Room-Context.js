import { createContext, useCallback, useReducer } from "react";
import axios from "../../util/axios";
import Reducer from "./Room-Reducer";

const RoomContext = createContext({
  rooms: [],
  loading: false,
  error: false,
  errorMsg: "",
  fetchAllRooms: function (token) {},
  initAddFacultyRoom: function () {},
  addFacultyRoom: function (data, token) {},
});

const initialState = {
  rooms: [],
  loading: false,
  error: false,
  errorMsg: "",
};

export function RoomContextProvider(props) {
  const [roomState, dispatch] = useReducer(Reducer, initialState);

  // FETCH ALL ROOMS
  const onFetchAllRooms = useCallback(async (token, userType) => {
    dispatch({
      type: "FETCH_ALL_ROOMS_START",
    });
    try {
      let URL = null;
      if (userType === "faculty") {
        URL = "/api/f/rooms";
      }
      if (userType === "student") {
        URL = "/api/s/rooms";
      }
      let result = await axios.get(URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch({
        type: "FETCH_ALL_ROOMS",
        rooms: result.data.rooms,
      });
    } catch (err) {
      dispatch({
        type: "FETCH_ALL_ROOMS_ERROR",
        errorMsg: err.response.data.message,
      });
    }
  }, []);

  const onInitAddFacultyRoom = useCallback(() => {
    dispatch({
      type: "INIT_ADD_FACULTY_ROOM",
    });
  }, []);

  // ADD FACULTY ROOM
  const onAddFacultyRoom = useCallback(async (data, token) => {
    dispatch({
      type: "ADD_FACULTY_ROOM_START",
    });
    try {
      const result = await axios.post("/api/f/room", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      dispatch({
        type: "ADD_FACULTY_ROOM",
        room: result.data.room,
      });
    } catch (err) {
      dispatch({
        type: "ADD_FACULTY_ROOM_ERROR",
        errorMsg: err.response.data.message,
      });
    }
  }, []);

  const context = {
    rooms: roomState.rooms,
    loading: roomState.loading,
    error: roomState.error,
    errorMsg: roomState.errorMsg,
    fetchAllRooms: onFetchAllRooms,
    initAddFacultyRoom: onInitAddFacultyRoom,
    addFacultyRoom: onAddFacultyRoom,
  };
  return (
    <RoomContext.Provider value={context}>
      {props.children}
    </RoomContext.Provider>
  );
}

export default RoomContext;
