const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const {
    default: FluentUIReactIconsFontSubsettingPlugin,
} = require('@fluentui/react-icons-font-subsetting-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap({
    plugins: [
        // insert other plugin code
        new CleanWebpackPlugin(),
    ],
    resolve: {
        alias: {
            'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
            'react/jsx-runtime': 'react/jsx-runtime.js',
        },
    },
})
