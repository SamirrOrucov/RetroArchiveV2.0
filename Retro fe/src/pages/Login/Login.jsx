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
      const response = await fetch("http://localhost:3003/auth/login", {
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
        <img src="https://s3-alpha-sig.figma.com/img/3fd5/4f33/6eba19c8cde4cf3ac884cb3e7a6f3671?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=il7P289vSeN6JRrgP0EDuWHgivpMU6FjxDP0ePV6z2-SE4mYGV7Hbkrla6ug5-wWba9lb5vdmhzOnU2yfRVA~i96jmCE66Pz1eO9ywvP8bfNsvTMlJEEQ71GnBwmgBVPEXEd4plPrJ1uKPqeVrAgG3MQsc-~Q9YOX53y~U0l4Ja~SWthfaTitWhESO4w4~elryQzKihVtcx8S1TWiBvR2D-ee56bfylrt3X~cl1jigRPlZNtqABXQ0aTP6xhj6EW6jrSnMfJwhizro-8hkldCAkpqxTNpdAhVpyIevxaN32KTzcLUDg6oTzm6Z0P0WxaipK4J4fYCZKa~wdyDeF2jQ__" alt="" />
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
