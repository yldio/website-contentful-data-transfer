const main = require('..');
const Main = require('apr-main');
const nock = require('nock');

const {
  meetupSelfGroupNock,
  meetupEventNock,
  contentfulSpaceNock,
  contentfulEnvNock,
  contentfulGetEntriesNock,
  contentfulGetSingleEntryNock
} = require('../helpers/sharedNocks');

const {
  updateContentfulEntryNock,
  publishUpdatedEntryNock
} = require('../helpers/updateOnlyNocks');

const {
  publishCreatedEntryNock,
  createContentfulEntryNock,
  contentfulGetEntriesNoMatchNock
} = require('../helpers/createOnlyNocks');

const {
  meetupSelfGroupNoEventsNock
} = require('../helpers/noUpcomingEventsOnly');

describe('main script pathway for update', () => {
  nock.disableNetConnect();
  // nock.recorder.rec();

  beforeAll(() => {
    meetupSelfGroupNock();
    meetupEventNock();
    contentfulSpaceNock();
    contentfulEnvNock();
    contentfulGetEntriesNock();
    contentfulGetSingleEntryNock();
    updateContentfulEntryNock();
    publishUpdatedEntryNock();
  });

  it('checks pathway for update', async () => {
    await main();
    expect(nock.isDone()).toBeTruthy();
  });
});

describe('main script pathway for create', () => {
  nock.disableNetConnect();
  // nock.recorder.rec();

  beforeAll(() => {
    meetupSelfGroupNock();
    meetupEventNock();
    contentfulSpaceNock();
    contentfulEnvNock();
    contentfulGetEntriesNoMatchNock();
    createContentfulEntryNock();
    publishCreatedEntryNock();
  });

  it('checks pathway for create', async () => {
    await main();
    expect(nock.isDone()).toBeTruthy();
  });
});

describe('main script pathway for no upcoming events', () => {
  nock.disableNetConnect();
  // nock.recorder.rec();

  beforeAll(() => {
    meetupSelfGroupNoEventsNock();
    contentfulSpaceNock();
    contentfulEnvNock();
    contentfulGetEntriesNock();
  });

  it('checks pathway for no upcoming events', async () => {
    await main();
    expect(nock.isDone()).toBeTruthy();
  });
});
