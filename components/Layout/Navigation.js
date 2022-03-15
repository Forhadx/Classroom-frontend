import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { BsClipboardData } from "react-icons/bs";
import AuthContext from "../../store/auth-context";

export default function NavigationPage() {
  const AuthCtx = useContext(AuthContext);

  let logoLink = "/";

  if (AuthCtx.userType) {
    logoLink = `${AuthCtx.userType}/rooms`;
  }

  return (
    <header className="header">
      <Container>
        <ul className="d-flex justify-content-between align-items-center">
          <li>
            <Link href={logoLink}>
              <a className="logo">
                <BsClipboardData /> Classroom
              </a>
            </Link>
          </li>
          <li>
            <Image
              src="/images/forhad.jpg"
              alt="user name"
              width={40}
              height={40}
            />
          </li>
        </ul>
      </Container>
    </header>
  );
}
