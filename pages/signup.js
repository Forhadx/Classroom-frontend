import { Row, Col, Container, Form, InputGroup, Button } from "react-bootstrap";
import Link from "next/link";
import AuthContext from "../store/auth-context";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function SignupPage() {
  const AuthCtx = useContext(AuthContext);
  const { authSuccess, userType, autoUserType } = AuthCtx;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("name is required")
      .min(3, "too small name, minimum 3 character")
      .max(60, "too big name, maximum 60 character "),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "! Password at least 6 character"),
    image: Yup.mixed().test(
      "file",
      "Image is required (minimum 5MB)",
      (value) => {
        if (!value.length) {
          return false;
        }
        return value[0].size <= 5000000;
      }
    ),
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
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", data.image[0]);
    AuthCtx.userSignup(
      // {
      //   name: "max",
      //   email: "f@f.com",
      //   password: "123456",
      //   image: "i.jpg",
      // },
      formData,
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
    autoUserType();
  }, [authSuccess]);

  return (
    <Container className="auth-page">
      <Row className="auth-page-row">
        <Col lg="5">
          <img src="/images/signup.png" alt="signup cover" className="w-100" />
        </Col>
        <Col lg="5" className="offset-1">
          <form
            className="auth-form-inputes"
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            <h3>
              Register as <span>{userType}</span>
            </h3>
            <Row>
              <Col lg="10" className="offset-1 mb-2">
                <label>Your Name</label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Eneter your name"
                  className="form-control"
                />
                <p>
                  <small>{errors.name?.message}</small>
                </p>
              </Col>
              <Col lg="10" className="offset-1 mb-2">
                <label>Email</label>
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
                <label>Password</label>
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
              <Col lg="10" className="offset-1 mb-4">
                <label>Upload Image</label>
                <input
                  type="file"
                  {...register("image")}
                  accept="image/*"
                  className="form-control"
                />
                <p>
                  <small>{errors.image?.message}</small>
                </p>
              </Col>
            </Row>

            <Button type="submit" varient="primary" className=" offset-1">
              Create Account
            </Button>
          </form>
          <p className="auth-change">
            Already have an Account? <Link href="/login">login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
