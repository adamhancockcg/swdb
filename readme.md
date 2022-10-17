# ARGOCD Demo App

Repo used to demo capabilities of ArgoCD

- [Application Code](https://github.com/adamhancockcg/swdb.app)
- [Helm Charts](https://github.com/adamhancockcg/swdb.helm)
- [Argo CD](https://github.com/adamhancockcg/swdb.argocd)

## Development

Redis

```
docker run --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
```

App development

```
npm run dev
```
