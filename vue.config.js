module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    optimization: {
      chunkIds: 'named',
      splitChunks: {
        chunks: 'all',
      },
    }
  },
}
