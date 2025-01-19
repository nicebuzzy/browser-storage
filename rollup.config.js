// import terser from '@rollup/plugin-terser'

const outputs = [
  'index',
  'Storage',
  'BrowserStorage',
  'MemoryStorage',
  'UserscriptStorage'
].map(name => {
  const outputName = name.toLowerCase()

  return {
    input: `src/${name}.js`,
    output: [
      {
        file: `dist/${outputName}.js`,
        format: 'es'
      },
      // {
      //   file: `dist/${outputName}.min.js`,
      //   format: 'es',
      //   plugins: [terser()]
      // },
      {
        file: `dist/${outputName}.umd.js`,
        format: 'umd',
        name: name
      },
      // {
      //   file: `dist/${outputName}.umd.min.js`,
      //   format: 'umd',
      //   name: name,
      //   plugins: [terser()]
      // }
    ]
  }
})

export default outputs
