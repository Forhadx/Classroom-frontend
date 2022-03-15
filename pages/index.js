import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUserTie, FaUser } from "react-icons/fa";
import AuthContext from "../store/auth-context";

export default function Home() {
  const router = useRouter();

  const [userIs, setUserIs] = useState(null);

  const AuthCtx = useContext(AuthContext);

  const facultyHandler = () => {
    setUserIs("faculty");
    AuthCtx.addUserType("faculty");
  };

  const studentHandler = () => {
    setUserIs("student");
    AuthCtx.addUserType("student");
  };

  return (
    <div className="starting-page">
      <Container>
        <Row>
          <Col md="8" className="offset-md-2">
            <Card>
              <Card.Body>
                <h1 className="text-center">Join as a Faculty or Student</h1>
                <img src="/images/home-cover.png" alt="cover image" />
                <div className="d-flex justify-content-between">
                  {/* User select */}
                  <div
                    className={`starting-page-type ${
                      userIs === "faculty" ? "active" : ""
                    }`}
                    onClick={facultyHandler}
                  >
                    <div className="user-logo">
                      <FaUserTie />
                    </div>
                    <h3>Faculty</h3>
                  </div>
                  <div
                    className={`starting-page-type ${
                      userIs === "student" ? "active" : ""
                    }`}
                    onClick={studentHandler}
                  >
                    <div className="user-logo">
                      <FaUser />
                    </div>
                    <h3>Student</h3>
                  </div>
                </div>

                {/* Auth type */}
                {userIs && (
                  <div className="starting-page-auth">
                    <button
                      className="btn-outline me-2"
                      onClick={() => router.push("/signup")}
                    >
                      {`Signup as ${userIs}`}
                    </button>
                    <button
                      className="btn ms-2"
                      onClick={() => router.push("/login")}
                    >
                      {`Login as ${userIs}`}
                    </button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
