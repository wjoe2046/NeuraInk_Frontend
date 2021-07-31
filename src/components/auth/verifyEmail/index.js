import React, { useState } from "react";
import Input from "../input";
import { resendVerificationCode } from "utils/graphql";

const VerifyEmail = ({ values, errors, touched, onChange, onBlur }) => {
  const [loading, setLoading] = useState(false);

  const resendConfirmationCode = async () => {
    setLoading(true);

    await resendVerificationCode(values.email);

    setLoading(false);
  };

  return (
    <>
      <div className="text-sm text-gray-700">
        <p>just one more step, let&apos; verify you email</p>
        <p className="mt-1 mb-2">
          We already send a code to {values.email}, please check your inbox and
          insert the code in form below to verify your email.
        </p>
      </div>
      <div>
        <button
          type="button"
          onClick={resendConfirmationCode}
          disabled={loading}
          className="bg-transparrent cursor-pointer text-sm border-none outline-none text-appYellow-700 mb-2"
        >
          Resend Confirmation
        </button>
      </div>

      <Input
        label="Verification code:"
        value={values.code}
        onChange={onChange}
        onBlur={onBlur}
        name="code"
        error={touched.code && Boolean(errors.code)}
        errorMessage={errors.code}
        placeholder="Enter your verification code"
      />
    </>
  );
};

export default VerifyEmail;
