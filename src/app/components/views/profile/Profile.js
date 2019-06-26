import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Card } from 'antd';

import ProfileSection from './comps/profileSection/ProfileSection';
import ProfileStepper from './comps/profileStepper/ProfileStepper';

import './Profile.scss';

function mapDispatchToProps(dispatch) {
	return {};
}

const mapStateToProps = state => {
	return {selectedProfileSec: state.profileSec.selectedProfileSec};
};

class Profile extends Component {
	constructor() {
		super();

		this.state = {
			profileSecs: []
		};

		this.scrollSecIntoView = this.scrollSecIntoView.bind(this);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if(JSON.stringify(this.props.selectedProfileSec) !== JSON.stringify(nextProps.selectedProfileSec)) // Check if it's a new user, you can also use some unique property, like the ID
		{
			this.scrollSecIntoView(nextProps.selectedProfileSec);
		}
	}

	componentDidMount() {

		axios.get(`${_APIPUBBASE_}/profiles/pinebrook`)
			.then(rsp => {
				if(rsp.data.success) {
					this.setState({
						profileSecs: rsp.data.result.profile.sections
					});
				}
			});
	}

	scrollSecIntoView(selectedSec) {
		const elementId = 'sec-' + selectedSec;
		const element = document.getElementById(elementId);
		element.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
	}

	render() {
		const { profileSecs } = this.state;

		return (
			<div className="profile-ctn">
				{
					profileSecs.length > 0 ? 
						profileSecs.map(section => (
							<Card 
								className="section-ctn"
								id={`sec-${section.secType}`}
								key={section.secType}
								title={section.secTitle}>
								<ProfileSection content={section}/>
							</Card>
						)) : 
						<h3 className="no-res-title">No Profile Found</h3>
				}
				<div className="stepper-ctn">
					<ProfileStepper sections={profileSecs}></ProfileStepper>
				</div>
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);