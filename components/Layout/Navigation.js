import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { BsClipboardData } from "react-icons/bs";
import AuthContext from "../../store/Auth/Auth-Context";

export default function NavigationPage() {
  const AuthCtx = useContext(AuthContext);
  const { userType, userLogout, token } = AuthCtx;

  const logoutHandler = () => {
    userLogout();
  };

  return (
    <header className="header">
      <Container>
        <ul className="d-flex justify-content-between align-items-center">
          {userType ? (
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

          {token && (
            <li>
              <Image
                src="/images/forhad.jpg"
                alt="user name"
                width={40}
                height={40}
              />
              <div className="logout" onClick={logoutHandler}>
                Logout
              </div>
            </li>
          )}
        </ul>
      </Container>
    </header>
  );
}
