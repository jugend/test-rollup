export default {
  input: 'src/without-react.js',
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
  ]
}
