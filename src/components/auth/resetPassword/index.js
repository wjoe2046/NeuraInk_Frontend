import React, { useState } from "react";
import * as Yup from "yup";
import { resendForgotPassword } from "utils/graphql";
import Input from "../input";

const ResetPassword = ({
  values,
  errors,
  touched,
  onChange,
  onBlur,
  setFieldTouched,
}) => {
  const [loading, setLoading] = useState(false);

  const emailSchema = Yup.object().shape({
    email: Yup.string()
      .required("* Email is required")
      .email("Provide a valid email"),
  });

  const resendCode = async () => {
    emailSchema
      .validate({ email: values.email })
      .then(async () => {
        setLoading(true);

        await resendForgotPassword(values.email);

        setLoading(false);
      })
      .catch(() => {
        setFieldTouched("email", true);
      });
  };

  return (
    <>
      <div>
        <p>We&apos;ve sent a verification code to your email address.</p>
        <button
          type="button"
          className="bg-transparrent cursor-pointer text-sm border-none outline-none text-appYellow-700"
          disabled={loading}
          onClick={resendCode}
        >
          Resend Confirmation
        </button>
      </div>

      <Input
        label="Verification code:"
        value={values.code}
        onChange={onChange}
        onBlur={onBlur}
        disableUnderline
        name="code"
        error={touched.code && Boolean(errors.code)}
        errorMessage={errors.code}
        placeholder="Enter your verification code"
        type="text"
      />

      <Input
        label="Password:"
        value={values.password}
        onChange={onChange}
        onBlur={onBlur}
        disableUnderline
        name="password"
        error={touched.password && Boolean(errors.password)}
        errorMessage={errors.password}
        placeholder="Enter your password"
        type="password"
      />

      <Input
        label="Confirm password:"
        value={values.confirmPassword}
        onChange={onChange}
        onBlur={onBlur}
        disableUnderline
        name="confirmPassword"
        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
        placeholder="Re-enter your password"
        errorMessage={errors.confirmPassword}
        type="password"
      />
    </>
  );
};

export default ResetPassword;
