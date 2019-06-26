import { SELECT_SEC } from '../../constants/action-types';

export function selectSec(payload) {
	return {
		type: SELECT_SEC,
		payload
	};
}