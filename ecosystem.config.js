module.exports = {
  apps: [
    {
      name: "fe-staging",
      script: "pnpm",
      args: "start",
      env: {
        PORT: 3002,
      },
      env_production: {
        PORT: 3002,
      },
      env_file: "../.env",
    },
  ],
}
