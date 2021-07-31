import React from "react";
import { useDispatch } from "react-redux";
import Input from "../input";
import { setActiveComponent } from "../slice";
import { UI_COMPONENTS } from "../constants";

const Signin = ({ values, errors, touched, onChange, onBlur, resetForm }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Input
        label="Email:"
        value={values.email}
        onChange={onChange}
        onBlur={onBlur}
        disableUnderline
        name="email"
        error={touched.email && Boolean(errors.email)}
        errorMessage={errors.email}
        placeholder="Enter your email"
        id="email"
      />

      <Input
        label="Password"
        value={values.password}
        onChange={onChange}
        onBlur={onBlur}
        disableUnderline
        name="password"
        error={touched.password && Boolean(errors.password)}
        errorMessage={errors.password}
        placeholder="Enter your password"
        type="password"
        id="password"
      />
      <div>
        <button
          type="button"
          onClick={() => {
            resetForm();
            dispatch(setActiveComponent(UI_COMPONENTS.FORGOT_PASSWORD));
          }}
          className="bg-transparent outline-none border-none text-appYellow-900 cursor-pointer text-sm"
        >
          Forgot your password?
        </button>
      </div>
    </>
  );
};

export default Signin;
