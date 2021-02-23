import moment from 'moment-timezone';

const timeZone = moment.tz.guess();
const timeZoneOffset = new Date().getTimezoneOffset();
const tzName = moment.tz.zone(timeZone).abbr(timeZoneOffset);

function t(time_in_cet) {
  const startDate = moment(`2020-12-18T${time_in_cet}+01:00`);
  return startDate.tz(tzName).format('HH:mm');
}

// Make sure the dates below are in CEST, the code will do its job in
// displaying it in local timezone of the user

export default function schedule(locale) {
  moment.locale(locale);
  return [
    // Day 1
    {
      startDate: moment(`2021-02-26T016:00:00+02:00`),
      startDateFormatted: moment(`2021-02-26T16:00:00+02:00`)
        .tz(tzName)
        .format('dddd, MMMM Do YYYY z'),
      schedule: [
        {
          start: t('18:00'),
          end: t('20:30'),
          body: `Opening session (settling, logistics and remembering)`,
        },
      ],
    },
  ];
}
