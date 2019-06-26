import axios from 'axios';
import { submitEventSuccess } from '../events/submit-event.event';

export function submitEvent(payload) {

	return (dispatch) => {
		return axios.post(`${_APIPUBBASE_}/schedules/create`, {event: payload})
			.then(rsp => {
				if(rsp.data.success) {
					dispatch(submitEventSuccess(payload));
				}
			})
			.catch(error => {
				throw(error);
			});
	};
}