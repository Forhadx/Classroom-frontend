import { createContext, useState } from "react";

const AuthContext = createContext({
  user: null,
  userType: null,
  addUserType: function (type) {},
  userSignup: function (data) {},
  userLogin: function (data) {},
});

export function AuthContextProvider(props) {
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(null);

  function addUserTypeHandler(type) {
    setUserType(type);
  }
  function userSignupHandler(data) {}
  function userLoginHandler(data) {}

  const context = {
    user: userData,
    userType: userType,
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
