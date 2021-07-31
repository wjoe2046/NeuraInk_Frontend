import * as Yup from "yup";
import * as validationRegex from "utils/validationRegex";

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .length(6, "Please enter a valid verification code")
    .required("Verification code is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      validationRegex.containsOneUpperCaseLetter,
      "Password must contain one uppercase letter"
    )
    .matches(
      validationRegex.containsOneLowerCaseLetter,
      "Password must contain one lowercase letter"
    )
    .matches(validationRegex.containsNumber, "Password must contain a number"),

  confirmPassword: Yup.string()
    .required("Enter your password again")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default validationSchema;
