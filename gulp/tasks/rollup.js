const rollup = require('rollup').rollup
const babel = require('rollup-plugin-babel')
// const eslint = require('rollup-plugin-eslint')
const log = require('fancy-log');

const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const uglify = require('rollup-plugin-uglify')
const sourcemaps = require('rollup-plugin-sourcemaps');


module.exports = (modules, callback) => {
  modules.forEach((module, i) => {
    rollup({
      input: module.entry,
      plugins: [
        sourcemaps(),
        resolve(),
        commonjs(),
        // eslint(),
        babel({
          exclude: 'node_modules/**'
        }),
        replace({
          ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        (process.env.NODE_ENV === 'production' && uglify())
      ],

      // output: {
      //   file: module.dest,
      //   format: 'iife',
      //   sourceMap: 'inline'
      // },
    })
    .then( bundle => {
      bundle.write({
        file: module.dest,
        format: 'iife',
        sourceMap: false,
      })

      if (i === modules.length - 1) {
        callback()
      }
    })
    .catch(err => log(err));
    // if (i === modules.length - 1) {
    //   callback()
    // }
  })
}