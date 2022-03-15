import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext({
  user: null,
  userType: null,
  authSuccess: false,
  error: false,
  addUserType: function (type) {},
  userSignup: function (userData, type) {},
  userLogin: function (data) {},
});

export function AuthContextProvider(props) {
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  function addUserTypeHandler(type) {
    setUserType(type);
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
      console.log("login: ", result);
      // setIsAuthSuccess(true);
    } catch (err) {
      console.log(err.message);
      setIsError(true);
    }
  }

  const context = {
    user: userData,
    userType: userType,
    authSuccess: isAuthSuccess,
    error: isError,
    addUserType: addUserTypeHandler,
    userSignup: userSignupHandler,
    userLogin: userLoginHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
