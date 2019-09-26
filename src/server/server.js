import express from 'express';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import history from 'connect-history-api-fallback';
import { Provider as ReduxProvider } from 'react-redux';
import { ChunkExtractor } from '@loadable/server';
import { Helmet } from 'react-helmet';

import  App from '../app/App';
import initStore from '../app/redux/store/initStore';

const app = express();
const store = initStore();
const statsFile = path.resolve('./dist/client/loadable-stats.json');
const helmet = Helmet.renderStatic();
const PORT = process.env.MODE === 'prod' ? '9000' : '9001';
const HOST = process.env.MODE === 'prod' ? '0.0.0.0' : 'localhost';

const htmlTemplate = (reactDom, reduxState, helmet, styleTags, scriptTags, linkTags) => {
	return `
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="shortcut icon" href="/static/favicon.webp" />
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
			${helmet.link.toString()}
			${linkTags}
            ${styleTags}
        </head>
        <body>
            <div id="root">${reactDom}</div>
            <script>
                window.REDUX_DATA = ${JSON.stringify(reduxState)}
            </script>
            ${scriptTags}
        </body>
        </html>
    `;
};

app.use('/static', express.static(path.resolve(__dirname, '../../dist/client')));

app.use(history());

app.get('/*', (req, res) => {
	const context = {};
	const extractor = new ChunkExtractor({
		statsFile,
		entrypoints: ['client']
	});

	const jsx = extractor.collectChunks(
		<ReduxProvider store={store}>
			<StaticRouter context={context} location={req.url}>
				<App />
			</StaticRouter>
		</ReduxProvider>
	);
	const reactDom = renderToString(jsx);

	const reduxState = store.getState();
	const styleTags = extractor.getStyleTags();
	const scriptTags = extractor.getScriptTags();
	const linkTags = extractor.getLinkTags();

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(htmlTemplate(reactDom, reduxState, helmet, styleTags, scriptTags, linkTags));
});


app.listen(PORT, HOST, (error) => {
	if(error) {
		console.log(error);
	} else {
		console.log(`
	█░█ █▀▀█ █░░ █▀▀ ░▀░ █▀▀▄ █▀▀█ 
	█▀▄ █▄▄█ █░░ █▀▀ ▀█▀ █░░█ █░░█ 
	▀░▀ ▀░░▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀░ ▀▀▀▀ 

		█▀▀ █▀▀█ █▀▀█ █▀▀ █▀▀ 
		▀▀█ █░░█ █▄▄█ █░░ █▀▀ 
		▀▀▀ █▀▀▀ ▀░░▀ ▀▀▀ ▀▀▀

	App is running on HOST: ${HOST} & PORT: ${PORT} in SSR mode
		`);
	}
});