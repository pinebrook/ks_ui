import React, { Component } from 'react';

import { Layout, Row, Col } from 'antd';

import { AuthRoutes } from '../../routes/SubRoutes';

import './Auth.scss';

const { Header, Content, Footer } = Layout;

class Auth extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<Layout className="auth-layout">
				<Content className="auth-content">
					<div className="auth-view-ctn">
						<AuthRoutes match={this.props.match} />
					</div>
				</Content>
				<Footer className="app-footer-ctn">
					KaleidoSpace Created by 🕊️pinebrook
				</Footer>
			</Layout>
		);
	}
}

export default Auth;