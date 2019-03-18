const babel = require('rollup-plugin-babel');
const commonJs = require('rollup-plugin-commonjs');
const resolveNodeModules = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify-es');
const config = require('./gulp/config');

const rollupConfig = {
  input: config.src.scripts + 'main.js',
  format: 'iife',
  globals: {
    jquery: '$',
  },
  sourcemap: true,
  plugins: [
    resolveNodeModules(),
    commonJs(),
    babel({
      exclude: 'node_modules/**',
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ]
}

module.exports = rollupConfig;
