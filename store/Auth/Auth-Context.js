import { createContext, useCallback, useReducer } from "react";
import axios from "../../util/axios";
import Reducer from "./Auth-Reducer";

const AuthContext = createContext({
  userType: null,
  facultyId: null,
  studentId: null,
  token: null,
  authSuccess: false,
  loading: false,
  error: false,
  userSignup: function (userData) {},
  userLogin: function (data) {},
  userLogout: function () {},
  autoLogin: function () {},
  addUserType: function (type) {},
  autoUserType: function () {},
});

const initialState = {
  userType: null,
  facultyId: null,
  studentId: null,
  token: null,
  authSuccess: false,
  loading: false,
  error: false,
};

export function AuthContextProvider(props) {
  const [userState, dispatch] = useReducer(Reducer, initialState);

  // USER TYPE
  const onAddUserType = useCallback((type) => {
    localStorage.setItem("userType", type);
    dispatch({
      type: "ADD_USER_TYPE",
      userType: type,
    });
  }, []);

  // AUTO USER TYPE
  const onAutoUserType = useCallback(() => {
    const userType = localStorage.getItem("userType");

    if (userType) {
      dispatch({
        type: "AUTO_USER_TYPE",
        userType: userType,
      });
    }
  }, []);

  // USER SIGNUP
  const onUserSignup = useCallback(async (data, type) => {
    dispatch({
      type: "USER_SIGNUP_START",
    });

    let URL = null;
    if (type === "faculty") {
      URL = "/api/f/signup";
    }
    if (type === "student") {
      URL = "/api/s/signup";
    }
    try {
      await axios.post(URL, data);
      dispatch({
        type: "USER_SIGNUP",
      });
    } catch (err) {
      dispatch({
        type: "USER_SIGNUP_ERROR",
      });
    }
  }, []);

  // USER LOGIN
  const onUserLogin = useCallback(async (data, type) => {
    dispatch({
      type: "USER_LOGIN_START",
    });
    let URL = null;
    if (type === "faculty") {
      URL = "/api/f/login";
    }
    if (type === "student") {
      URL = "/api/s/login";
    }
    let facultyId = null;
    let studentId = null;
    try {
      const result = await axios.post(URL, data);
      const expirationDate = new Date(
        new Date().getTime() + 365 * 24 * 3600 * 1000
      );
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("expirationDate", expirationDate);
      if (type === "faculty") {
        localStorage.setItem("facultyId", result.data.facultyId);
        facultyId = result.data.facultyId;
      }
      if (type === "student") {
        localStorage.setItem("studentId", result.data.studentId);
        studentId = result.data.studentId;
      }
      await checkAuthTimeout(365 * 24 * 3600);
      dispatch({
        type: "USER_LOGIN",
        token: result.data.token,
        facultyId: facultyId,
        studentId: studentId,
      });
    } catch (err) {
      dispatch({
        type: "USER_LOGIN_ERROR",
      });
    }
  }, []);

  //  LOGOUT
  const onUserLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("facultyId");
    localStorage.removeItem("studentId");
    dispatch({
      type: "USER_LOGOUT",
    });
  };

  // AUTH TIMEOUT
  const checkAuthTimeout = useCallback(async (expirationTime) => {
    setTimeout(() => {
      onUserLogout();
    }, expirationTime * 1000);
  }, []);

  // AUTO LOGIN
  const onAutoLogin = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      onUserLogout();
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        onUserLogout();
      } else {
        dispatch({
          type: "USER_AUTO_LOGIN",
          token: localStorage.getItem("token"),
          facultyId: localStorage.getItem("facultyId"),
          studentId: localStorage.getItem("studentId"),
          userType: localStorage.getItem("userType"),
        });
        await checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        );
      }
    }
  }, [checkAuthTimeout]);

  const context = {
    userType: userState.userType,
    facultyId: userState.facultyId,
    studentId: userState.studentId,
    token: userState.token,
    authSuccess: userState.authSuccess,
    loading: userState.loading,
    error: userState.error,
    userSignup: onUserSignup,
    userLogin: onUserLogin,
    userLogout: onUserLogout,
    autoLogin: onAutoLogin,
    addUserType: onAddUserType,
    autoUserType: onAutoUserType,
  };
  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
