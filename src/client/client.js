import React                from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { AppContainer }     from 'react-hot-loader';
import smoothScrollPolyfill from 'smoothscroll-polyfill';
import { loadableReady } from '@loadable/component'

import initStore, { history } from '../app/redux/store/initStore';
import App from '../app/App.js';

const ELEMENT_TO_BOOTSTRAP  = 'root';
const BootstrapedElement    = document.getElementById(ELEMENT_TO_BOOTSTRAP);
const store = initStore();

// #region polyfills initializations
// tap events
// smoothscroll polyfill
smoothScrollPolyfill.polyfill();
// force polyfill (even if browser partially implements it)
window.__forceSmoothScrollPolyfill__ = true;

const renderApp = AppComponent => {
	const main = document.getElementById('root');
	const renderMethod = main.innerHTML.trim().length ? 'hydrate' : 'render';

	ReactDOM[renderMethod](
		<AppContainer warnings={false}>
        	<Provider store={store}>
				<ConnectedRouter history={history}>
					<AppComponent />
				</ConnectedRouter>
			</Provider>
		</AppContainer>,
		BootstrapedElement
	);
};

loadableReady(() => {
	renderApp(App);
});

if (module.hot) {
	module.hot.accept(
		'../app/App',
		() => {
			const AppComponent = require('../app/App').default;
			renderApp(RootComponent);
		}
	);
}