import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import loadable from '@loadable/component';

// import Profile from '../components/views/profile/Profile';
// import Schedule from '../components/views/schedule/Schedule';
// import Blog from '../components/views/blog/Blog';
// import Signin from '../components/views/signin/Signin';

const Profile = loadable(() => import(/* webpackChunkName: "profile"*/'../components/views/profile/Profile'), { ssr: false });
const Schedule = loadable(() => import(/* webpackChunkName: "schedule"*/'../components/views/schedule/Schedule'), { ssr: false });
const Blog = loadable(() => import(/* webpackChunkName: "blog"*/'../components/views/blog/Blog'), { ssr: false });
const Signin = loadable(() => import(/* webpackChunkName: "signin"*/'../components/views/signin/Signin'), { ssr: false });

export const DashboardRoutes = (props) => {
	return (
		<Switch>
			<Route exact path={`${props.match.path}`} render={(props) => <Profile {...props} />} />
			<Route path={`${props.match.path}/schedule`}  render={(props) => <Schedule {...props} />} />
			<Route path={`${props.match.path}/blog`}  render={(props) => <Blog {...props} />} />
			<Redirect to={`${props.match.path}`}/>
		</Switch>
	);
};

export const AuthRoutes = (props) => {
	return (
		<Switch>
			<Route exact path={`${props.match.path}`} render={(props) => <Signin {...props} />} />
			<Redirect to={`${props.match.path}`}/>
		</Switch>
	);
};