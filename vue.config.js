module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    module: {
        rules: [{
            test: /\.gpx$/i,
            use: [{
                loader: 'file-loader'
            }]
        }]
    }
  }
}