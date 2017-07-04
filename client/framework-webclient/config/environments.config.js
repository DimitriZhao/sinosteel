module.exports = {
  // 重新写入当 NODE_ENV === 'development'
  development : (config) => ({
    compiler_public_path : `http://${config.server_host}:${config.server_port}/`
  }),

  // 重新写入当 NODE_ENV === 'production'
  production : (config) => ({
    compiler_public_path     : '/',
    compiler_fail_on_warning : false,
    compiler_hash_type       : 'chunkhash',
    compiler_devtool         : null,
    compiler_stats           : {
      chunks       : true,
      chunkModules : true,
      colors       : true
    }
  })
}
