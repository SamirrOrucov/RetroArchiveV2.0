import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../../AdminFilms/AddFilm/AddFilm.scss";
function AddActors() {
  const navigate = useNavigate();

  function addFilms(values) {
    fetch("https://retroarchivev2-0.onrender.com/actor/", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
    navigate("/admin/actors");
  }
  return (
    <div className="addFilms">
      <div className="addFilms_container">
        <Formik
          initialValues={{
            image: null,
            name: null,
            desc: null,
          }}
          validationSchema={Yup.object({
            image: Yup.string()
              .max(1500, "Must be 15 characters or less")
              .required("Required"),
            name: Yup.string()
              .max(200, "Must be 20 characters or less")
              .required("Required"),
            desc: Yup.string()
              .max(2000, "Must be 20 characters or less")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              addFilms(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <label htmlFor="image">Actor Image</label>
            <Field name="image" type="text" />
            <ErrorMessage component="div" className="error" name="image" />

            <label htmlFor="name">Actor Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" />

            <label htmlFor="desc">Description</label>
            <Field name="desc" type="text" />
            <ErrorMessage name="desc" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddActors;
