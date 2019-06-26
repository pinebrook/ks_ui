import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadEvents } from '../../../redux/actions/apis/load-events.api';
import { initEvent } from '../../../redux/actions/events/init-event.event';

import Calendar from 'react-big-calendar';
import moment from 'moment';

import EventModal from './comps/eventModal/EventModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Schedule.scss';

const localizer = Calendar.momentLocalizer(moment);

function mapDispatchToProps(dispatch) {
	return {
		loadEvents: () => dispatch(loadEvents()),
		initEvent: (curEventModel) => dispatch(initEvent(curEventModel))
	};
}

const mapStateToProps = state => {

	return {
		events: state.scheduleEvent.events
	};
};

class Schedule extends Component {

	constructor() {
		super();
		
		this.onSelectSlot = this.onSelectSlot.bind(this);

	}

	componentDidMount() {
		this.props.loadEvents();
	}

	onSelectSlot({start, end}) {
		const curEventModel = {
			start: start,
			end: end,
			content: ''
		};
		this.props.initEvent(curEventModel);
	}

	render() {
		const { events } = this.props;
		return (
			<div>
				<Calendar
					selectable
					localizer={localizer}
					defaultDate={new Date()}
					events={events}
					defaultView={Calendar.Views.WEEK}
					onSelectSlot={this.onSelectSlot}
					startAccessor="start"
					endAccessor="end"
					views={{
						week: true
					}}
				/>
				<EventModal />
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);