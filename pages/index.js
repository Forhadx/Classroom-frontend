import { useRouter } from "next/router";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUserTie, FaUser } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  return (
    <div className="auth-page">
      <Container>
        <Row>
          <Col md="8" className="offset-md-2">
            <Card>
              <Card.Body>
                <h1 className="text-center">Join as a Faculty or Student</h1>
                <img src="/images/home-cover.png" alt="cover image" />
                <div className="d-flex justify-content-between">
                  <div className="auth-page-type active">
                    <div className="user-logo">
                      <FaUserTie />
                    </div>
                    <h3>Faculty</h3>
                  </div>
                  <div className="auth-page-type">
                    <div className="user-logo">
                      <FaUser />
                    </div>
                    <h3>Student</h3>
                  </div>
                </div>
                <div className="auth-page-auth">
                  <button
                    className="btn-outline me-2"
                    onClick={() => router.push("/signup")}
                  >
                    Signup as Faculty
                  </button>
                  <button
                    className="btn ms-2"
                    onClick={() => router.push("/login")}
                  >
                    Login as Faculty
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
