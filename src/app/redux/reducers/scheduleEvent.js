import { LOAD_EVENTS, INIT_EVENT, SET_EVENT, SUBMIT_EVENT, CANCEL_EVENT } from '../constants/action-types';

const initialState = {
	curEvent: {
		start: '',
		end: '',
		content: ''
	},
	events: [],
	visible: false,
	confirmLoading: false
};

export default function scheduleEvent(state = initialState, action) {
	if(action.type === LOAD_EVENTS) {
		return Object.assign({}, state, {
			events: action.payload
		});
	} else if(action.type === INIT_EVENT) {
		return Object.assign({}, state, {
			visible: true,
			curEvent: {
				start: action.payload.start,
				end: action.payload.end,
				content: ''
			}
		});
	} else if(action.type === SET_EVENT) {
		const eventChanged = Object.assign({}, {
			start: state.curEvent.start,
			end: state.curEvent.end,
			[action.payload.name]: action.payload.value
		});

		return Object.assign({}, state, {
			curEvent: {...eventChanged}
		});
	} else if(action.type === SUBMIT_EVENT) {

		const eventToAdd = Object.assign({}, {
			start: action.payload.start,
			end: action.payload.end,
			content: action.payload.content
		});
		return Object.assign({}, state, {
			curEvent: {...eventToAdd},
			events: state.events.concat(eventToAdd),
			visible: false,
			confirmLoading: false
		});
	} else if(action.type === CANCEL_EVENT) {
		return Object.assign({}, state, {
			curEvent: {
				start: '',
				end: '',
				content: ''
			},
			visible: false,
			confirmLoading: false
		});
	}

	return state;
}