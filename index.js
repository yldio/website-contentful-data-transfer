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

// Query Meetup
const getSelfGroups = promisify(meetup.getSelfGroups.bind(meetup));
const getEvent = promisify(meetup.getEvent.bind(meetup));

Main(async () => {
  const space = await client.getSpace(CONTENTFUL_SPACE);
  const environment = await space.getEnvironment('master');

  const { items: events } = await environment.getEntries({
    limit: 1000,
    content_type: 'meetupEvent'
  });

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

      const ev = find(events, ['fields.linkToEvent.en-US', meetup.link]);
      const entry = generateContentfulEvent({ ...meetup, ...group });

      console.log(entry);

      if (ev) {
        // update
        ev.fields = Object.assign(ev.fields, entry.fields);
        console.log(`Updating entry ${meetup.eventName}`);
        return ev.update();
      }

      // create
      console.log(`Creating entry ${meetup.eventName}`);
      const id = await environment.createEntry('meetupEvent', entry);
      const newEntry = await environment.getEntry(id.sys.id);

      console.log(`Publishing entry ${meetup.eventName}`);
      return newEntry.publish();

      // client.getSpace('<space_id>')
      // .then((space) => space.getEntry('<entry_id>'))
      // .then((entry) => entry.publish())
      // .then((entry) => console.log(`Entry ${entry.sys.id} published.`))
      // .catch(console.error)
    }
  );
});
