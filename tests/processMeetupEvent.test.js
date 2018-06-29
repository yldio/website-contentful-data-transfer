const processMeetupEvent = require('../helpers/process-meetup-event');
const { rawMeetupEventData } = require('../resources/rawMeetupEventData');

describe('processes Meetup event', () => {
  it('returns desired structure', () => {
    const incomingData = rawMeetupEventData;
    const desiredOutcome = {
      eventName: 'ReactJS Girls #11 -  Reason, the good, the bad and ugly bits',
      duration: 9000000,
      time: 1531846800000,
      localTime: '18:00',
      date: '2018-07-17',
      venue: {
        name: 'JP Morgan',
        address1: '4 John Carpenter St',
        address2: 0,
        address3: 0,
        city: 'London'
      },
      link: 'https://www.meetup.com/ReactJS-Girls-London/events/251946999/'
    };

    expect(processMeetupEvent(incomingData)).toMatchObject(desiredOutcome);
  });
});
