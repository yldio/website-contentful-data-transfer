require("dotenv").config();

const { createClient } = require("contentful-management");
const Main = require("apr-main");

const { CONTENTFUL_TOKEN, CONTENTFUL_SPACE, MEETUP_KEY } = process.env;

const { processMeetupData } = require("./helpers/processMeetupData");
const { processMeetupEvent } = require("./helpers/processMeetupEvent");

const meetup = require("meetup-api")({
  key: MEETUP_KEY
});

const client = createClient({
  // space: CONTENTFUL_SPACE,
  accessToken: CONTENTFUL_TOKEN
});

// Meetup npm module relies on callbacks, so making the below async/await is no-go
meetup.getSelfGroups((err, res) => {
  // console.log(err, res);
  let selfGroups = processMeetupData(res);

  // console.log(selfGroups);

  selfGroups.forEach(group => {
    if (group.nextEvent !== 0) {
      // console.log(group);
      // console.log(group.nextEvent);
      meetup.getEvent(
        { id: group.nextEvent, urlname: group.urlname },
        (err, res) => {
          // console.log(res);
          const upcomingEventObject = processMeetupEvent(res);

          client
            .getSpace(CONTENTFUL_SPACE)
            .then(space => space.getEnvironment("master"))
            .then(environment =>
              environment.createEntry("meetupEvent", {
                fields: {
                  meetupUrlName: {
                    "en-US": upcomingEventObject.urlname
                  }
                }
              })
            );
        }
      );
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
