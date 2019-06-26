import moment from 'moment';

import { LOAD_EVENTS } from '../../constants/action-types';

export const loadEventsSuccess = (payload) => {
    
	const convertedPayload = payload.map(event => {
		return {
			start: moment(event.start).local().toDate(),
			end: moment(event.end).local().toDate(),
			content: event.content
		};
	});

	return {
		type: LOAD_EVENTS,
		payload: convertedPayload
	};
};