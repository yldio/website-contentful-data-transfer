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

  it('does magic', async done => {
    main().then(done);
  });
});

// describe('recording', () => {
//   // nock.recorder.rec();
//
//
//   it('does something', done => {
//     main().then(done);
//     // Main(async () => await main(), done());
//     // let nockCalls = nock.recorder.play();
//     // console.log(nockCalls);
//   });
// });
