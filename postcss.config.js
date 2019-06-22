module.exports = {
    plugins: {
        'autoprefixer': {
            grid: true,
            browsers: ['>1%'],
        },
        'postcss-import': {},
        'postcss-simple-vars': {},
        'postcss-nested': {},
        'postcss-preset-env': {
            stage: 3
        },
        'cssnano': {},
    }
}