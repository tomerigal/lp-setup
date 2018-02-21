import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
import sass from 'node-sass';
import commonjs from 'rollup-plugin-commonjs';
import packageJson from './package.json';

export default {
    input: packageJson.main,
    external: [],
    output: {
        format: 'iife',
        sourcemap: !process.env.BUILD,
        globals: {},
        file: 'dist/main.min.js'
    },
    plugins: [
        postcss({
            sourceMap: !process.env.BUILD,
            preprocessor: (content, id) => new Promise((resolve, reject) => {
                const result = sass.renderSync({ file: id });
                resolve({ code: result.css.toString() })
            }),
            extensions: ['.css', '.scss'],
            plugins: [
                cssnext(),
                cssnano({ autoprefixer: false, zindex: false })
            ],
            extract: 'dist/style.min.css'
        }),
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        })
    ]
};