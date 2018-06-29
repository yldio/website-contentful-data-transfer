module.exports = eventObject => {
  let outputObject = {};

  outputObject.eventName = eventObject.name;
  outputObject.duration = eventObject.duration;
  outputObject.time = eventObject.time;
  outputObject.localTime = eventObject.local_time;
  outputObject.date = eventObject.local_date;
  outputObject.venue = {
    name: eventObject.venue.name,
    address1: eventObject.venue.address_1,
    address2: eventObject.venue.address_2 ? eventObject.venue.address_2 : 0,
    address3: eventObject.venue.address_3 ? eventObject.venue.address_3 : 0,
    city: eventObject.venue.city
  };
  outputObject.link = eventObject.link;

  console.log(outputObject);
  return outputObject;
};
