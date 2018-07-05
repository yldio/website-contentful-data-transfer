const nock = require('nock');
const meetupGroupResponse = require('../resources/rawMeetupData');
const meetupEventResponse = require('../resources/rawMeetupEventData');
const generateContentfulEvent = require('../helpers/generate-contentful-event');
const { CONTENTFUL_TOKEN, CONTENTFUL_SPACE, MEETUP_KEY } = process.env;

const meetupSelfGroupNock = () =>
  nock('https://api.meetup.com')
    .defaultReplyHeaders({ 'Content-Type': 'application/json' })
    .get('/self/groups')
    .query({ key: MEETUP_KEY })
    .reply(200, JSON.stringify(meetupGroupResponse));

const meetupEventNock = () =>
  nock('https://api.meetup.com')
    .defaultReplyHeaders({ 'Content-Type': 'application/json' })
    .get('/ReactJS-Girls-London/events/251946999')
    .query({ key: MEETUP_KEY })
    .reply(200, JSON.stringify(meetupEventResponse));

const contentfulSpaceNock = () =>
  nock('https://api.contentful.com/')
    .defaultReplyHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,POST,PUT,OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Accept,Accept-Language,Authorization,Cache-Control,Content-Length,Content-Range,Content-Type,DNT,Destination,Expires,If-Match,If-Modified-Since,If-None-Match,Keep-Alive,Last-Modified,Origin,Pragma,Range,User-Agent,X-Http-Method-Override,X-Mx-ReqToken,X-Requested-With,X-Contentful-Version,X-Contentful-Content-Type,X-Contentful-Organization,X-Contentful-Skip-Transformation,X-Contentful-User-Agent,X-Contentful-Enable-Alpha-Feature'
    })
    .options(`/spaces/${CONTENTFUL_SPACE}`)
    .reply(204, '')
    .get(`/spaces/${CONTENTFUL_SPACE}`)
    .reply(
      200,
      JSON.stringify({
        name: 'blog',
        sys: {
          type: 'Space',
          id: `${CONTENTFUL_SPACE}`,
          version: 1,
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '7f3sAHq8V2LEdXnMsJ2pmW'
            }
          },
          createdAt: '2018-05-15T10:17:29Z',
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '7f3sAHq8V2LEdXnMsJ2pmW'
            }
          },
          updatedAt: '2018-05-15T10:17:29Z'
        }
      })
    );

const contentfulEnvNock = () =>
  nock('https://api.contentful.com/')
    .defaultReplyHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,POST,PUT,OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Accept,Accept-Language,Authorization,Cache-Control,Content-Length,Content-Range,Content-Type,DNT,Destination,Expires,If-Match,If-Modified-Since,If-None-Match,Keep-Alive,Last-Modified,Origin,Pragma,Range,User-Agent,X-Http-Method-Override,X-Mx-ReqToken,X-Requested-With,X-Contentful-Version,X-Contentful-Content-Type,X-Contentful-Organization,X-Contentful-Skip-Transformation,X-Contentful-User-Agent,X-Contentful-Enable-Alpha-Feature'
    })
    .options(`/spaces/${CONTENTFUL_SPACE}/environments/master`)
    .reply(204, '')
    .get(`/spaces/${CONTENTFUL_SPACE}/environments/master`)
    .reply(
      200,
      JSON.stringify({
        name: 'master',
        sys: {
          type: 'Environment',
          id: 'master',
          version: 1,
          space: {
            sys: { type: 'Link', linkType: 'Space', id: `${CONTENTFUL_SPACE}` }
          },
          status: { sys: { type: 'Link', linkType: 'Status', id: 'ready' } },
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '7f3sAHq8V2LEdXnMsJ2pmW'
            }
          },
          createdAt: '2018-05-15T10:17:29Z',
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '7f3sAHq8V2LEdXnMsJ2pmW'
            }
          },
          updatedAt: '2018-05-15T10:17:29Z'
        }
      })
    );

const contentfulGetEntriesNock = () =>
  nock('https://api.contentful.com/')
    .defaultReplyHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,POST,PUT,OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Accept,Accept-Language,Authorization,Cache-Control,Content-Length,Content-Range,Content-Type,DNT,Destination,Expires,If-Match,If-Modified-Since,If-None-Match,Keep-Alive,Last-Modified,Origin,Pragma,Range,User-Agent,X-Http-Method-Override,X-Mx-ReqToken,X-Requested-With,X-Contentful-Version,X-Contentful-Content-Type,X-Contentful-Organization,X-Contentful-Skip-Transformation,X-Contentful-User-Agent,X-Contentful-Enable-Alpha-Feature'
    })
    .options(
      `/spaces/${CONTENTFUL_SPACE}/environments/master/entries?limit=1000&content_type=meetupEvent`
    )
    .reply(204, '')
    .get(
      `/spaces/${CONTENTFUL_SPACE}/environments/master/entries?limit=1000&content_type=meetupEvent`
    )
    .reply(200, {
      sys: { type: 'Array' },
      total: 1,
      skip: 0,
      limit: 1000,
      items: [
        {
          sys: {
            space: {
              sys: { type: 'Link', linkType: 'Space', id: 'g6423bljuuyt' }
            },
            id: '2C3au2K5VaQiyOeowekkM4',
            type: 'Entry',
            createdAt: '2018-06-29T10:42:40.378Z',
            updatedAt: '2018-07-03T10:11:05.045Z',
            environment: {
              sys: { id: 'master', type: 'Link', linkType: 'Environment' }
            },
            createdBy: {
              sys: {
                type: 'Link',
                linkType: 'User',
                id: '4S85cDvPUPr1sI13p6pT26'
              }
            },
            updatedBy: {
              sys: {
                type: 'Link',
                linkType: 'User',
                id: '4S85cDvPUPr1sI13p6pT26'
              }
            },
            publishedCounter: 18,
            version: 43,
            publishedBy: {
              sys: {
                type: 'Link',
                linkType: 'User',
                id: '4S85cDvPUPr1sI13p6pT26'
              }
            },
            publishedVersion: 42,
            firstPublishedAt: '2018-06-29T10:42:41.431Z',
            publishedAt: '2018-07-03T10:11:05.045Z',
            contentType: {
              sys: { type: 'Link', linkType: 'ContentType', id: 'meetupEvent' }
            }
          },
          fields: {
            thisMeetupCode: { 'en-US': 'ReactJS-Girls-London-251946999' },
            meetupUrlName: { 'en-US': 'ReactJS-Girls-London' },
            eventTitle: {
              'en-US':
                'ReactJS Girls #11 -  Reason, the good, the bad and ugly bits'
            },
            date: { 'en-US': '2018-07-17' },
            startTime: { 'en-US': '2018-07-17T17:00:00.000Z' },
            endTime: { 'en-US': '2018-07-17T19:30:00.000Z' },
            address: { 'en-US': 'JP Morgan&&4 John Carpenter St&&&&&&London' },
            linkToEvent: {
              'en-US':
                'https://www.meetup.com/ReactJS-Girls-London/events/251946999/'
            },
            blurb: {
              'en-US':
                'Kara Stubbs (@kiraarghy), a Software Engineer at MOO, talks about her experience with React and ReactReason.'
            }
          }
        }
      ]
    });

const contentfulGetSingleEntryNock = () =>
  nock('https://api.contentful.com/')
    .defaultReplyHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,POST,PUT,OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Accept,Accept-Language,Authorization,Cache-Control,Content-Length,Content-Range,Content-Type,DNT,Destination,Expires,If-Match,If-Modified-Since,If-None-Match,Keep-Alive,Last-Modified,Origin,Pragma,Range,User-Agent,X-Http-Method-Override,X-Mx-ReqToken,X-Requested-With,X-Contentful-Version,X-Contentful-Content-Type,X-Contentful-Organization,X-Contentful-Skip-Transformation,X-Contentful-User-Agent,X-Contentful-Enable-Alpha-Feature'
    })
    .options(
      `/spaces/${CONTENTFUL_SPACE}/environments/master/entries/2C3au2K5VaQiyOeowekkM4`
    )
    .reply(204, '')
    .get(
      `/spaces/${CONTENTFUL_SPACE}/environments/master/entries/2C3au2K5VaQiyOeowekkM4`
    )
    .reply(200, {
      sys: {
        space: { sys: { type: 'Link', linkType: 'Space', id: 'g6423bljuuyt' } },
        id: '2C3au2K5VaQiyOeowekkM4',
        type: 'Entry',
        createdAt: '2018-06-29T10:42:40.378Z',
        updatedAt: '2018-07-03T12:55:01.181Z',
        environment: {
          sys: { id: 'master', type: 'Link', linkType: 'Environment' }
        },
        createdBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        updatedBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        publishedCounter: 29,
        version: 66,
        publishedBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        publishedVersion: 64,
        firstPublishedAt: '2018-06-29T10:42:41.431Z',
        publishedAt: '2018-07-03T12:54:01.830Z',
        contentType: {
          sys: { type: 'Link', linkType: 'ContentType', id: 'meetupEvent' }
        }
      },
      fields: {
        thisMeetupCode: { 'en-US': 'ReactJS-Girls-London-251946999' },
        meetupUrlName: { 'en-US': 'ReactJS-Girls-London' },
        eventTitle: {
          'en-US':
            'ReactJS Girls #11 -  Reason, the good, the bad and ugly bits'
        },
        date: { 'en-US': '2018-07-17' },
        startTime: { 'en-US': '2018-07-17T17:00:00.000Z' },
        endTime: { 'en-US': '2018-07-17T19:30:00.000Z' },
        address: { 'en-US': 'JP Morgan&&4 John Carpenter St&&&&&&London' },
        linkToEvent: {
          'en-US':
            'https://www.meetup.com/ReactJS-Girls-London/events/251946999/'
        },
        blurb: {
          'en-US':
            'Kara Stubbs (@kiraarghy), a Software Engineer at MOO, talks about her experience with React and ReactReason.'
        }
      }
    });

const updateContentfulEntryNock = () =>
  nock('https://api.contentful.com/')
    .defaultReplyHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,POST,PUT,OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Accept,Accept-Language,Authorization,Cache-Control,Content-Length,Content-Range,Content-Type,DNT,Destination,Expires,If-Match,If-Modified-Since,If-None-Match,Keep-Alive,Last-Modified,Origin,Pragma,Range,User-Agent,X-Http-Method-Override,X-Mx-ReqToken,X-Requested-With,X-Contentful-Version,X-Contentful-Content-Type,X-Contentful-Organization,X-Contentful-Skip-Transformation,X-Contentful-User-Agent,X-Contentful-Enable-Alpha-Feature'
    })
    .options(
      `/spaces/${CONTENTFUL_SPACE}/environments/master/entries/2C3au2K5VaQiyOeowekkM4`
    )
    .reply(204, '')
    .put(
      `/spaces/${CONTENTFUL_SPACE}/environments/master/entries/2C3au2K5VaQiyOeowekkM4`,
      {
        fields: {
          thisMeetupCode: { 'en-US': 'ReactJS-Girls-London-251946999' },
          meetupUrlName: { 'en-US': 'ReactJS-Girls-London' },
          linkToEvent: {
            'en-US':
              'https://www.meetup.com/ReactJS-Girls-London/events/251946999/'
          },
          date: { 'en-US': '2018-07-17' },
          startTime: { 'en-US': '2018-07-17T17:00:00.000Z' },
          endTime: { 'en-US': '2018-07-17T19:30:00.000Z' },
          address: { 'en-US': 'JP Morgan&&4 John Carpenter St&&&&&&London' },
          eventTitle: {
            'en-US':
              'ReactJS Girls #11 -  Reason, the good, the bad and ugly bits'
          },
          blurb: {
            'en-US':
              'Kara Stubbs (@kiraarghy), a Software Engineer at MOO, talks about her experience with React and ReactReason.'
          }
        }
      }
    )
    .reply(200, {
      sys: {
        space: { sys: { type: 'Link', linkType: 'Space', id: 'g6423bljuuyt' } },
        id: '2C3au2K5VaQiyOeowekkM4',
        type: 'Entry',
        createdAt: '2018-06-29T10:42:40.378Z',
        updatedAt: '2018-07-03T10:51:29.183Z',
        environment: {
          sys: { id: 'master', type: 'Link', linkType: 'Environment' }
        },
        createdBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        updatedBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        publishedCounter: 25,
        version: 58,
        publishedBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        publishedVersion: 56,
        firstPublishedAt: '2018-06-29T10:42:41.431Z',
        publishedAt: '2018-07-03T10:40:38.345Z',
        contentType: {
          sys: { type: 'Link', linkType: 'ContentType', id: 'meetupEvent' }
        }
      },
      fields: {
        thisMeetupCode: { 'en-US': 'ReactJS-Girls-London-251946999' },
        meetupUrlName: { 'en-US': 'ReactJS-Girls-London' },
        eventTitle: {
          'en-US':
            'ReactJS Girls #11 -  Reason, the good, the bad and ugly bits'
        },
        date: { 'en-US': '2018-07-17' },
        startTime: { 'en-US': '2018-07-17T17:00:00.000Z' },
        endTime: { 'en-US': '2018-07-17T19:30:00.000Z' },
        address: { 'en-US': 'JP Morgan&&4 John Carpenter St&&&&&&London' },
        linkToEvent: {
          'en-US':
            'https://www.meetup.com/ReactJS-Girls-London/events/251946999/'
        },
        blurb: {
          'en-US':
            'Kara Stubbs (@kiraarghy), a Software Engineer at MOO, talks about her experience with React and ReactReason.'
        }
      }
    });

const publishUpdatedEntryNock = () =>
  nock('https://api.contentful.com/')
    .defaultReplyHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,POST,PUT,OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Accept,Accept-Language,Authorization,Cache-Control,Content-Length,Content-Range,Content-Type,DNT,Destination,Expires,If-Match,If-Modified-Since,If-None-Match,Keep-Alive,Last-Modified,Origin,Pragma,Range,User-Agent,X-Http-Method-Override,X-Mx-ReqToken,X-Requested-With,X-Contentful-Version,X-Contentful-Content-Type,X-Contentful-Organization,X-Contentful-Skip-Transformation,X-Contentful-User-Agent,X-Contentful-Enable-Alpha-Feature'
    })
    .options(
      `/spaces/${CONTENTFUL_SPACE}/environments/master/entries/2C3au2K5VaQiyOeowekkM4/published`
    )
    .reply(204, '')
    .put(
      `/spaces/${CONTENTFUL_SPACE}/environments/master/entries/2C3au2K5VaQiyOeowekkM4/published`
    )
    .reply(200, {
      sys: {
        space: { sys: { type: 'Link', linkType: 'Space', id: 'g6423bljuuyt' } },
        id: '2C3au2K5VaQiyOeowekkM4',
        type: 'Entry',
        createdAt: '2018-06-29T10:42:40.378Z',
        updatedAt: '2018-07-03T14:01:59.449Z',
        environment: {
          sys: { id: 'master', type: 'Link', linkType: 'Environment' }
        },
        createdBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        updatedBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        publishedCounter: 33,
        version: 73,
        publishedBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        publishedVersion: 72,
        firstPublishedAt: '2018-06-29T10:42:41.431Z',
        publishedAt: '2018-07-03T14:01:59.449Z',
        contentType: {
          sys: { type: 'Link', linkType: 'ContentType', id: 'meetupEvent' }
        }
      },
      fields: {
        thisMeetupCode: { 'en-US': 'ReactJS-Girls-London-251946999' },
        meetupUrlName: { 'en-US': 'ReactJS-Girls-London' },
        eventTitle: {
          'en-US':
            'ReactJS Girls #11 -  Reason, the good, the bad and ugly bits'
        },
        date: { 'en-US': '2018-07-17' },
        startTime: { 'en-US': '2018-07-17T17:00:00.000Z' },
        endTime: { 'en-US': '2018-07-17T19:30:00.000Z' },
        address: { 'en-US': 'JP Morgan&&4 John Carpenter St&&&&&&London' },
        linkToEvent: {
          'en-US':
            'https://www.meetup.com/ReactJS-Girls-London/events/251946999/'
        },
        blurb: {
          'en-US':
            'Kara Stubbs (@kiraarghy), a Software Engineer at MOO, talks about her experience with React and ReactReason.'
        }
      }
    });

module.exports = {
  meetupSelfGroupNock,
  meetupEventNock,
  contentfulSpaceNock,
  contentfulEnvNock,
  contentfulGetEntriesNock,
  contentfulGetSingleEntryNock,
  updateContentfulEntryNock,
  publishUpdatedEntryNock
};
