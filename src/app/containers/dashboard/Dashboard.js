import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Row, Col, Menu, Icon } from 'antd';
import axios from 'axios';

import { DashboardRoutes } from '../../routes/SubRoutes';
import AppBreadCrumb from './comps/appBreadCrumb/AppBreadCrumb';

import './Dashboard.scss';

const { Header, Content, Footer } = Layout;

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			isSignin: false,
			menuItems: [
				{
					name: '简介',
					path: ''
				}, 
				{
					name: '笔记',
					path: 'blog'
				},
				{
					name: '留言',
					path: 'schedule'
				}
			],
			defaultMenuItemIndex: '0',
			currentMenuItemIndex: '0'
		};

		this.setCurrentMenuItem = this.setCurrentMenuItem.bind(this);
		this.clickMenuItemHandler = this.clickMenuItemHandler.bind(this);
		this.clickBreadCrumbHandler = this.clickBreadCrumbHandler.bind(this);
		this.clickSignOutHandler = this.clickSignOutHandler.bind(this);
		this.clickSignInHandler = this.clickSignInHandler.bind(this);

	}

	// function: set current selected menu item
	setCurrentMenuItem(pathName) {
		this.setState((state, props) => {
			let curIndex = 0;
			this.state.menuItems.forEach((item, index) => {
				if(item.path === pathName) {
					curIndex = index;
				}
			});

			return {
				currentMenuItemIndex: curIndex.toString()
			};
		});
	}

	// lifecycle hook: set up current selected menu item based on current url when refresh page
	UNSAFE_componentWillMount() {
		const currentPath = this.props.location.pathname.split('dashboard/')[1] ? this.props.location.pathname.split('dashboard/')[1] : '';
		// set selected menu item based on current url
		this.setCurrentMenuItem(currentPath);
	}

	componentDidMount() {
		const isSignin = localStorage.getItem('isSignin') === 'true' ? true : false;
		this.setState({
			loaded: true,
			isSignin: isSignin
		});
	}

	// event: on click menu item
	clickMenuItemHandler(e) {
		this.setState({
			currentMenuItemIndex: e.key
		});
	}

	// event: on click bread crumb item
	clickBreadCrumbHandler(currentUrl) {
		const pathName = currentUrl.split('app/')[1];
		this.setCurrentMenuItem(pathName);
	}

	clickSignInHandler() {
		this.props.history.push('/auth');
	}

	clickSignOutHandler() {
		axios.get(`${_AUTHBASE_}/signout`)
			.then(rsp => {
				if(rsp.data.success) {
					// localStorage.setItem('jwt', rsp.data.result);
					axios.defaults.headers.common['Authorization'] = null;
					localStorage.setItem('isSignin', false);
					this.props.history.push('/auth');
				}
			})
			.catch(rspError => {
				throw(rspError);
			});
	}

	render() {
		const { isSignin } = this.state;
		const { menuItems } = this.state;
		const { location } = this.props;

		return (
			<Layout className="app-layout">
				<Header className="app-header-ctn">
					<Menu
						mode="horizontal"
						defaultSelectedKeys={[this.state.defaultMenuItemIndex]}
						selectedKeys={[this.state.currentMenuItemIndex]}
						onClick={this.clickMenuItemHandler}>
						{
							menuItems.map((item, index)=>(
								<Menu.Item key={index}>
									<Link to={`${this.props.match.path}/${item.path}`}>{item.name}</Link>
								</Menu.Item>
							))
						}
					</Menu>
					<div className="user-list-ctn">
						<div className="user-icon-ctn">
							<Icon type="user" />
						</div>
						<div className="opt-list-ctn">
							<ul>
								{
									isSignin ? 
										<li onClick={this.clickSignOutHandler}>注销</li> : 
										<li onClick={this.clickSignInHandler}>登录</li>
								}
							</ul>
						</div>
					</div>
				</Header>
				<Content className="app-content-ctn">
					<Row className="breadcrumb-ctn">
						<Col sm={{span: 24}} lg={{span: 16, offset: 4}}>
							<AppBreadCrumb location={location} clickBreadCrumbHandler={this.clickBreadCrumbHandler}/>
						</Col>
					</Row>
					<Row className="app-view-ctn">
						<Col className="app-view-col-ctn" sm={{span: 24}} lg={{span: 16, offset: 4}}>
							<div className="app-view-bg-ctn" style={{ background: '#fff', padding: 24, minHeight: 280 }}>
								<DashboardRoutes match={this.props.match} />
							</div>
						</Col>
					</Row>
				</Content>
				<Footer>
					KaleidoSpace Created by 🕊️pinebrook 
				</Footer>
			</Layout>
		);
	}
}

export default Dashboard;