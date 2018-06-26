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
  let selfGroups = processMeetupData(res);

  selfGroups.forEach(group => {
    if (group.nextEvent !== 0) {
      console.log(group);
      console.log(group.nextEvent);
      meetup.getEvent({ id: group.nextEvent, urlname: group.urlname }, function(
        err,
        resp
      ) {
        console.log(err, resp);
      });
    }
  });
});

// Get all Contentful Entries
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
