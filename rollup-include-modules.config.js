import rollupConfig from './rollup.config'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default Object.assign({}, rollupConfig, {
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react'
      ]
    }),
    commonjs(),
  ]
})
