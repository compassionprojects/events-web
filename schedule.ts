import moment from 'moment-timezone';

const timeZone = moment.tz.guess();
const timeZoneOffset = new Date().getTimezoneOffset();
const tzName = moment.tz.zone(timeZone).abbr(timeZoneOffset);

function t(time_in_cest) {
  const startDate = moment(`2020-08-08T${time_in_cest}+02:00`);
  return startDate.tz(tzName).format('HH:mm');
}

// Make sure the dates below are in CEST, the code will do its job in
// displaying it in local timezone of the user

const day1 = {
  startDate: moment(`2020-08-08T09:30:00+02:00`)
    .tz(tzName)
    .format('dddd, MMMM Do YYYY z'),
  schedule: [
    {
      start: t('09:30'),
      end: t('09:45'),
      body: `Community session (settling and logistics)`,
    },
    {
      start: t('09:45'),
      end: t('10:05'),
      body: `Remembering and feedback linked to the Remembering`,
    },
    {
      start: t('10:05'),
      end: t('10:20'),
      body: `Presentation of trainer offerings`,
    },
    { start: t('10:20'), end: t('10:35'), body: `Break, including energisers` },
    {
      start: t('10:35'),
      end: t('12:35'),
      body: `<div class="d-flex justify-content-between">
  <div>Parenting<br><i>Madga & Godfrey, <br>All levels</i></div>
  <div>Managing conflict (I)<br><i>Irmtraud, <br> Self-empathy, all levels</i></div>
  <div>Labels<br><i>Frank, <br>5 days +</i></div>
  <div>Keep calm and carry on<br><i>Louise, <br>All levels</i></div>
</div>
  `,
    },

    {
      start: t('12:35'),
      end: t('14:05'),
      body: `Break for lunch (including time to cook and eat together)`,
    },
    {
      start: t('14:05'),
      end: t('16:05'),
      body: `<div class="d-flex justify-content-between">
        <div>The importance of needs (I)<br><i>Madga & Godfrey, <br>All levels</i></div>
        <div>Managing conflict (II)<br><i>Irmtraud, <br>Empathy for other, <br>2 days +</i></div>
        <div>Dealing with monsters<br><i>Frank, <br>5 days +</i></div>
        <div>Circle of reflection<br><i>Louise, <br>All levels</i></div>
    </div>`,
    },
    { start: t('16:05'), end: t('16:20'), body: `Break, including energisers` },
    { start: t('16:20'), end: t('17:05'), body: `Home Groups` },
    { start: t('17:05'), end: t('17:10'), body: `Back to plenary session` },
    {
      start: t('17:10'),
      end: t('17:30'),
      body: `Feedback of the day (harvesting)`,
    },
    {
      start: t('17:30'),
      end: t('17:40'),
      body: `Community session (logistics)`,
    },
    {
      start: t('17:40'),
      end: t('22:00'),
      body: `For all offerings (meditation, yoga, dance, movement)`,
    },
  ],
};

const day2 = {
  startDate: moment(`2020-08-09T07:30:00+02:00`)
    .tz(tzName)
    .format('dddd, MMMM Do YYYY z'),
  schedule: [
    {
      start: t('07:30'),
      end: t('09:15'),
      body: `For all offerings (meditation, yoga, dance, movement)`,
    },
    {
      start: t('09:30'),
      end: t('09:45'),
      body: `Community session (settling and logistics)`,
    },
    {
      start: t('09:45'),
      end: t('10:05'),
      body: `Remembering and feedback linked to the Remembering`,
    },
    {
      start: t('10:05'),
      end: t('10:20'),
      body: `Presentation of trainer offerings`,
    },
    { start: t('10:20'), end: t('10:35'), body: `Break, including energisers` },
    {
      start: t('10:35'),
      end: t('12:35'),
      body: `<div class="d-flex justify-content-between">
        <div>NVC in school<br><i>Madga & Godfrey,  <br>4 days +</i></div>
        <div>I am the change <br>I want to see in the world<br><i>Irmtraud,  <br>All levels</i></div>
        <div>Core of our needs<br><i>Frank,  <br>All levels</i></div>
        <div>NVC Essentials in the workplace<br><i>Louise,  <br>All levels</i></div>
  </div>
    `,
    },

    {
      start: t('12:35'),
      end: t('14:05'),
      body: `Break for lunch (including time to cook and eat together)`,
    },
    {
      start: t('14:05'),
      end: t('16:05'),
      body: `<div class="d-flex justify-content-between">
        <div>Importance of needs (II)<br><i>Madga & Godfrey,  <br>All levels</i></div>
        <div>Gratitude<br><i>Irmtraud,  <br>All levels</i></div>
        <div>The four themes <br>of life<br><i>Frank,  <br>5 days +</i></div>
        <div>Conflict in the classroom<br><i>Louise,  <br>All levels</i></div>
      </div>`,
    },
    { start: t('16:05'), end: t('16:20'), body: `Break, including energisers` },
    { start: t('16:20'), end: t('17:05'), body: `Home Groups` },
    { start: t('17:05'), end: t('17:10'), body: `Back to plenary session` },
    {
      start: t('17:10'),
      end: t('17:30'),
      body: `Feedback of the day (harvesting)`,
    },
    {
      start: t('17:30'),
      end: t('17:40'),
      body: `Community session (logistics)`,
    },
    {
      start: t('17:40'),
      end: t('22:00'),
      body: `For all offerings (meditation, yoga, dance, movement)`,
    },
  ],
};

export default {
  day1,
  day2,
};
