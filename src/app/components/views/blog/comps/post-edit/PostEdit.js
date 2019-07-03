import React, { Component } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import axios from 'axios';
import moment from 'moment';

import { Form, Input, Select, Button } from 'antd';

import './PostEdit.scss';

const { Option } = Select;

class PostEdit extends Component {
	constructor() {
		super();

		this.state = {
			tab: 'write',
			changed: false
		};

		this.onTitleChange = this.onTitleChange.bind(this);
		this.onCategoryChange = this.onCategoryChange.bind(this);
		this.onEditorTabChange = this.onEditorTabChange.bind(this);
		this.onEditorChange = this.onEditorChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	componentDidMount() {
		const postId = window.location.search.split('=')[1];

		axios.get(`${_APIPUBBASE_}/posts/${postId}`)
			.then(rsp => {
				if(rsp.data.success) {
					let post = rsp.data.result;
					post['createTime'] = moment(post.createTime).local().format('M/D/YYYY h:mm:ss A');
					post['lastUpdateTime'] = moment(post.lastUpdateTime).local().format('M/D/YYYY h:mm:ss A');
					this.props.form.setFieldsValue({
						title: post.title,
						category: post.category,
						content: post.content
					});

				}
			})
			.catch(rspError => {
				throw(rspError);
			});
	}

	onTitleChange(value) {
		this.setState({
			changed: true
		});
	}

	onCategoryChange(value) {
		this.setState({
			changed: true
		});

	}

	onEditorTabChange(tab) {
		this.setState({tab});
	}

	onEditorChange (value) {
		this.setState({
			changed: true
		});

	}

	handleUpdate(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const postId = window.location.search.split('=')[1];
				const updatedPost = Object.assign({}, values);

				axios.put(`${_APICREDBASE_}/posts/update/${postId}`, {post: updatedPost})
					.then(rsp => {
						if(rsp.data.success) {
							this.setState({
								tab: 'preview'
							});

						}
					})
					.catch(rspError => {
						throw(rspError);
					});
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		const formLayout = 'horizontal';
		const formItemLayout = formLayout === 'horizontal' ? {
			labelCol: { span: 4 },
			wrapperCol: { span: 18 },
		} : null;
		const buttonItemLayout = formLayout === 'horizontal' ? {
			wrapperCol: { span: 4, offset: 11 },
		} : null;
		const converter = new Showdown.Converter({
			tables: true,
			simplifiedAutoLink: true,
			strikethrough: true,
			tasklists: true
		});

		return (
			<div>
				<h3>编辑笔记</h3>
				<Form layout={formLayout} onSubmit={this.handleUpdate} className="create-form">
					<Form.Item label="标题" 
						{...formItemLayout}>
						{getFieldDecorator('title', {
							rules: [{ required: true, message: '输入标题' }]
						})(
							<Input placeholder="标题" onChange={this.onTitleChange} />
						)}
					</Form.Item>
					<Form.Item label="类别" 
						{...formItemLayout}>
						{getFieldDecorator('category', {
							rules: [{ required: true, message: '选择类别' }],
							initialValue: ''
						})(
							<Select onChange={this.onCategoryChange}>
								<Option value="">类别</Option>
								<Option value="html">Html</Option>
								<Option value="style">Style</Option>
								<Option value="js">JS</Option>
								<Option value="frameworks">框架</Option>
								<Option value="network">网络</Option>
								<Option value="infra">架构</Option>
								<Option value="deploy">部署</Option>
								<Option value="other">其他</Option>
							</Select>
						)}
					</Form.Item>
					<Form.Item label="正文" 
						{...formItemLayout}>
						{getFieldDecorator('content', {
							rules: [{ required: true, message: '输入正文' }],
							initialValue: ''
						})(
							<ReactMde
								selectedTab={this.state.tab}
								onChange={this.onEditorChange}
								onTabChange={this.onEditorTabChange}
								generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
							/>
						)}
					</Form.Item>
					<Form.Item {...buttonItemLayout}>
						<Button type="primary" htmlType="submit" disabled={!this.state.changed}>更新</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
const WrappedPostEdit = Form.create({ name: 'create_post' })(PostEdit);

export default WrappedPostEdit;