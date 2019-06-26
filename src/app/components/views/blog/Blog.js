import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import moment from 'moment';

import './Blog.scss';

import PostsList from './comps/posts-list/PostsList';
import PostView from './comps/post-view/PostView';
import PostCreate from './comps/post-create/PostCreate';
import PostEdit from './comps/post-edit/PostEdit';

class Blog extends Component {
	constructor() {
		super();
	}

	render() {

		return (
			<Switch>
				<Route exact path={`${this.props.match.path}`} component={PostsList} />
				<Route path={`${this.props.match.path}/view`} component={PostView} />
				<Route path={`${this.props.match.path}/create`} component={PostCreate} />
				<Route path={`${this.props.match.path}/edit`} component={PostEdit} />
				<Redirect to={`${this.props.match.path}`}/>
			</Switch>
		);
	}
}
export default Blog;