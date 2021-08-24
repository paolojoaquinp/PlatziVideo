import express from 'express';
import config from './config';
import webpack from 'webpack';
import helmet from 'helmet';

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serverRoutes from '../frontend/routes/serverRoutes';
import reducer from '../frontend/reducers';
import initialState from '../frontend/initialState';
import Layout from '../frontend/components/Layout';

import getManifest from './getManifest';

const { ENV, PORT } = config;

const app = express();

if(ENV === 'development'){
    console.log('Development config'); 
    const webpackConfig = require('../../webpack.config.js');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);
    const serverConfig = { port: PORT, hot: true, path: '/_webpack_hmr' };

    app.use(webpackHotMiddleware(compiler, serverConfig));
    app.use(webpackDevMiddleware(compiler));
} else {
    app.use((req, res, next) => {
        if(!req.hashManifest) {
            req.hashManifest = getManifest();
        }
        next();
    });

    app.use(express.static(`${__dirname}/public`));
    app.use(helmet());
    app.use(helmet.permittedCrossDomainPolicies());
    app.disable('x-powered-by');
}

const setResponse = (html, preloadedState, manifest) => {
    const mainStyles = manifest ? manifest['vendors.css'] : 'assets/app.css';
    const mainBuild = manifest ? manifest['main.js'] : 'assets/main.js';
    const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';
    return (`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Platzi Video</title>
            <link rel="stylesheet" href="${mainStyles}" type="text/css" >
        </head>
        <body>
            <div id="app">${html}</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script src="${mainBuild}" type="text/javascript"></script>
            <script src="${vendorBuild}" type="text/javascript"></script>
        </body>
    </html>
    `);
};

const renderApp = (req, res) => {
    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                <Layout>{renderRoutes(serverRoutes)}</Layout>
            </StaticRouter>
        </Provider>
    );

    res.set("Content-Security-Policy", "img-src 'self' http://dummyimage.com");
    res.send(setResponse(html, preloadedState, req.hashManifest));
}

app.get('*', renderApp);

app.listen(PORT, (err) => {
    if(err) console.log(err);
    else console.log(`Server runing on port ${process.env.PORT}`);
})