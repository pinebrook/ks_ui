import express from 'express';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { Helmet } from 'react-helmet';

import  App from '../app/App';
import initStore from '../app/redux/store/initStore';

const app = express();
const store = initStore();
const statsFile = path.resolve('./dist/client/loadable-stats.json');
const helmet = Helmet.renderStatic();

const htmlTemplate = (reactDom, reduxState, helmet, styleTags, scriptTags) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="shortcut icon" href="/static/favicon.webp" />
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
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

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(htmlTemplate(reactDom, reduxState, helmet, styleTags, scriptTags));
});

app.listen(9001, '0.0.0.0', (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log(`

▒█▀▀▀█ ▒█▀▀█ ░█▀▀█ ▒█▀▀█ ▒█▀▀▀ ▒█░▄▀ 
░▀▀▀▄▄ ▒█▄▄█ ▒█▄▄█ ▒█░░░ ▒█▀▀▀ ▒█▀▄░ 
▒█▄▄▄█ ▒█░░░ ▒█░▒█ ▒█▄▄█ ▒█▄▄▄ ▒█░▒█   

        `);
        console.log('App is running on PORT 9001 in SSR mode');
    }
});