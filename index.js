require("dotenv").config();

const { createClient } = require("contentful");
const Main = require("apr-main");

const { CONTENTFUL_TOKEN, CONTENTFUL_SPACE } = process.env;

const client = createClient({
  space: CONTENTFUL_SPACE,
  accessToken: CONTENTFUL_TOKEN
});

Main(async () => {
  const entries = await client.getEntries();
  console.log(entries.items);
});
