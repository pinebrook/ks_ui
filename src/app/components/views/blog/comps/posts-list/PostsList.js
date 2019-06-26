import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { Button, List } from 'antd';

import './PostsList.scss';

import Post from '../post/Post';

function mapDispatchToProps(dispatch) {
	return {};
}

const mapStateToProps = state => {

	return {};
};

class PostsList extends Component {
	constructor() {
		super();
		this.state = {
			isSignin: false,
			posts: []
		};

		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.fetAllPosts();

		const isSignin = localStorage.getItem('isSignin') === 'true' ? true : false;
		this.setState({
			isSignin: isSignin
		});
	}

	fetAllPosts() {
		axios.get(`${_APIPUBBASE_}/posts`)
			.then(rsp => {
				if(rsp.data.success) {
					this.setState({
						posts: [...rsp.data.result]
					});
				}
			})
			.catch(rspError => {
				throw(rspError);
			});
	}

	handleDelete(postId) {

		axios.delete(`${_APICREDBASE_}/posts/delete/${postId}`)
			.then(rsp => {
				if(rsp.data.success) {
					this.fetAllPosts();
				}
			})
			.catch(rspError => {
				throw(rspError);
			});
	}

	render() {
		const {isSignin} = this.state;
		const {posts} = this.state;

		return (
			<div className="posts-ctn">
				<div className="new-ctn">
					{
						isSignin ? 
							<Button type="primary">
								<Link to={`${this.props.match.path}/create`}>
									New
								</Link>
							</Button> : 
							null
					}
					
				</div>
				<List
					bordered
					dataSource={posts}
					renderItem={post => (
						<Post
							post={post}
							deletePost={this.handleDelete}
						></Post>
					)}
				/>
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsList);