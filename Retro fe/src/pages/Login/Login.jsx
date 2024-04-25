import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UserTokenContext } from "../../context/UserTokenContext";
import "./Login.scss"
function Login() {
  const navigate = useNavigate();
  const { addToken } = useContext(UserTokenContext);

  async function loginUser(values) {
    try {
      const response = await fetch("https://retroarchivev2-0.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const tokenResponse = await response.json();
      const token = tokenResponse.token;

      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token received from the server');
      }

      addToken(token);
      navigate("/");
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="login">
      <div className="login_container">
       <div className="left">
        <h2>FILM & AZE</h2>
        <img src="https://m.media-amazon.com/images/M/MV5BM2E5NWM0ZDktNDdkNS00M2RmLWI1OGItOGY3ODQwZWYzZjA3XkEyXkFqcGdeQXVyNTE1MDE2MzY@._V1_.jpg" alt="" />
       </div>
       <div className="right">
       <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              loginUser(values);
              setSubmitting(false);
            }, 400);
          }}>
          <Form>
          <p>Login</p>
          <div className="field">
          <label htmlFor="email">Email</label>
          <Field name="email" type="email" placeholder="example@gmail.com" />
          <ErrorMessage name="email" />
          </div>
          <div className="field">
          <label htmlFor="password">Password</label>
          <Field name="password" type="text" placeholder="************" />
          <ErrorMessage name="password" />
          </div>
          <button type="submit">Submit</button>
        </Form>
        
        </Formik>
        <Link to={"/register"}>Don't have an account?</Link>
       </div>
      </div>
    </div>
  );
}

export default Login;
