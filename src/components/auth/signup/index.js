import React from "react";
import Input from "../input";

const Signup = ({ values, errors, touched, onChange, onBlur }) => {
  return (
    <>
      <Input
        label="Fullname:"
        value={values.fullname}
        onChange={onChange}
        onBlur={onBlur}
        disableUnderline
        name="fullname"
        error={touched.fullname && Boolean(errors.fullname)}
        errorMessage={errors.fullname}
        placeholder="Enter your name"
        id="fullname"
      />

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

      <Input
        label="Confirm Password"
        value={values.confirmPassword}
        onChange={onChange}
        onBlur={onBlur}
        disableUnderline
        name="confirmPassword"
        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
        errorMessage={errors.confirmPassword}
        placeholder="Re-enter your password"
        type="password"
      />
    </>
  );
};

export default Signup;
