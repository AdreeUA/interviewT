module.exports = {
  webpack: function override(config) {
    const oneOf = config.module.rules.find(conf => {
      return conf.oneOf
    }).oneOf
    const tsLoader = oneOf.find(conf => {
      return conf.loader && conf.loader.includes('ts-loader')
    })
    tsLoader.loader = require.resolve('awesome-typescript-loader')
    tsLoader.query = {
      useBabel: true,
    }
  
    const tsLintLoader = config.module.rules.find(conf => {
      return conf.loader && conf.loader.includes('tslint-loader')
    })
    tsLintLoader.options = tsLintLoader.options || {}
    // FIXED Warning: The 'no-use-before-declare' rule requires type infomation.
    tsLintLoader.options.typeCheck = true
  
    const path = require('path')
    // For import with absolute path
    config.resolve.modules = [path.resolve('src')].concat(config.resolve.modules)
    return config
  },
  jest: function override(config) {
    config.moduleNameMapper = {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/src/__mocks__/fileMock.js",
    }
    config.transform = {
      "^.+\\.tsx?$": "typescript-babel-jest",
      "\\.css$": "jest-css"
    }
    return config;
  }
}
