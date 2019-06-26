import { createStore, applyMiddleware, compose  } from 'redux';
import { createBrowserHistory, createMemoryHistory  } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import initRootReducer from '../reducers/rootReducer';

export const history = process.env.SSR ? createMemoryHistory() : createBrowserHistory();

const storeEnhancers = process.env.SSR ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function initStore(preloadedState) {
	const store = createStore(
		initRootReducer(history),
		preloadedState,
		storeEnhancers(
			applyMiddleware(
				routerMiddleware(history),
				thunk)
		)
	);

	// Hot reloading
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers/rootReducer', () => {
			store.replaceReducer(initRootReducer(history));
		});
	}

	return store;
}