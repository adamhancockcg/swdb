process.env.NODE_ENV != "production" ? require("dotenv").config() : false;
require("./tracer.js");

const {SWAPI, REDIS} = process.env;
const axios = require("axios");
const moment = require("moment/moment");
const {createClient} = require("redis");
const redisConfig = {
  url: process.env.REDIS_URL,
};

if (process.env.redisPassword) {
  redisConfig.password = process.env.redisPassword;
}

const redis = createClient(redisConfig);

const endpoints = ["people", "planets", "films", "species", "vehicles", "starships"];

// const getIdFromUrl = (url) => url.slice(0, -1).split("/").pop();
const {trace} = require("@opentelemetry/api");

async function main() {
  try {
    await redis.connect().then(() => {
      console.log(`Connected to ${REDIS_URL}`);
    });
  } catch {
    (e) => console.error(e);
  }

  let apiCalls = [];
  console.log(`API: ${SWAPI}`);
  for (const endpoint of endpoints) {
    console.log(`Fetching ${endpoint}...`);
    apiCalls.push(
      new Promise((resolve, reject) => {
        const span = trace.getTracer("worker").startSpan("fetchFromSWAPI");
        span.setAttributes({
          endpoint,
        });
        axios
          .get(`${SWAPI}/${endpoint}`)
          .then(async (res) => {
            let {results} = res.data;
            redis.set(endpoint, JSON.stringify(results)).then(() => {
              console.log(`Cached ${endpoint} ✅`);
              resolve();
            });
          })
          .catch((e) => reject(e));
        span.end();
      })
    );
  }
  await Promise.all(apiCalls);

  const updatedDate = moment();
  console.log("Saving updated time to", updatedDate.format("DD/MM/YYYY hh:mm:ss"));

  try {
    await redis.set("updated", updatedDate.toString());
  } catch (error) {
    console.error("Redis error:", error);
  }

  await redis.quit();
  console.log("Finished");
}

// run first time
main();
// run every 60 seconds
const intervalId = setInterval(main, 60 * 1000);
