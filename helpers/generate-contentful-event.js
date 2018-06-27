module.exports = ({
  urlname,
  nextEvent,
  venue,
  link,
  date,
  time,
  duration
}) => ({
  fields: {
    thisMeetupCode: {
      'en-US': `${urlname}-${nextEvent}`
    },
    meetupUrlName: {
      'en-US': urlname
    },
    linkToEvent: {
      'en-US': link
    },
    date: {
      'en-US': date
    },
    startTime: {
      'en-US': new Date(time)
    },
    endTime: {
      'en-US': new Date(time + duration)
    },
    address: {
      'en-US': `${venue.name}&&${venue.address1}&&${
        venue.adress2 ? venue.adress2 : ''
      }&&${venue.address3 ? venue.address3 : ''}&&${venue.city}`
    }
  }
});
