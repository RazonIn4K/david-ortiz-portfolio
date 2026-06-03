import nextConfig from "eslint-config-next"

const config = [
  {
    ignores: [".next/**", ".claude/**", "node_modules/**"],
  },
  ...nextConfig,
]

export default config
