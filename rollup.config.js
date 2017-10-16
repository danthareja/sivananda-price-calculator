import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default [
  {
    name: 'Sivananda',
    input: 'src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**'],
        plugins: ['external-helpers']
      })
    ]
  },
  {
    input: 'src/index.js',
    external: Object.keys(pkg.dependencies),
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
        plugins: ['external-helpers']
      })
    ]
  }
]