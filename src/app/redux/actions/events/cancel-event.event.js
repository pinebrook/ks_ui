import { CANCEL_EVENT } from '../../constants/action-types';

export function cancelEvent(payload) {
	return {
		type: CANCEL_EVENT,
		payload
	};
}