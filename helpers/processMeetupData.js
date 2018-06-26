const processMeetupData = arrayOfMeetups => {
  console.log(arrayOfMeetups);
  let outputArray = [];

  arrayOfMeetups.forEach(meetup => {
    let thisMeetup = {};
    thisMeetup.meetupId = meetup.id;
    thisMeetup.name = meetup.name;
    thisMeetup.url = meetup.link;
    thisMeetup.urlname = meetup.urlname;
    thisMeetup.nextEvent = meetup.next_event ? meetup.next_event.id : 0;

    outputArray.push(thisMeetup);
  });

  return outputArray;
};

module.exports = {
  processMeetupData
};
