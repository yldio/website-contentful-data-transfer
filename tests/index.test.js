const main = require('..');
const Main = require('apr-main');
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

Main(async () => main());
