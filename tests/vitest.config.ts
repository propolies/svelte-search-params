import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	test: {
		exclude: ["src/tests/**/*.types.test.ts"],
		include: ["src/tests/**/*.test.ts"]
	},
	plugins: [tsconfigPaths()]
})
