import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import loadable from '@loadable/component';

// import Main from '../containers/main/Main';
// import Auth from '../containers/auth/Auth';
// import Landing from '../containers/landing/Landing';

const Dashboard = loadable(() => import(/* webpackChunkName: "dashboard"*/'../containers/dashboard/Dashboard'));
const Auth = loadable(() => import(/* webpackChunkName: "auth"*/'../containers/auth/Auth'));
const Landing = loadable(() => import(/* webpackChunkName: "landing"*/'../containers/landing/Landing'));

const AppRoutes = () => (
	<Switch>
		<Route exact path="/" render={(props) => <Landing {...props} />} />
		<Route path="/auth" render={(props) => <Auth {...props} />} />
		{/* <Route path="/error" component={Error} /> */}
		<Route path="/dashboard" render={(props) => <Dashboard {...props} />}/>
		<Redirect to="/" />
	</Switch>
);

export default AppRoutes;