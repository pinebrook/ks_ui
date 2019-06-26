import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb } from 'antd';

const breadcrumbNameMap = {
	'/dashboard': 'Profile',
	'/dashboard/schedule': 'Schedule',
	'/dashboard/blog': 'Blog',
	'/dashboard/blog/view': 'Post Detail',
	'/dashboard/blog/create': 'New Post',
	'/dashboard/blog/edit': 'Edit Post'
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