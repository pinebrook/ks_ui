import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb } from 'antd';

const breadcrumbNameMap = {
	'/dashboard': '简介',
	'/dashboard/schedule': '留言',
	'/dashboard/blog': '笔记列表',
	'/dashboard/blog/view': '笔记',
	'/dashboard/blog/create': '新笔记',
	'/dashboard/blog/edit': '编辑笔记'
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
			<Link to="/dashboard" onClick={() => props.clickBreadCrumbHandler('/dashboard')}>主页</Link>
		</Breadcrumb.Item>
	)].concat(extraBreadCrumbItems);

	return (
		<Breadcrumb style={{ margin: '16px 0' }}>
			{breadCrumbItems}
		</Breadcrumb>
	);
};

export default AppBreadCrumb;