module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/direitos-e-silencios/'
    : '/',
  chainWebpack: config => {
    config.module
      .rule('yaml')
      .test(/\.ya?ml$/)
      .use('json-loader')
      .loader('json-loader')
      .end()
      .use('yaml-loader')
      .loader('yaml-loader')
  }
}
