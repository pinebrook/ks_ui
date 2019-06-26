import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import ScrollToTop from './containers/scrollToTop/ScrollToTop';
import AppRoutes from './routes/AppRoutes';

import './App.scss';

class App extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<ScrollToTop>
				<Helmet>
					<title>KaleidoSpace</title>
					<meta charset="UTF-8" />
					<meta name="description" content="A React&KOA based tech blog" />
					<meta name="keywords" content="Web,HTML,CSS,JavaScript,SPA,React,KOA,MongoDB,SASS" />
					<meta name="author" content="pinebrook" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				</Helmet>
				<AppRoutes />
			</ScrollToTop>
		);
	}
}

export default App;