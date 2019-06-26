import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import profileSec from './profileSecType';
import scheduleEvent from './scheduleEvent';

const reducers = {
	profileSec,
	scheduleEvent
};

export default (history) => combineReducers({
	router: connectRouter(history),
	...reducers
});