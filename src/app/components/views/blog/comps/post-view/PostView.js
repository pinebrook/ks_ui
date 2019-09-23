import React, { Component } from 'react';
import * as Showdown from 'showdown';
import Parser from 'html-react-parser';
import axios from 'axios';
import moment from 'moment';
import { Badge, Divider, Button } from 'antd';

import './PostView.scss';

class PostView extends Component {
	constructor() {
		super();

		this.state = {
			post: {
				title: '',
				category: '',
				content: '',
				createTime: '',
				lastUpdateTime: ''
			}
		};

		this.handleCilckEdit = this.handleCilckEdit.bind(this);
	}

	componentDidMount() {
		const postId = window.location.search.split('=')[1];

		axios.get(`${_APIPUBBASE_}/posts/${postId}`)
			.then(rsp => {
				if(rsp.data.success) {
					let post = rsp.data.result;
					post['createTime'] = moment(post.createTime).local().format('M/D/YYYY h:mm:ss A');
					post['lastUpdateTime'] = moment(post.lastUpdateTime).local().format('M/D/YYYY h:mm:ss A');

					this.setState({
						post: {...post}
					});
				}
			})
			.catch(rspError => {
				throw(rspError);
			});
	}

	handleCilckEdit(e) {
		const postId = window.location.search.split('=')[1];
		
		this.props.history.push(`/dashboard/blog/edit/?pid=${postId}`);
	}

	render() {
		const {post} = this.state;

		const converter = new Showdown.Converter({
			tables: true,
			simplifiedAutoLink: true,
			strikethrough: true,
			tasklists: true
		});

		return (
			<div className="post-view-ctn">
				<div className="title-ctn">
					<div className="title-info-ctn">
						<span>{post.title}</span>
						<Badge count={post.category} />
					</div>
					<div>
						<Button onClick={this.handleCilckEdit}>编辑</Button>
					</div>
				</div>
				<div className="time-ctn">
					<div>创建: {post.createTime}</div>
					<div>最后更新: {post.lastUpdateTime}</div>
				</div>
				<Divider />
				<div className="content-ctn">
					{Parser(converter.makeHtml(post.content))}
				</div>
			</div>
		);
	}
}

export default PostView;