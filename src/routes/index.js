import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import FallbackSpinner from 'components/fallbackSpinner';

const Home = lazy(() => import('pages/Home'));
const Landing = lazy(() => import('pages/Landing'));

const Routes = () => {
  return (
    <Suspense fallback={<FallbackSpinner />}>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/dashboard' component={Home} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
