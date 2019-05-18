export default {
  input: 'src/main.js',
  external: ['react', 'pp-react'],
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
