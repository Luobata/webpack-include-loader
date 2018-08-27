import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';

module.exports = {
    input: 'src/webpack-include-loader.ts',
    name: 'webpack-include-loader',
    sourcemap: true,
    output: {
        file: 'dist/webpack-include-loader.esm.js',
        format: 'es',
        name: 'webpack-include-loader',
        sourcemap: true,
    },
    plugins: [
        // uglify(),
        resolve(),
        typescript(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            presets: [['env', { modules: false }]],
        }),
        alias({
            ASSETS: path.resolve(__dirname, '../assets'),
            Core: path.resolve(__dirname, '../src/core'),
            Lib: path.resolve(__dirname, '../src/lib'),
            '@': path.resolve(__dirname, '../src'),
        }),
    ],
};
