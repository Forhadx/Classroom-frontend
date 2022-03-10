import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { BsClipboardData } from "react-icons/bs";

export default function NavigationPage() {
  return (
    <header className="header">
      <Container>
        <ul className="d-flex justify-content-between align-items-center">
          <li>
            <Link href="/">
              <a>
                <BsClipboardData />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <Image
                  src="/images/forhad.jpg"
                  alt="user name"
                  width={40}
                  height={40}
                />
              </a>
            </Link>
          </li>
        </ul>
      </Container>
    </header>
  );
}
