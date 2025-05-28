import { pipeline, Transform } from "node:stream";
import fs from "node:fs";
import { streamArray } from "stream-json/streamers/StreamArray";
import { parser } from "stream-json";
import { db } from "./db";
import { jobs } from "./db/schema";

async function seedJobs() {
  const transformer = new Transform({
    objectMode: true,
    transform: async (chunk, encoding, cb) => {
      console.log(chunk);
      await db.insert(jobs).values(chunk.value);
      cb();
    },
  });

  pipeline(
    fs.createReadStream("./src/jobs.json"),
    parser(),
    streamArray(),
    transformer,
    (err) => {
      console.log(err);
    },
  );
}

seedJobs();
