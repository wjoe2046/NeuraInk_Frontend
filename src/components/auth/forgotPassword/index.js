import React from "react";
import Input from "../input";

const ForgotPassword = ({ values, errors, touched, onChange, onBlur }) => {
  return (
    <>
      <Input
        label="Email"
        value={values.email}
        onChange={onChange}
        onBlur={onBlur}
        disableUnderline
        fullWidth
        name="email"
        error={touched.email && Boolean(errors.email)}
        errorMessage={errors.email}
        placeholder="Enter your email"
      />
    </>
  );
};

export default ForgotPassword;
