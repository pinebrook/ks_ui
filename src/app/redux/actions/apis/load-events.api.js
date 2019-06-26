import axios from 'axios';
import { loadEventsSuccess } from '../events/load-events.event';

export function loadEvents(payload) {

	return (dispatch) => {
		return axios.get(`${_APIPUBBASE_}/schedules`)
			.then(rsp => {
				if(rsp.data.success) {
					dispatch(loadEventsSuccess(rsp.data.result));
				}
			})
			.catch(error => {
				throw(error);
			});
	};
}