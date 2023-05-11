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

Jager (For Tracing)

```
docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 9411:9411 \
  jaegertracing/all-in-one:latest
```

App development

```
npm run dev
```
