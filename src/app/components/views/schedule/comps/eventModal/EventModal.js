import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { setEvent } from '../../../../../redux/actions/events/set-event.event';
import { submitEvent } from '../../../../../redux/actions/apis/submit-event.api';
import { cancelEvent } from '../../../../../redux/actions/events/cancel-event.event';

import { Modal } from 'antd';

import './EventModal.scss';

function mapDispatchToProps(dispatch) {
	return {
		setEvent: (eventModel) => dispatch(setEvent(eventModel)),
		submitEvent: (eventModel) => dispatch(submitEvent(eventModel)),
		cancelEvent: () => dispatch(cancelEvent())
	};
}

const mapStateToProps = state => {
	return {
		curEvent: state.scheduleEvent.curEvent,
		visible: state.scheduleEvent.visible,
		confirmLoading: state.scheduleEvent.confirmLoading
	};
};

const EventModal = (props) => {

	const handleChange = (event) => {
		props.setEvent({
			name: event.target.name,
			value: event.target.value
		});
	};

	const onClickOk = (curEvent) => {
		props.submitEvent(curEvent);
	};

	const onClickCancel = () => {
		props.cancelEvent();
	};

	return (
		<div>
			<Modal
				title="Create Event"
				visible={props.visible}
				onOk={() => onClickOk(props.curEvent)}
				onCancel={onClickCancel}>
				<div>
					<span>Start: </span>
					<span>{moment(props.curEvent.start).local().format('LLL')}</span>
				</div>
				<div>
					<span>End: </span>
					<span>{moment(props.curEvent.end).local().format('LLL')}</span>
				</div>
				<strong>Description</strong>
				<textarea 
					className="form-control"
					rows="5"
					name="content"
					value={props.curEvent.content}
					onChange={(event)=>handleChange(event)}>
				</textarea>
			</Modal>
		</div>
	);
};

const ConnectedEventModal = connect(mapStateToProps, mapDispatchToProps)(EventModal);

export default ConnectedEventModal;