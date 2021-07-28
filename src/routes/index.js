import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import FallbackSpinner from "components/fallbackSpinner";

const Home = lazy(() => import("pages/home"));
const Landing = lazy(() => import("pages/landing"));

const Routes = () => {
  return (
    <Suspense fallback={<FallbackSpinner />}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Home} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
