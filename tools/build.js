'use strict'

let fs = require('fs-extra');

let isReleaseConfig = process.argv[2] === 'release';

// Copy the app file
fs.copySync('src', 'dist', {clobber:true});

// Copy react and react-dom to target directly
let dotMin = isReleaseConfig ? '.min' : '';
fs.copySync(`node_modules/react/dist/react${dotMin}.js`, 'dist/react.js', {clobber:true});
fs.copySync(`node_modules/react-dom/dist/react-dom${dotMin}.js`, 'dist/react-dom.js', {clobber:true});