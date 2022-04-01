import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Row, Col, Container, Form, InputGroup, Button } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function LoginPage() {
  const router = useRouter();

  const AuthCtx = useContext(AuthContext);
  const { userType, token, userLogin, autoUserType } = AuthCtx;

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "! Password at least 6 character"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const formSubmitHandler = (data) => {
    userLogin(
      {
        email: data.email,
        password: data.password,
      },
      userType
    );
  };

  useEffect(() => {
    // console.log("login page?");
    if (token) {
      router.push(`/${userType}/rooms`);
    }
    autoUserType();
  }, [token, userType, autoUserType, router]);

  return (
    <Container className="auth-page">
      <Row className="auth-page-row">
        <Col lg="5" className="offset-1">
          <form
            className="auth-form-inputes"
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            <h3>
              Login as <span>{userType}</span>
            </h3>
            <Row>
              <Col lg="10" className="offset-1 mb-2">
                <label>{`Email (${
                  userType === "faculty" ? "f@f.com" : "s@s.com"
                })`}</label>
                <input
                  type="text"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="form-control"
                />
                <p>
                  <small>{errors.email?.message}</small>
                </p>
              </Col>
              <Col lg="10" className="offset-1 mb-2">
                <label>{`Password (123456)`}</label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  className="form-control"
                />
                <p>
                  <small>{errors.password?.message}</small>
                </p>
              </Col>
            </Row>

            <Button type="submit" varient="primary" className=" offset-1">
              Login
            </Button>
          </form>
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
