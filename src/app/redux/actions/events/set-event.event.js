import { SET_EVENT } from '../../constants/action-types';

export function setEvent(payload) {
	return {
		type: SET_EVENT,
		payload
	};
}