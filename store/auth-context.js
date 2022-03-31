import { createContext, useEffect, useState } from "react";
// import axios from "axios";
import axios from "../util/axios";

const AuthContext = createContext({
  userType: null,
  facultyId: null,
  studentId: null,
  token: null,
  authSuccess: false,
  error: false,
  addUserType: function (type) {},
  userSignup: function (userData, type) {},
  userLogin: function (data) {},
  userLogout: function () {},
  autoLogin: function () {},
  autoUserType: function () {},
});

export function AuthContextProvider(props) {
  const [facultyId, setFacultyId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [token, setToken] = useState(null);
  const [userTypeIs, setUserTypeIs] = useState(null);
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // USER TYPE
  function addUserTypeHandler(type) {
    setUserTypeIs(type);
    localStorage.setItem("userType", type);
  }

  // AUTO USER TYPE
  function autoUserTypeHandler() {
    const userType = localStorage.getItem("userType");

    if (userType) {
      setUserTypeIs(userType);
    }
  }

  // SIGNUP
  async function userSignupHandler(data, type) {
    let URL = null;
    if (type === "faculty") {
      URL = "http://localhost:8000/api/f/signup";
    }
    if (type === "student") {
      URL = "http://localhost:8000/api/s/signup";
    }
    setIsError(false);
    try {
      let result = await axios.post(URL, data);
      setIsAuthSuccess(true);
    } catch (err) {
      console.log(err.message);
      setIsError(true);
    }
  }

  // LOGIN
  async function userLoginHandler(data, type) {
    let URL = null;
    if (type === "faculty") {
      URL = "http://localhost:8000/api/f/login";
    }
    if (type === "student") {
      URL = "http://localhost:8000/api/s/login";
    }
    setIsError(false);
    try {
      let result = await axios.post(URL, data);
      const expirationDate = new Date(
        new Date().getTime() + 365 * 24 * 3600 * 1000
      );
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("expirationDate", expirationDate);
      if (type === "faculty") {
        localStorage.setItem("facultyId", result.data.facultyId);
        setFacultyId(result.data.facultyId);
      }
      if (type === "student") {
        localStorage.setItem("studentId", result.data.studentId);
        setStudentId(result.data.studentId);
      }
      setToken(result.data.token);
      await checkAuthTimeout(365 * 24 * 3600);
    } catch (err) {
      console.log(err.message);
      setIsError(true);
    }
  }

  // LOGOUT
  function userLogoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("facultyId");
    localStorage.removeItem("studentId");
    setToken(null);
    setFacultyId(null);
    setStudentId(null);
  }

  // AUTH TIMEOUT
  async function checkAuthTimeout(expirationTime) {
    setTimeout(() => {
      userLogoutHandler();
    }, expirationTime * 1000);
  }

  // AUTO LOGIN
  async function autoLoginHandler() {
    const token = localStorage.getItem("token");

    if (!token) {
      userLogoutHandler();
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        userLogoutHandler();
      } else {
        const facultyId = localStorage.getItem("facultyId");
        const studentId = localStorage.getItem("studentId");
        setToken(token);
        setFacultyId(facultyId);
        setStudentId(studentId);

        facultyId && setUserTypeIs("faculty");
        studentId && setUserTypeIs("student");

        await checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        );
      }
    }
  }

  const context = {
    facultyId: facultyId,
    studentId: studentId,
    token: token,
    userType: userTypeIs,
    authSuccess: isAuthSuccess,
    error: isError,
    addUserType: addUserTypeHandler,
    userSignup: userSignupHandler,
    userLogin: userLoginHandler,
    userLogout: userLogoutHandler,
    autoLogin: autoLoginHandler,
    autoUserType: autoUserTypeHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
