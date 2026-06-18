import nextConfig from "eslint-config-next"

const config = [
  {
    ignores: [".next/**", ".next-ci/**", ".claude/**", "node_modules/**"],
  },
  ...nextConfig,
]

export default config
