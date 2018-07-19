const striptags = require('striptags');

module.exports = eventObject => {
  let outputObject = {
    eventName: eventObject.name,
    duration: eventObject.duration,
    time: eventObject.time,
    localTime: eventObject.local_time,
    date: eventObject.local_date,
    venue: {
      name: eventObject.venue.name,
      address1: eventObject.venue.address_1,
      address2: eventObject.venue.address_2 ? eventObject.venue.address_2 : 0,
      address3: eventObject.venue.address_3 ? eventObject.venue.address_3 : 0,
      city: eventObject.venue.city
    },
    link: eventObject.link,
    description:
      eventObject.description.includes('EVENT SUMMARY') &&
      eventObject.description.includes('EVENT DETAILS')
        ? striptags(
            eventObject.description
              .split('EVENT SUMMARY')[1]
              .split('EVENT DETAILS')[0]
          ).trim()
        : 'For more information, please visit the Meetup page'
  };

  return outputObject;
};
