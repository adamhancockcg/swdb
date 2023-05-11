/*tracing.js*/
const {getNodeAutoInstrumentations} = require("@opentelemetry/auto-instrumentations-node");
const {OTLPTraceExporter} = require("@opentelemetry/exporter-trace-otlp-proto");
const {OTLPMetricExporter} = require("@opentelemetry/exporter-metrics-otlp-proto");
const {NodeSDK} = require("@opentelemetry/sdk-node");
const {PeriodicExportingMetricReader} = require("@opentelemetry/sdk-metrics");
const {SemanticResourceAttributes} = require("@opentelemetry/semantic-conventions");
const {Resource} = require("@opentelemetry/resources");

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "swdb-api",
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV,
  }),
  traceExporter: new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    url: "http://127.0.0.1:4318/v1/traces" || process.env.OTLP_ENDPOINT_TRACES,
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: "http://127.0.0.1:4318/v1/metrics" || process.env.OTLP_ENDPOINT_METRICS, // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
      headers: {}, // an optional object containing custom headers to be sent with each request
      concurrencyLimit: 1, // an optional limit on pending requests
    }),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();

process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => console.log("Tracing terminated"))
    .catch((error) => console.log("Error terminating tracing", error))
    .finally(() => process.exit(0));
});
