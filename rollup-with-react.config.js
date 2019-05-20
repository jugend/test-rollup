import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import presetPpReact from 'babel-preset-pp-react'

function getExports(dep) {
  try {
    const mod = require(dep)

    if (mod.__esModule) {
      return null
    }

    return Object.keys(mod)
  } catch (e) {
    // ignore. Hopefully it's not an issue. If it is, they'll have to
    // override the built-in config
  }

  return null
}

const unsupportedFileTypes = [
  /\.css$/,
  /\.less$/,
  /\.svg$/,
  /\.scss$/,
  /\.html$/,
  /\.png$/,
  /\.jpe?g$/
]

export default {
  input: 'src/with-react.js',
  // external: ['react', 'pp-react'],
  external: id => {
    let isExternal = false
    if (unsupportedFileTypes.some(t => t.test(id))) {
      isExternal = true
    }
    console.log('>> external', id, ', isExternal', isExternal)
    return isExternal
  },
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm'
    },
    {
      file: 'dist/bundle.iife.js',
      format: 'iife',
      name: 'MyBundle',
      globals: {
        react: 'React',
        'pp-react': 'ppReact'
      }
    }
  ],
  plugins: [
    resolve({
      main: true,
      jsnext: true
    }),
    commonjs({
      include: /node_modules/,
      extensions: ['.js'],
      // Will throw Error: 'Component' is not exported by node_modules/react/index.js
      // import React, { Component } from 'react';
      namedExports: {
        react: getExports('react')
      }
    }),
    // Putting this before commonjs will throw an error
    // Unexpected token in commonjs
    babel({
      // exclude: 'node_modules/**',
      // With regex
      // include: /node_modules/,
      extensions: ['.js'],
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react',
        presetPpReact,
      ]
    })
  ]
}
