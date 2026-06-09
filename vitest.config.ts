import { defineConfig } from "vitest/config"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    // Route handlers + lib are server-side; no DOM needed.
    environment: "node",
    globals: true,
  },
  resolve: {
    alias: {
      // `server-only` throws when bundled for the browser; stub it for tests.
      "server-only": resolve(rootDir, "test/stubs/server-only.ts"),
      // Mirror the tsconfig `@/*` -> repo-root path alias.
      "@": resolve(rootDir),
    },
  },
})
