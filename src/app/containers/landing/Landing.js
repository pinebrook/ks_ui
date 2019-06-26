import React from 'react';

import Launch from '../../components/views/launch/Launch';

import './Landing.scss';

class Landing extends React.Component {

	constructor() {
		super();
		
	}

	render() {
		return (
			<div className="landing-layout">
                <Launch {...this.props}/>
			</div>
		);
	}
}
  

export default Landing;