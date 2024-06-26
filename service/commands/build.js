'use strict'

const rm = require('rimraf')
const webpack = require('webpack')

const { error, done } = require('../utils/logger')
const paths = require('../utils/paths')

const webpackConfig = require('../config/prod')
const config = require('../project.config')

rm(paths.resolve(config.outputDir), (err) => {
  if (err) throw err

  webpack(webpackConfig, (err, stats) => {
    if (err) throw err

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      error('Build failed with errors.\n')
      process.exit(1)
    }

    done('Build complete.\n')
  })
})
