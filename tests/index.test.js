const main = require('..');
const Main = require('apr-main');
const nock = require('nock');

const {
  meetupSelfGroupNock,
  meetupEventNock,
  contentfulSpaceNock,
  contentfulEnvNock,
  contentfulGetEntriesNock,
  contentfulGetSingleEntryNock,
  updateContentfulEntryNock,
  publishUpdatedEntryNock
} = require('../helpers/nocks');

describe('main script pathway', () => {
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

  it('does magic', async () => {
    await main();
    expect(nock.isDone()).toBeTruthy();
  });
});
