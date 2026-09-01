import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter()
		})
	],
	define: {
		__VERSION__: JSON.stringify((process.env.WORKERS_CI_COMMIT_SHA || 'dev').slice(0, 7)),
		__BRANCH__: JSON.stringify(process.env.WORKERS_CI_BRANCH || 'local'),
		__BUILT_AT__: JSON.stringify(new Date().toISOString())
	}
});
