require('dotenv').config();

const { createClient } = require('contentful-management');
const Main = require('apr-main');
const { default: Map } = require('apr-map');
const Intercept = require('apr-intercept');
const { promisify } = require('util');
const find = require('lodash.find');

// Set up dot-env variables
const { CONTENTFUL_TOKEN, CONTENTFUL_SPACE, MEETUP_KEY } = process.env;

// Import helper functions
const generateContentfulEvent = require('./helpers/generate-contentful-event');
const processMeetupData = require('./helpers/process-meetup-data');
const processMeetupEvent = require('./helpers/process-meetup-event');

// Link API keys dot-env variables to instances
const meetup = require('meetup-api')({
  key: MEETUP_KEY
});

const client = createClient({
  accessToken: CONTENTFUL_TOKEN
});

// ----- Query Meetup
// getSelfGroups returns a list of Community objects, in order of how important the user is in each Community.
// If there is an upcoming event, this is included in the Community object.
const getSelfGroups = promisify(meetup.getSelfGroups.bind(meetup));

// getEvent returns event details - address, description etc
const getEvent = promisify(meetup.getEvent.bind(meetup));

const run = async () => {
  // Contentful user have many spaces. A space can have many environments.Each environment has entries of various "content models"
  const space = await client.getSpace(CONTENTFUL_SPACE);
  const environment = await space.getEnvironment('master');

  // filter to return published entries that belong to a specific content model.
  const { items: events } = await environment.getEntries({
    limit: 1000,
    content_type: 'meetupEvent'
  });

  //Maps through Community objects. If there is an upcominig event, the script either updates the Contentfu entry for that event if it exists, otherwise creates one.
  const entries = await Map(
    processMeetupData(await getSelfGroups()),
    async group => {
      const { urlname, meetupId, nextEvent } = group;

      if (!nextEvent) {
        return null;
      }

      const meetup = processMeetupEvent(
        await getEvent({
          id: nextEvent,
          urlname
        })
      );

      // console.log(JSON.stringify(events));

      const ev = find(events, ['fields.linkToEvent.en-US', meetup.link]);
      const entry = generateContentfulEvent({ ...meetup, ...group });

      if (ev) {
        // update
        ev.fields = Object.assign(ev.fields, entry.fields);
        console.log(`Updating entry ${meetup.eventName}`);
        const id = await ev.update();
        const updatedEntry = await environment.getEntry(id.sys.id);

        console.log(`Publishing updated entry ${meetup.eventName}`);
        return updatedEntry.publish();
      }

      // create
      console.log(`Creating entry ${meetup.eventName}`);
      const id = await environment.createEntry('meetupEvent', entry);
      const newEntry = await environment.getEntry(id.sys.id);

      console.log(`Publishing creted entry ${meetup.eventName}`);
      return newEntry.publish();
    }
  );
  console.log(entries);
};

if (!module.parent) {
  Main(async () => run());
}

module.exports = run;
