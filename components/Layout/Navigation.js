import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useLayoutEffect } from "react";
import { Container } from "react-bootstrap";
import { BsClipboardData } from "react-icons/bs";
import AuthContext from "../../store/auth-context";

export default function NavigationPage() {
  const AuthCtx = useContext(AuthContext);
  const { userType } = AuthCtx;

  // let logoLink = "/";

  // // useEffect(() => {
  // if (AuthCtx.userType) {
  //   logoLink = `/${userType}/rooms`;
  // }
  // console.log("link: ", logoLink);
  // }, [userType]);

  return (
    <header className="header">
      <Container>
        <ul className="d-flex justify-content-between align-items-center">
          {AuthCtx.userType ? (
            <li>
              <Link href={`/${userType}/rooms`}>
                <a className="logo">
                  <BsClipboardData /> Classroom
                </a>
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/">
                <a className="logo">
                  <BsClipboardData /> Classroom
                </a>
              </Link>
            </li>
          )}

          {userType && (
            <li>
              <Image
                src="/images/forhad.jpg"
                alt="user name"
                width={40}
                height={40}
              />
            </li>
          )}
        </ul>
      </Container>
    </header>
  );
}
