process.env.NODE_ENV != "production" ? require("dotenv").config() : false;

const {SWAPI, REDIS} = process.env;
const axios = require("axios");
const moment = require("moment/moment");
const {createClient} = require("redis");
const redisConfig = {
  url: process.env.REDIS,
};

if (process.env.redisPassword) {
  redisConfig.password = process.env.redisPassword;
}

const redis = createClient(redisConfig);

const endpoints = [
  "people",
  "planets",
  "films",
  "species",
  "vehicles",
  "starships",
];

// const getIdFromUrl = (url) => url.slice(0, -1).split("/").pop();

(async function () {
  try {
    await redis.connect().then(() => {
      console.log(`Connected to ${REDIS}`);
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
      })
    );
  }
  await Promise.all(apiCalls);

  const updatedDate = moment();
  console.log(
    "Saving updated time to",
    updatedDate.format("DD/MM/YYYY hh:mm:ss")
  );

  try {
    await redis.set("updated", updatedDate.toString());
  } catch (error) {
    console.error("Redis error:", error);
  }

  await redis.quit();
  console.log("Finished");
})();
