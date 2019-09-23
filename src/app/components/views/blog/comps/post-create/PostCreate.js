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
					author: 'pinebrook'
				});

				axios.post(`${_APICREDBASE_}/posts/create`, {post: newPost})
					.then(rsp => {
						if(rsp.data.success) {
							this.props.form.resetFields();

							setTimeout(() => {
								this.props.history.push('/dashboard/blog');
							}, 1000);
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
				<h3>创建新笔记</h3>
				<Form layout={formLayout} onSubmit={this.handleSubmit} className="create-form">
					<Form.Item label="标题" 
						{...formItemLayout}>
						{getFieldDecorator('title', {
							rules: [{ required: true, message: '输入标题' }]
						})(
							<Input placeholder="标题" />
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
								minEditorHeight={1000}
								selectedTab={this.state.tab}
								onChange={this.onEditorChange}
								onTabChange={this.onEditorTabChange}
								generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
							/>
						)}
					</Form.Item>
					<Form.Item {...buttonItemLayout}>
						<Button type="primary" htmlType="submit">提交</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
const WrappedPostCreate = Form.create({ name: 'create_post' })(PostCreate);

export default WrappedPostCreate;