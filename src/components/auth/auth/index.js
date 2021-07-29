import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import Modal from "react-modal";
import { XIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import {
  signinWithEmailAndPassword,
  confirmEmail,
  forgotPassword,
  resetPassword,
  signup,
} from "utils/graphql";
import ForgotPassword from "../forgotPassword";
import forgotPasswordValidationSchema from "../forgotPassword/validationSchema";
import ResetPassword from "../resetPassword";
import resetPasswordValidationSchema from "../resetPassword/validationSchema";
import Signin from "../signin";
import signinValidationSchema from "../signin/validationSchema";
import Signup from "../signup";
import signupValidationSchema from "../signup/validationSchema";
import verifyEmail from "../verifyEmail";
import verifyEmailValidationSchema from "../verifyEmail/validationSchema";
import { UI_COMPONENTS } from "../constants";
import { selectAuthSlice, closeModal, setActiveComponent } from "../slice";
import styles from "./style.module.css";

Modal.setAppElement("#root");

const Auth = () => {
  const dispatch = useDispatch();
  const authSlice = useSelector(selectAuthSlice);
  const [loading, setLoading] = useState(false);

  let Component = null;
  let validationSchema;
  let buttonText = "";
  let titleText = "";

  switch (authSlice.activeComponent) {
    case UI_COMPONENTS.FORGOT_PASSWORD:
      Component = ForgotPassword;
      validationSchema = forgotPasswordValidationSchema;
      buttonText = "submit";
      titleText = "Forgot Password";
      break;

    case UI_COMPONENTS.RESET_PASSWORD:
      Component = ResetPassword;
      validationSchema = resetPasswordValidationSchema;
      buttonText = "reset password";
      titleText = "Reset Password";
      break;

    case UI_COMPONENTS.SIGNIN:
      Component = Signin;
      validationSchema = signinValidationSchema;
      buttonText = "signin";
      titleText = "Signin";
      break;

    case UI_COMPONENTS.SIGNUP:
      Component = Signup;
      validationSchema = signupValidationSchema;
      buttonText = "signup";
      titleText = "Signup";
      break;

    case UI_COMPONENTS.VERIFY_EMAIL:
      Component = verifyEmail;
      validationSchema = verifyEmailValidationSchema;
      buttonText = "verify";
      titleText = "Verify Email";
      break;

    default:
      Component = null;
      validationSchema = null;
      buttonText = "";
      titleText = "";
  }

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
    phoneNumber: "",
  };

  const onSubmit = async (values) => {
    setLoading(true);

    if (authSlice.activeComponent === UI_COMPONENTS.SIGNIN) {
      const response = await signinWithEmailAndPassword(
        values.email,
        values.password
      );

      if (response.status === "success") {
        toast.success("Logged in successfully");
      } else if (response.status === "fail") {
        if (response.code === "UserNotConfirmedException") {
          dispatch(setActiveComponent(UI_COMPONENTS.VERIFY_EMAIL));
        }
      }
    } else if (authSlice.activeComponent === UI_COMPONENTS.VERIFY_EMAIL) {
      // confirm the code
      const response = await confirmEmail(values.email, values.code);

      // if the code is successful than signin the user
      if (response.status === "success") {
        const signinResponse = await signinWithEmailAndPassword(
          values.email,
          values.password
        );

        // if signin failed than show signin component
        if (signinResponse.status === "fail") {
          if (
            signinResponse.code === "NotAuthorizedException" ||
            signinResponse.code === "UserNotFoundException"
          ) {
            dispatch(setActiveComponent(UI_COMPONENTS.SIGNIN));
          }
        }
      }
    } else if (authSlice.activeComponent === UI_COMPONENTS.FORGOT_PASSWORD) {
      const response = await forgotPassword(values.email);

      if (response.status === "success") {
        dispatch(setActiveComponent(UI_COMPONENTS.RESET_PASSWORD));
      }
    } else if (authSlice.activeComponent === UI_COMPONENTS.RESET_PASSWORD) {
      const response = await resetPassword(
        values.email,
        values.code,
        values.password
      );
      if (response.status === "success") {
        dispatch(setActiveComponent(UI_COMPONENTS.SIGNIN));
      }
    } else if (authSlice.activeComponent === UI_COMPONENTS.SIGNUP) {
      const response = await signup(
        values.fullname,
        values.email,
        values.password
      );

      // if signup successfully than set the active component to be verify email
      if (response.status === "success") {
        dispatch(setActiveComponent(UI_COMPONENTS.VERIFY_EMAIL));
      }
    }

    setLoading(false);
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldError,
    setFieldTouched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const onClose = () => {
    dispatch(closeModal());
    setTimeout(() => {
      dispatch(setActiveComponent(UI_COMPONENTS.SIGNUP));
      resetForm();
    }, 500);
  };

  return (
    <Modal
      isOpen={authSlice.isOpen}
      onRequestClose={onClose}
      className="bg-white w-96 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 px-6 py-8 shadow-md overflow-y-auto max-h-full"
      style={{
        overlay: {
          zIndex: 99,
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* Close Icon here */}
        <button className="absolute top-4 right-4" onClick={onClose}>
          <XIcon className="w-6 h-6 text-gray-500" />
        </button>
        {/* Logo here */}
        <div className="flex justify-center mb-5">
          <p
            to="/"
            className="block text-appYellow-700 text-2xl font-bold uppercase relative"
          >
            <span className={styles.headerLogo}>neuralnk</span>
          </p>
        </div>
        {/* Title here */}
        <p variant="h6" className="mb-3 font-semibold text-lg uppercase">
          {titleText}
        </p>
        {/* Description Here */}
        <Component
          values={values}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          onBlur={handleBlur}
          resetForm={resetForm}
          setFieldError={setFieldError}
          setFieldTouched={setFieldTouched}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-appYellow-700 text-appDark-700 border-none uppercase text-base font-bold mt-4 flex items-center justify-center disabled:opacity-40"
        >
          {loading ? (
            <Loader width={30} height={30} type="ThreeDots" color="#fff" />
          ) : (
            <>{buttonText}</>
          )}
        </button>
        {/* Actions here */}
        <div className="mt-4">
          {authSlice.activeComponent === UI_COMPONENTS.SIGNUP && (
            <p className="text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  dispatch(setActiveComponent(UI_COMPONENTS.SIGNIN));
                }}
                className="bg-transparent	text-appYellow-900 border-none outline-none cursor-pointer"
              >
                Signin
              </button>
            </p>
          )}

          {authSlice.activeComponent === UI_COMPONENTS.SIGNIN && (
            <p className="text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  dispatch(setActiveComponent(UI_COMPONENTS.SIGNUP));
                }}
                className="bg-transparent	text-appYellow-900 border-none outline-none cursor-pointer"
              >
                Signup
              </button>
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default Auth;
