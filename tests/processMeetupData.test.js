const processMeetupData = require('../helpers/process-meetup-data');
const rawMeetupData = require('../resources/rawMeetupData');

describe('processes Meetup Data', () => {
  it('returns desired structure', () => {
    const incomingData = rawMeetupData;
    const invokedFunction = processMeetupData(incomingData);

    const reactJSGirls = {
      meetupId: 25597475,
      name: 'React.JS Girls London',
      url: 'https://www.meetup.com/ReactJS-Girls-London/',
      urlname: 'ReactJS-Girls-London',
      nextEvent: '251946999'
    };
    const manWebMeet = {
      meetupId: 28180588,
      name: 'Manchester Web Meetup',
      url: 'https://www.meetup.com/Manchester-Web-Meetup/',
      urlname: 'Manchester-Web-Meetup',
      nextEvent: 0
    };
    const ltm = {
      meetupId: 20389720,
      name: '#LTM — London TensorFlow Meetup',
      url: 'https://www.meetup.com/London-TensorFlow-Meetup/',
      urlname: 'London-TensorFlow-Meetup',
      nextEvent: 0
    };
    const ttYLD = {
      meetupId: 22436550,
      name: 'Tech Talks YLD #TTY',
      url: 'https://www.meetup.com/Tech-TalksYLD/',
      urlname: 'Tech-TalksYLD',
      nextEvent: 0
    };
    const dpLDN = {
      meetupId: 23599684,
      name: 'Digital Product London',
      url: 'https://www.meetup.com/Digital-Product-London/',
      urlname: 'Digital-Product-London',
      nextEvent: 0
    };
    const lnm = {
      meetupId: 22077151,
      name: '#LNM - London Node.JS Meetup',
      url: 'https://www.meetup.com/LNM-London-Node-JS-Meetup/',
      urlname: 'LNM-London-Node-JS-Meetup',
      nextEvent: 0
    };

    expect(invokedFunction).toContainEqual(reactJSGirls);
    expect(invokedFunction).toContainEqual(manWebMeet);
    expect(invokedFunction).toContainEqual(ltm);
    expect(invokedFunction).toContainEqual(ttYLD);
    expect(invokedFunction).toContainEqual(dpLDN);
    expect(invokedFunction).toContainEqual(lnm);
  });
});
