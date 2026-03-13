import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		globals: true,
		include: ["src/**/*.{test,test.svelte}.{js,ts}"]
	},
	resolve: {
		conditions: ["browser"]
	}
})
