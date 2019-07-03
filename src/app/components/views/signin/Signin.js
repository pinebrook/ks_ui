import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Icon, Input, Button } from 'antd';
import axios from 'axios';

import './Signin.scss';
import './Signin.xs.scss';
import './Signin.sm.scss';

class SigninForm extends React.Component {

	constructor() {
		super();
		
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {

				axios.post(`${_AUTHBASE_}/signin`, {user: values})
					.then(rsp => {
						if(rsp.data.success) {
							if(rsp.data.result) {
								localStorage.setItem('isSignin', true);
								axios.defaults.headers.common['Authorization'] = `Bearer ${rsp.data.result}`;
								this.props.history.push('/dashboard');
							}
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
		return (
			<div className="signin-ctn">
				<h1>KaleidoSpace</h1>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: 'Please input your username!' }],
						})(
							<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Username"
							/>,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }],
						})(
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="Password"
							/>,
						)}
					</Form.Item>
					<Form.Item>
						<div className="signin-opt-ctn">
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
							<Button type="default" className="login-form-button">
								<Link to='/'>首页</Link>
							</Button>
						</div>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
  
const Signin = Form.create({ name: 'signin' })(SigninForm);

export default Signin;