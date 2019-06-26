import { SUBMIT_EVENT } from '../../constants/action-types';

export const submitEventSuccess = (payload) => {
	return {
		type: SUBMIT_EVENT,
		payload
	};
};