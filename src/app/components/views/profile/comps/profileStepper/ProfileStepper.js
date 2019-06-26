import React from 'react';
import { connect } from 'react-redux';
import { selectSec } from '../../../../../redux/actions/events/select-sec.event';

import { Menu } from 'antd';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faBriefcase, faProjectDiagram, faUniversity } from '@fortawesome/free-solid-svg-icons';

import './ProfileStepper.scss';

library.add(faAlignLeft, faBriefcase, faProjectDiagram, faUniversity);

function mapDispatchToProps(dispatch) {
	return {
		selectSec: secType => dispatch(selectSec(secType))
	};
}

const mapStateToProps = state => {

	return { selectedProfileSec: state.profileSec.selectedProfileSec };
};

const Icon = (secType) => {
	if(secType === 'summary') {
		return (
			<FontAwesomeIcon className="icon" icon="align-left" />
		);
	} else if(secType === 'workExps') {
		return (
			<FontAwesomeIcon className="icon" icon="briefcase" />
		);
	} else if(secType === 'projects') {
		return (
			<FontAwesomeIcon className="icon" icon="project-diagram" />
		);
	} else if(secType === 'educations') {
		return (
			<FontAwesomeIcon className="icon" icon="university" />
		);
	}
};

const ProfileStepper = (props) => {

	const onClickMenuItem = (secType) => {
		props.selectSec(secType);
	};

	let stepper = (
		<Menu 
			mode="vertical" 
			theme="dark"
			defaultSelectedKeys={['0']}>
			{
				props.sections.map((section, index) => (
					<Menu.Item 
						key={index} 
						onClick={() => onClickMenuItem(section.secType)}>
						{
							Icon(section.secType)
						}
						{
							section.secTitle
						}
					</Menu.Item>
				))
			}
		</Menu>
	);

	return (
		<div className="profile-sec">
			{stepper}
		</div>
	);
};

const ConnectedProfileStepper = connect(mapStateToProps, mapDispatchToProps)(ProfileStepper);

export default ConnectedProfileStepper;