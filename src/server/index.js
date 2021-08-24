require('ignore-styles');

require('@babel/register')({
    presets: [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-transform-runtime"
    ]
});

require('asset-require-hook')({
    extensions: ['jpg', 'png', 'gif'],
    name: '/assets/[md5:hash].[ext]',
});

require('./server');