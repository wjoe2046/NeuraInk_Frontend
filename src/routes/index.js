import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import FallbackSpinner from "components/fallbackSpinner";
import { selectIsLoggedin } from "components/auth/slice";

const Home = lazy(() => import("pages/home"));
const Landing = lazy(() => import("pages/landing"));
const Generate = lazy(() => import("pages/generate"));

const Routes = () => {
  const isLoggedIn = useSelector(selectIsLoggedin);
  return (
    <Suspense fallback={<FallbackSpinner />}>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (!isLoggedIn ? <Landing /> : <Home />)}
        />
        <Route exact path="/generate" component={Generate} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
