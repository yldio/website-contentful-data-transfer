require("dotenv").config();

const { createClient } = require("contentful-management");
const Main = require("apr-main");

const { CONTENTFUL_TOKEN, CONTENTFUL_SPACE, MEETUP_KEY } = process.env;

const { processMeetupData } = require("./helpers/processMeetupData");

const meetup = require("meetup-api")({
  key: MEETUP_KEY
});

const client = createClient({
  // space: CONTENTFUL_SPACE,
  accessToken: CONTENTFUL_TOKEN
});

meetup.getSelfGroups((err, res) => {
  // console.log(err, res);
  console.log(processMeetupData(res));
});

// Get all Entries
// Main(async () => {
//   const space = await client.getSpace(CONTENTFUL_SPACE);
//   const entries = await space.getEntries();
//   console.log(entries.items);
// });

// Main(async () => {
//   const space = await client.getSpace(CONTENTFUL_SPACE);
//   const contentTypeList = await space.getContentTypes();
//   console.log(contentTypeList);
// });
