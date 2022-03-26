import { Row, Col, Container, Form, InputGroup, Button } from "react-bootstrap";
import Link from "next/link";
import AuthContext from "../store/auth-context";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";

export default function SignupPage() {
  const AuthCtx = useContext(AuthContext);
  const { authSuccess, userType } = AuthCtx;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    AuthCtx.userSignup(
      {
        name: "max",
        email: "f@f.com",
        password: "123456",
        image: "i.jpg",
      },
      userType
    );
  };

  useEffect(() => {
    if (authSuccess) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your account created succesfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [authSuccess]);

  return (
    <Container className="auth-page">
      <Row className="auth-page-row">
        <Col lg="5">
          <img src="/images/signup.png" alt="signup cover" className="w-100" />
        </Col>
        <Col lg="5" className="offset-1">
          <Form onSubmit={formSubmitHandler}>
            <h3>{`Register as ${userType}`}</h3>
            <Row>
              <Form.Group as={Col} lg="10" className="form-group offset-1">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  // required
                  type="text"
                  placeholder="Eneter your name"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
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
              <Form.Group
                as={Col}
                lg="10"
                controlId="validationCustom04"
                className="form-group offset-1"
              >
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  // required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
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
              Create Account
            </Button>
          </Form>
          <p className="auth-change">
            Already have an Account? <Link href="/login">login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
