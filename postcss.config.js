const autoprefixer = require('autoprefixer')
module.exports = {
    plugins: [
        require('postcss-inline-svg'),
        autoprefixer({
            grid:true,
            browsers: "defaults, IE>9"
        })
        // ,
        // require('cssnano')
    ]
}