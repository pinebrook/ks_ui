import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { List, Divider, Button } from 'antd';

import './Post.scss';
import './Post.xs.scss';

class Post extends Component {
	constructor() {
		super();

		this.state = {
			isSignin: false,
			post: {}
		};

	}

	componentDidMount() {
		const isSignin = localStorage.getItem('isSignin') === 'true' ? true : false;
		this.setState({
			isSignin: isSignin
		});
	}

	render() {
		const {isSignin} = this.state;
		const {post} = this.props;

		return (
			<List.Item>
				<div className="post-ctn">
					<div className="post-meta-ctn">
						<div className="post-info-ctn">
							<h3>
								<Link to={{
									pathname: `${window.location.pathname}/view`,
									search: '?pid=' + post._id
								}}>
									{post.title}
								</Link>
							</h3>
							<span className="category">[{post.category}]</span>
							<Divider type="vertical"/>
							<span className="author">{post.author}</span>
						</div>
						<div className="post-time-ctn">
							<span className="create">Create: {post.createTime}</span>
							<Divider className="time-divider" type="vertical"/>
							<span className="update">Last update: {post.lastUpdateTime}</span>
						</div>
					</div>
					{
						isSignin ? 
							<div className="post-action-ctn">
								<Link to={{
									pathname: `${window.location.pathname}/edit`,
									search: '?pid=' + post._id
								}}>
									<Button type="default" shape="circle" icon="edit" />
								</Link>
								<Button type="danger" shape="circle" icon="delete" onClick={() => this.props.deletePost(post._id)}/>
							</div> : 
							null
					}
				</div>
			</List.Item>
		);
	}
}

export default Post;