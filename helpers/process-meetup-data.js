module.exports = arrayOfMeetups => {
  let outputArray = [];

  arrayOfMeetups.forEach(meetup => {
    const thisMeetup = {
      meetupId: meetup.id,
      name: meetup.name,
      url: meetup.link,
      urlname: meetup.urlname,
      nextEvent: meetup.next_event ? meetup.next_event.id : 0
    };

    outputArray.push(thisMeetup);
  });

  return outputArray;
};
