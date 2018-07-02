const generateContentfulEvent = require('../helpers/generate-contentful-event');

describe('Generate Contentful Event', () => {
  it('Generates Contentful Event', () => {
    const incomingObject = {
      eventName: 'ReactJS Girls #11 -  Reason, the good, the bad and ugly bits',
      duration: 9000000,
      time: 1531846800000,
      localTime: '18:00',
      description:
        'Kara Stubbs (@kiraarghy), a Software Engineer at MOO, talks about her experience with React and ReactReason.',
      date: '2018-07-17',
      venue: {
        name: 'JP Morgan',
        address1: '4 John Carpenter St',
        address2: 0,
        address3: 0,
        city: 'London'
      },
      link: 'https://www.meetup.com/ReactJS-Girls-London/events/251946999/',
      urlname: 'ReactJS-Girls-London',
      nextEvent: '251946999'
    };

    const desiredOutcome = {
      fields: {
        thisMeetupCode: {
          'en-US': `ReactJS-Girls-London-251946999`
        },
        meetupUrlName: {
          'en-US': 'ReactJS-Girls-London'
        },
        linkToEvent: {
          'en-US':
            'https://www.meetup.com/ReactJS-Girls-London/events/251946999/'
        },
        date: {
          'en-US': '2018-07-17'
        },
        startTime: {
          'en-US': new Date(1531846800000)
        },
        endTime: {
          'en-US': new Date(1531846800000 + 9000000)
        },
        address: {
          'en-US': `JP Morgan&&4 John Carpenter St&&&&&&London`
        },
        eventTitle: {
          'en-US':
            'ReactJS Girls #11 -  Reason, the good, the bad and ugly bits'
        },
        blurb: {
          'en-US':
            'Kara Stubbs (@kiraarghy), a Software Engineer at MOO, talks about her experience with React and ReactReason.'
        }
      }
    };

    expect(generateContentfulEvent(incomingObject)).toMatchObject(
      desiredOutcome
    );
  });
});
