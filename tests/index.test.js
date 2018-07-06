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
  publishUpdatedEntryNock,
  createContentfulEntryNock,
  contentfulGetEntriesNoMatchNock,
  publishCreatedEntryNock
} = require('../helpers/nocks');

// describe('main script pathway for update', () => {
//   nock.disableNetConnect();
//   // nock.recorder.rec();
//
//   beforeAll(() => {
//     meetupSelfGroupNock();
//     meetupEventNock();
//     contentfulSpaceNock();
//     contentfulEnvNock();
//     contentfulGetEntriesNock();
//     contentfulGetSingleEntryNock();
//     updateContentfulEntryNock();
//     publishUpdatedEntryNock();
//   });
//
//   it('checks pathway for update', async () => {
//     await main();
//     expect(nock.isDone()).toBeTruthy();
//   });
// });

describe.only('main script pathway for create', () => {
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
