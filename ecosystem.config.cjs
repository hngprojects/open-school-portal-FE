module.exports = {
  apps: [
    {
      name: "fe-staging",
      script: "pnpm",
      args: "start --port 3002",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: 3002,
      },
    },
  ],
}
