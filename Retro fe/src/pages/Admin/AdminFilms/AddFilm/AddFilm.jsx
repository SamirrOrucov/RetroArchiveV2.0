import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./AddFilm.scss";
function AddFilm() {
  const navigate = useNavigate();

  function addFilms(values) {
    fetch("http://localhost:3003/film/", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
    navigate("/admin/films");
  }

  return (
    <div className="addFilms">
      <div className="addFilms_container">
        <Formik
          initialValues={{
            image: null,
            title: null,
            desc: null,
            director: null,
            directorYears: null,
            directorImg: null,
            duration: null,
            date: null,
            category: null,
          }}
          validationSchema={Yup.object({
            image: Yup.string()
              .max(1500, "Must be 15 characters or less")
              .required("Required"),
            title: Yup.string()
              .max(200, "Must be 20 characters or less")
              .required("Required"),
            desc: Yup.string()
              .max(2000, "Must be 20 characters or less")
              .required("Required"),
            director: Yup.string()
              .max(40, "Must be 20 characters or less")
              .required("Required"),
            directorYears: Yup.string()
              .max(202, "Must be 20 characters or less")
              .required("Required"),
            directorImg: Yup.string()
              .max(200, "Must be 20 characters or less")
              .required("Required"),
            duration: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            date: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            category: Yup.string()
              .max(20, "Must be 20 characters or less")
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
            <label htmlFor="image">Film Image</label>
            <Field name="image" type="text" />
            <ErrorMessage component="div" className="error" name="image" />

            <label htmlFor="title">Film Title</label>
            <Field name="title" type="text" />
            <ErrorMessage name="title" />

            <label htmlFor="desc">Description</label>
            <Field name="desc" type="text" />
            <ErrorMessage name="desc" />

            <label htmlFor="director">Director</label>
            <Field name="director" type="text" />
            <ErrorMessage name="director" />

            <label htmlFor="directorYears">Director's Years</label>
            <Field name="directorYears" type="text" />
            <ErrorMessage name="directorYears" />

            <label htmlFor="directorImg">Director Image</label>
            <Field name="directorImg" type="text" />
            <ErrorMessage name="directorImg" />

            <label htmlFor="duration">Film Duration</label>
            <Field name="duration" type="text" />
            <ErrorMessage name="duration" />

            <label htmlFor="date">Date</label>
            <Field name="date" type="text" />
            <ErrorMessage name="date" />

            <label htmlFor="category">Category</label>
            <Field name="category" type="text" />
            <ErrorMessage name="category" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddFilm;
