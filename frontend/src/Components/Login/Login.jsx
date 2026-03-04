import React from "react";
import "./Login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../Services/UserApi";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await userLogin(values);
      if (res.data.success) {
        toast.success("Login Successfully")
        navigate("/Dashboard");
      }else{
        toast.error("Wrong password/email")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="login-container">
        <h2>IMS Login</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="login-form">
            <div className="input-group">
              <Field type="email" name="email" placeholder="Enter Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="input-group">
              <Field
                type="password"
                name="password"
                placeholder="Enter Password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit">Login</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
