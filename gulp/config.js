const log = require('fancy-log');
const colors = require('ansi-colors');

const destPath = 'dest/';
const srcPath = 'src/';

const config = {
  env: 'development',
  production: false,
  setEnv: function(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },
  logEnv: function() {
    log(
      'Environment: ',
      colors.bgred(' ' + process.env.NODE_ENV + ' ')
    );
  },

  outputCSS: 'app.css',

  src: {
    root: srcPath,
    styles: srcPath + 'styles/',
    scripts: srcPath + 'scripts/',
    images: srcPath + 'images/',
    svg: srcPath + 'images/icons/',
    fonts: srcPath + 'fonts/',
    lib: srcPath + 'lib/',
    static: srcPath + 'static/'
  },

  dest: {
    root: destPath,
    styles: destPath + 'styles/',
    scripts: destPath + 'scripts/',
    images: destPath + 'images/',
    svg: destPath + 'images/icons/',
    fonts: destPath + 'fonts/',
    lib: destPath + 'lib/',
  },

  modules: [
    {
      name: 'main.js',
      entry: srcPath + 'scripts/main.js',
      dest: destPath + 'scripts/main.js'
    },
    {
      name: 'index.js',
      entry: srcPath + 'scripts/index.js',
      dest: destPath + 'scripts/index.js'
    },
    {
      name: 'ui_logic.js',
      entry: srcPath + 'scripts/ui_logic.js',
      dest: destPath + 'scripts/ui_logic.js'
    },
  ]
};

config.setEnv('development');

module.exports = config;
