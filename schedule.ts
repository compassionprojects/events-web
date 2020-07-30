import moment from 'moment-timezone';

const timeZone = moment.tz.guess();
const timeZoneOffset = new Date().getTimezoneOffset();
const tzName = moment.tz.zone(timeZone).abbr(timeZoneOffset);

function t(time_in_cest) {
  const startDate = moment(`2020-08-08T${time_in_cest}+02:00`);
  return startDate.tz(tzName).format('HH:mm');
}

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
  <div>Workshop choice 1<br>Beginner track</div>
  <div>Workshop choice 2<br>Social Change</div>
  <div>Workshop choice 3<br>Open to Requests</div>
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
      <div>Workshop choice 1</div>
      <div>Workshop choice 2</div>
      <div>Workshop choice 3</div>
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
    <div>Workshop choice 1</div>
    <div>Workshop choice 2</div>
    <div>Workshop choice 3</div>
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
        <div>Workshop choice 1</div>
        <div>Workshop choice 2</div>
        <div>Workshop choice 3</div>
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
