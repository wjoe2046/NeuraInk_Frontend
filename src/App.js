import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Auth, Hub } from "aws-amplify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "routes";
import { loginUser } from "components/auth/slice";
import FallbackSpinner from "components/fallbackSpinner";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // check for auth status
  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      const cognitoUser = await Auth.currentAuthenticatedUser();
      if (cognitoUser) {
        const loggedinUser = {
          id: cognitoUser.attributes.sub,
          name: cognitoUser.attributes.name,
          email: cognitoUser.attributes.email,
        };

        dispatch(loginUser(loggedinUser));
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [dispatch]);

  // check auth status when the app loads
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // listen for auth change events
  Hub.listen("auth", async (data) => {
    if (data && data.payload && data.payload.event === "signIn") {
      checkAuthStatus();
    }
  });

  if (loading) return <FallbackSpinner />;

  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
};

export default App;
