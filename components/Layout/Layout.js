import NavigationPage from "./Navigation";
import AuthContext from "../../store/Auth/Auth-Context";
import { useRouter } from "next/router";
import { useContext, useState, useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Layout(props) {
  const [flag, setFlag] = useState(true);
  const router = useRouter();
  const pathName = router.pathname.split("/")[1];

  const AuthCtx = useContext(AuthContext);
  const { facultyId, studentId, token, autoLogin } = AuthCtx;

  useIsomorphicLayoutEffect(() => {
    if (!token && flag) {
      // console.log("1?");
      autoLogin();
      setFlag(false);
    } else if (!token && (pathName === "student" || pathName === "faculty")) {
      // console.log("2?");
      router.push("/");
    } else if (
      token &&
      (pathName === "" || pathName === "login" || pathName === "signup")
    ) {
      // console.log("3?");
      facultyId && router.push("/faculty/rooms");
      studentId && router.push("/student/rooms");
    } else if (
      (facultyId && pathName === "student") ||
      (studentId && pathName === "faculty")
    ) {
      // console.log("4?");
      router.push("/404");
    }
  }, [autoLogin, facultyId, token, studentId]);

  return (
    <>
      <NavigationPage />
      <main className="main">{props.children}</main>
    </>
  );
}
