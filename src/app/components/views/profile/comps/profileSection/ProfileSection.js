import React from 'react';

import { Divider } from 'antd';

import './ProfileSection.scss';
import './ProfileSection.xs.scss';

const ProfileSection = ({content}) => {
	let section = content.secType === 'summary' ? (
		<div>
			{
				content.descriptions.map((description, index) => (
					<p key={index}>{description}</p>
				))
			}
		</div>
	) : (
		<div>
			{
				content.secContent.map((contentItem, index) => (
					<div key={index}>
						<div className="sec-content-ctn">
							<div className="sec-content-title-ctn">
								<h4>{contentItem.company || contentItem.projectName || contentItem.school}</h4>
								<h5>{contentItem.title || contentItem.role || contentItem.degree}</h5>
								<p>{contentItem.time}</p>
							</div>
							<div className="sec-content-divider-ctn">
								<Divider className="sec-content-divider-vertical" type="vertical"/>
							</div>
							<div className="sec-content-dsc-ctn">
								<ul>
									{
										contentItem.descriptions ? 
											contentItem.descriptions.map((description, index) => (
												<li key={index}>{description}</li>
											)) : 
											contentItem.courseWorks.map((courseWork, index) => (
												<li key={index}>{courseWork}</li>
											))
									}
								</ul>
							</div>
						</div>
						{
							index >= content.secContent.length - 1 ? 
								<></> :
								<Divider />
						}
					</div>
				))
			}
		</div>
	);
	

	return (
		<div className="profile-sec">
			{section}
		</div>
	);
};

export default ProfileSection;