import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

export default {
    entry: 'view/js/index.js',
    format: 'iife',
    plugins: [
        postcss({
            // sourceMap: true,
            extensions: ['.css'],
            plugins: [
                cssnext(),
                cssnano({autoprefixer:false})
            ],
            extract: 'view/css/style.min.css'
        }),
        resolve(),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        })
    ],
    dest: 'view/js/bundle.min.js'
};