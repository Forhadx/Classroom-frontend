import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Row, Col, Container, Form, InputGroup, Button } from "react-bootstrap";
import AuthContext from "../store/auth-context";

export default function LoginPage() {
  const router = useRouter();

  const AuthCtx = useContext(AuthContext);
  const { authSuccess, userType, user } = AuthCtx;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    AuthCtx.userLogin(
      {
        email: "f@g.com",
        password: "123456",
      },
      userType
    );
  };

  useEffect(() => {
    if (user) {
      router.push(`/${userType}/rooms`);
    }
  }, [user]);

  return (
    <Container className="auth-page">
      <Row className="auth-page-row">
        <Col lg="5" className="offset-1">
          <Form onSubmit={formSubmitHandler}>
            <h3>Login to Classroom</h3>
            <Row>
              <Form.Group as={Col} lg="10" className="form-group offset-1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  // required
                  type="email"
                  placeholder="Enter your email"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} lg="10" className="form-group offset-1">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Form.Group>
              <Form.Check
                className="offset-1"
                // required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button type="submit" varient="primary" className=" offset-1">
              Login
            </Button>
          </Form>
          <p className="auth-change">
            New at Classroom? <Link href="/signup">Create Account</Link>{" "}
          </p>
        </Col>
        <Col lg="5">
          <img src="/images/login.png" alt="signup cover" className="w-100" />
        </Col>
      </Row>
    </Container>
  );
}
