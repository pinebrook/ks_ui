import { INIT_EVENT } from '../../constants/action-types';

export function initEvent(payload) {
	return {
		type: INIT_EVENT,
		payload
	};
}