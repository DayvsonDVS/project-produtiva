module.exports = {
  apps: [
    {
      name: 'Front',
      script: './.output/server/index.mjs',
      env_qa: {
     
      exec_mode: 'cluster',
      instances: 1,
      PORT: 21081,
      NODE_ENV: 'production',
      },
    },
  ],
};