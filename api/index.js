require("./tracer");
process.env.NODE_ENV != "production" ? require("dotenv").config() : false;
const express = require("express");
const app = express();
const {port} = process.env || 3000;
const {createClient} = require("redis");
const cors = require("cors");
app.use(cors({origin: "*"}));
const {trace} = require("@opentelemetry/api");
const {Span} = require("@opentelemetry/sdk-trace-base");

const redisConfig = {
  url: process.env.REDIS_URL,
};

if (process.env.redisPassword) {
  redisConfig.password = process.env.redisPassword;
}

const redis = createClient(redisConfig);

redis.on("error", (err) => console.log("Redis Client Error", err));

(async function () {
  // startup
  try {
    await redis.connect();
  } catch {
    (e) => console.error(e);
  }

  app.listen(port, () => {
    console.log(`API running on port ${port} 🚀`);
  });
})();

app.get("/:resource/:subresource", async (req, res) => {
  const {resource, subresource} = req.params;
  console.log(`Request for ${resource}/${subresource}`);
  res.json(JSON.parse(await redis.get(resource))[subresource]);
});

app.get("/:resource", async (req, res) => {
  const {resource} = req.params;
  console.log(`Request for ${resource}`);
  try {
    res.json(JSON.parse(await redis.get(resource)));
  } catch (error) {
    res.send(error);
  }
});

app.get("/", async (req, res) => {
  console.log("Request for Keys");
  try {
    res.send((await redis.keys("*")).filter((key) => (key != "updated" ? true : false)));
  } catch (error) {
    res.send(error);
  }
});
