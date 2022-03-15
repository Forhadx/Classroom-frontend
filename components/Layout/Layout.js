import NavigationPage from "./Navigation";
import Link from "next/link";
import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";
import { useContext, useState, useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Layout(props) {
  const router = useRouter();
  const pathName = router.pathname.split("/")[1];
  // const [isPush, setIsPush] = useState(false);

  const AuthCtx = useContext(AuthContext);
  const { userType } = AuthCtx;
  // console.log("router: ", router.pathname);
  // console.log("user: ", userType);

  // if (!userType && (pathName === "faculty" || pathName === "student")) {
  //   router.push("/");
  //   // setIsPush(true);
  //   console.log("push?");
  // }

  useIsomorphicLayoutEffect(() => {
    if (
      (userType === "faculty" && pathName === "student") ||
      (userType === "student" && pathName === "faculty")
    ) {
      router.push("/404");
    }
    if (!userType && (pathName === "faculty" || pathName === "student")) {
      router.push("/");
    }
  }, [pathName]);

  return (
    <>
      <NavigationPage />
      <main className="main">{props.children}</main>
      {/* <div>
        <Link href="/faculty/rooms">/faculty/rooms</Link>
        <br />
        <Link href="/faculty/rooms/1">/faculty/rooms/1</Link>
        <br />
        <Link href="/faculty/rooms/1/attendance">
          /faculty/rooms/1/attendance
        </Link>
        <br />
        <hr />
        <Link href="/student/rooms">/student/rooms</Link>
        <br />
        <Link href="/student/rooms/1">/student/rooms/1</Link>
        <br />
        <Link href="/student/rooms/1/attendance">
          /student/rooms/1/attendance
        </Link>
      </div> */}
    </>
  );
}
