module.exports = {
  chainWebpack: config => {
    // YAML files
    config.module
      .rule('yaml')
        .test(/\.ya?ml$/)
        .use('json-loader')
        .loader('json-loader')
        .end()
        .use('yaml-loader')
        .loader('yaml-loader')

    // SVG inline
    config.module
      .rule('vue')
        .use('vue-svg-inline-loader')
        .loader('vue-svg-inline-loader')
  }
}
