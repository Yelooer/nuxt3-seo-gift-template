module.exports = {
  apps: [
    {
      // PM2 启动时显示的项目名称。
      name: 'nuxt3GiftTemplate',
      exec_mode: 'cluster',
      instances: 'max',
      script: './server/index.mjs'
    }
  ]
}
