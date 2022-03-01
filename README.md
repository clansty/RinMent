# RinMent

这是[凌莞 Blog](https://nyac.at) 使用的自制评论系统，基于[腾讯云开发](https://cloudbase.net)的云函数和数据库

## 部署

安装 Cloudbase 的 CLI 工具，修改 [cloudbaserc.json](./cloudbaserc.json) 和 [index.ts](./functions/node-app/index.ts) 的 envId，然后

```bash
yarn deploy
```
