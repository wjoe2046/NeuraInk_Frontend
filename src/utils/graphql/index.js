import { Auth, API, graphqlOperation } from "aws-amplify";
import { toast } from "react-toastify";
import { createNote } from "graphql/mutations";
import { listNotes } from "graphql/queries";

export const signinWithEmailAndPassword = async (email, password) => {
  try {
    const cognitoUser = await Auth.signIn(email, password);

    if (cognitoUser) {
      return {
        status: "success",
        data: {
          id: cognitoUser.attributes.sub,
          isLoggedIn: true,
          name: cognitoUser.attributes.name,
          email: cognitoUser.attributes.email,
        },
      };
    }

    return {
      status: "error",
    };
  } catch (err) {
    switch (err.code) {
      case "NotAuthorizedException":
      case "UserNotFoundException":
        toast.error("Invalid email or password, please try again.");
        break;

      case "UserNotConfirmedException":
        toast.error("Looks like you have not verified your email yet!");
        break;

      default:
        toast.error(err.message);
    }

    return {
      status: "fail",
      code: err.code,
    };
  }
};

export const confirmEmail = async (email, code) => {
  try {
    const confirmSignup = await Auth.confirmSignUp(email, code);

    if (confirmSignup === "SUCCESS") {
      toast.success("Email verified successfuly");
      return { status: "success" };
    }

    return { status: "fail" };
  } catch (err) {
    toast.error(err.message);
    return { status: "fail" };
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await Auth.forgotPassword(email);

    if (response.CodeDeliveryDetails) {
      toast.success("Please check your inbox, code is sent to you.");
      return {
        status: "success",
      };
    }

    toast.error("Something went wrong, please try again latter.");
    return {
      status: "fail",
    };
  } catch (err) {
    toast.error(err.message);
    return {
      status: "fail",
    };
  }
};

export const resetPassword = async (email, code, password) => {
  try {
    await Auth.forgotPasswordSubmit(email, code, password);
    toast.success("You have successfully reset your password! Please login.");
    return { status: "success" };
  } catch (err) {
    toast.error(err.message);
    return { status: "fail" };
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await Auth.signUp({
      username: email,
      password,
      attributes: {
        name,
        email,
      },
    });

    if (response.codeDeliveryDetails) {
      toast.success(
        "Please check your inbox, verification code is sent to your inbox"
      );

      return { status: "success" };
    }

    toast.error("Something went wrong, please try again latter");
    return {
      status: "fail",
    };
  } catch (err) {
    toast.error(err.message);
    return {
      status: "fail",
    };
  }
};

export const resendVerificationCode = async (email) => {
  try {
    await Auth.resendSignUp(email);
    toast.success("A new verification code has been sent to your email.");
  } catch (err) {
    toast.error(err.message);
  }
};

export const resendForgotPassword = async (email) => {
  try {
    await Auth.forgotPassword(email);
    toast.success("A new verification code has been sent to your email.");
  } catch (err) {
    toast.error(err.message);
  }
};

export const logoutUser = async () => {
  await Auth.signOut();
  window.location.reload();
};

export const addNote = async (inputImageUrl, outputImageUrl) => {
  try {
    const response = await API.graphql(
      graphqlOperation(createNote, {
        input: {
          name: inputImageUrl,
          image: outputImageUrl,
        },
      })
    );

    if (response && response.data && response.data.createNote) {
      return { status: "success", data: response.data.createNote };
    } else {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }
  } catch (err) {
    console.log("error: ", err);
    return {
      status: "error",
      message: err.message,
    };
  }
};

export const getNotes = async () => {
  try {
    const response = await API.graphql(graphqlOperation(listNotes));

    if (response && response.data && response.data.listNotes) {
      return { status: "success", data: response.data.listNotes.items };
    }

    return {
      status: "fail",
      message: "Something went wrong",
    };
  } catch (err) {
    return {
      status: "fail",
      message: err.message,
    };
  }
};
