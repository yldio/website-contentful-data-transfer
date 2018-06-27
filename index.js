require('dotenv').config();

const { createClient } = require('contentful-management');
const Main = require('apr-main');
const { default: Map } = require('apr-map');
const Intercept = require('apr-intercept');
const { promisify } = require('util');
const find = require('lodash.find');

const { CONTENTFUL_TOKEN, CONTENTFUL_SPACE, MEETUP_KEY } = process.env;

const generateContentfulEvent = require('./helpers/generate-contentful-event');
const processMeetupData = require('./helpers/process-meetup-data');
const processMeetupEvent = require('./helpers/process-meetup-event');

const meetup = require('meetup-api')({
  key: MEETUP_KEY
});

const client = createClient({
  accessToken: CONTENTFUL_TOKEN
});

const getSelfGroups = promisify(meetup.getSelfGroups.bind(meetup));
const getEvent = promisify(meetup.getEvent.bind(meetup));

Main(async () => {
  const space = await client.getSpace(CONTENTFUL_SPACE);
  const environment = await space.getEnvironment('master');

  const { items: events } = await space.getEntries({
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

      if (ev) {
        // update
        ev.fields = Object.assign(ev.fields, entry.fields);
        return ev.update();
      }

      // create
      return environment.createEntry('meetupEvent', entry);
    }
  );
});
