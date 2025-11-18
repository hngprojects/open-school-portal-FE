import dotenv from "dotenv"

dotenv.config({ path: "../.env" })

const config = {
  apps: [
    {
      name: "fe-staging",
      script: "pnpm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3002,
        ...process.env,
      },
    },
  ],
}

export default config
