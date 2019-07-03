import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb } from 'antd';

const breadcrumbNameMap = {
	'/dashboard': '个人信息',
	'/dashboard/schedule': '预约留言',
	'/dashboard/blog': '文章列表',
	'/dashboard/blog/view': '文章',
	'/dashboard/blog/create': '新文章',
	'/dashboard/blog/edit': '编辑文章'
};

const AppBreadCrumb = (props) => {

	const pathSnippets = props.location.pathname.split('/').filter(Boolean);
	const extraBreadCrumbItems = pathSnippets.map((_, index) => {
		let url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

		return (
			<Breadcrumb.Item key={url}>
				<Link to={url} onClick={() => props.clickBreadCrumbHandler(url)}>
					{breadcrumbNameMap[url]}
				</Link>
			</Breadcrumb.Item>
		);
	});

	// popup "Profile" breadcrumb if current view is not Profile view
	if(extraBreadCrumbItems.length > 1 && extraBreadCrumbItems[0]['key'] === '/dashboard') {
		extraBreadCrumbItems.shift();
	}

	const breadCrumbItems = [(
		<Breadcrumb.Item key="home">
			<Link to="/dashboard" onClick={() => props.clickBreadCrumbHandler('/dashboard')}>Home</Link>
		</Breadcrumb.Item>
	)].concat(extraBreadCrumbItems);

	return (
		<Breadcrumb style={{ margin: '16px 0' }}>
			{breadCrumbItems}
		</Breadcrumb>
	);
};

export default AppBreadCrumb;