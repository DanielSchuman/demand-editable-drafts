import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default [
	{
		input: 'node_modules/@bundled-es-modules/pdfjs-dist/build/pdf.worker.entry.js',
		output: {
			format: 'iife',
			file: 'public/pdf.worker.js',
			name: 'pdfjsWorker',
		},
		context: 'window',
		plugins: [
			resolve(),
			commonjs()
		]
	},
	{
		input: 'src/layout-worker/layout.worker.js',
		output: {
			format: 'iife',
			file: 'public/layout.worker.js',
			name: 'layoutWorker',
		},
		plugins: [
			resolve(),
			commonjs()
		]
	},
	{
		input: 'src/main.js',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: 'public/bundle.js'
		},
		plugins: [
			svelte({
				// enable run-time checks when not in production
				dev: !production,
				// we'll extract any component CSS out into
				// a separate file — better for performance
				css: css => {
					css.write('public/bundle.css');
				}
			}),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration —
			// consult the documentation for details:
			// https://github.com/rollup/rollup-plugin-commonjs
			resolve(),
			commonjs(),

			// Watch the `public` directory and refresh the
			// browser on changes when not in production
			!production && livereload('public'),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser()
		]
	}
];
