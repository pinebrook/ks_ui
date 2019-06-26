import React, { Component } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import axios from 'axios';

import { Form, Input, Select, Button } from 'antd';

import './PostCreate.scss';

const { Option } = Select;

class PostCreate extends Component {
	constructor() {
		super();

		this.state = {
			tab: 'write'
		};

		this.onCategoryChange = this.onCategoryChange.bind(this);
		this.onEditorTabChange = this.onEditorTabChange.bind(this);
		this.onEditorChange = this.onEditorChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	onCategoryChange(value) {

	}

	onEditorTabChange(tab) {
		this.setState({tab});
	}

	onEditorChange (value) {

	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((validError, values) => {
			if (!validError) {

				const newPost = Object.assign({}, values, {
					author: 'KaiZhang'
				});

				axios.post(`${_APICREDBASE_}/posts/create`, {post: newPost})
					.then(rsp => {
						if(rsp.data.success) {
							this.props.form.resetFields();
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
				<h3>Create New Post</h3>
				<Form layout={formLayout} onSubmit={this.handleSubmit} className="create-form">
					<Form.Item label="Title" 
						{...formItemLayout}>
						{getFieldDecorator('title', {
							rules: [{ required: true, message: 'Enter Title' }]
						})(
							<Input placeholder="Title" />
						)}
					</Form.Item>
					<Form.Item label="Category" 
						{...formItemLayout}>
						{getFieldDecorator('category', {
							rules: [{ required: true, message: 'Select Category' }],
							initialValue: ''
						})(
							<Select onChange={this.onCategoryChange}>
								<Option value="">Category</Option>
								<Option value="html">Html</Option>
								<Option value="style">Style</Option>
								<Option value="es">ES</Option>
							</Select>
						)}
					</Form.Item>
					<Form.Item label="Content" 
						{...formItemLayout}>
						{getFieldDecorator('content', {
							rules: [{ required: true, message: 'Enter Content' }],
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
						<Button type="primary" htmlType="submit">Submit</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
const WrappedPostCreate = Form.create({ name: 'create_post' })(PostCreate);

export default WrappedPostCreate;