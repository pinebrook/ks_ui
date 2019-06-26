import { SELECT_SEC } from '../constants/action-types';

const initialState = {
	selectedProfileSec: 'summary',
	message: ''
};

export default function profileSec(state = initialState, action) {
	if(action.type === SELECT_SEC) {
		return Object.assign({}, state, {
			selectedProfileSec: action.payload,
			message: 'selected sec: ' + action.payload
		});
	}

	return state;
}