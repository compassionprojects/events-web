import moment from 'moment-timezone';

const timeZone = moment.tz.guess();
const timeZoneOffset = new Date().getTimezoneOffset();
const tzName = moment.tz.zone(timeZone).abbr(timeZoneOffset);

function t(time_in_cet) {
  const startDate = moment(`2020-11-13T${time_in_cet}+01:00`);
  return startDate.tz(tzName).format('HH:mm');
}

// Make sure the dates below are in CEST, the code will do its job in
// displaying it in local timezone of the user

export default [
  // Day 1
  {
    startDate: moment(`2020-11-13T09:30:00+02:00`),
    startDateFormatted: moment(`2020-11-13T09:30:00+02:00`)
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
        body: `[Remembering](https://drive.google.com/file/d/1QWk0NyPzxmTTpZ_2AMOJ8SpmB1rO9tZV/view) and feedback linked to the Remembering`,
      },
      {
        start: t('10:05'),
        end: t('10:20'),
        body: `[Coming back together](https://zoom.us/j/96235491106)`,
      },
      { start: t('10:20'), end: t('10:35'), body: `Break` },
      {
        start: t('10:35'),
        end: t('12:35'),
        body: `[Introduction to the VIC](https://zoom.us/j/96235491106)`,
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
          <div>Session option 1 <br><i>Magdalena,<br>Beginners Track</i></div>
          <div>Session option 2 <br><i>Matthew<br> </i></div>
          <div>Session option 3 <br><i>Nic<br> </i></div>
    </div>`,
      },
      { start: t('16:05'), end: t('16:20'), body: `Break` },
      { start: t('16:20'), end: t('17:05'), body: `Home Groups` },
      {
        start: t('17:05'),
        end: t('17:10'),
        body: `[Back to plenary session](https://zoom.us/j/96235491106)`,
      },
      {
        start: t('17:10'),
        end: t('17:30'),
        body: `[Feedback of the day](https://zoom.us/j/96235491106) (harvesting)`,
      },
      {
        start: t('17:30'),
        end: t('17:40'),
        body: `[Community session](https://zoom.us/j/96235491106) (logistics)`,
      },
      {
        start: t('17:40'),
        end: t('18:00'),
        body: `Trainers meeting, from participant requests to offerings - [zoom link](https://zoom.us/j/96235491106)`,
      },
      {
        start: t('18:00'),
        end: t('20:00'),
        body: `<div class="d-flex justify-content-between">
  <div>Session option 1 <br><i>Matthew<br> </i>(Optional)</div>
  <div>Session option 2 <br><i>Nic<br> </i>(Optional)</div>
</div>
  `,
      },
      {
        start: t('18:00'),
        end: t('22:00'),
        body: `For all other offerings (meditation, workshops, yoga, dance, movement, ...) - [zoom link](https://zoom.us/j/96235491106)`,
      },
    ],
  },

  // Day 2
  {
    startDate: moment(`2020-11-14T09:30:00+02:00`),
    startDateFormatted: moment(`2020-11-14T09:30:00+02:00`)
      .tz(tzName)
      .format('dddd, MMMM Do YYYY z'),
    schedule: [
      {
        start: t('07:30'),
        end: t('09:00'),
        body: `For all proposals (meditation, yoga, dance, movement)`,
      },
      {
        start: t('09:30'),
        end: t('09:45'),
        body: `Community session (settling and logistics)`,
      },
      {
        start: t('09:45'),
        end: t('10:05'),
        body: `[Remembering](https://drive.google.com/file/d/1QWk0NyPzxmTTpZ_2AMOJ8SpmB1rO9tZV/view) and feedback linked to the Remembering`,
      },
      {
        start: t('10:05'),
        end: t('10:20'),
        body: `Presentation of trainer offerings`,
      },
      { start: t('10:20'), end: t('10:35'), body: `Break` },
      {
        start: t('10:35'),
        end: t('12:35'),
        body: `<div class="d-flex justify-content-between">
  <div>Session option 1 <br><i>Magda, <br>Beginners Track</i></div>
  <div>Session option 2 <br><i>Genevieve<br> </i></div>
  <div>Session option 3 <br><i> TBA<br> </i></div>
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
          <div>Session option 1 <br><i>Louise, <br>Beginners Track</i></div>
          <div>Session option 2 <br><i>Godfrey<br> </i></div>
          <div>Session option 3 <br><i>TBA<br> </i></div>
    </div>`,
      },
      { start: t('16:05'), end: t('16:20'), body: `Break` },
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
        end: t('18:00'),
        body: `Trainers meeting, from participant requests to offerings`,
      },
      {
        start: t('18:00'),
        end: t('20:00'),
        body: `<div class="d-flex justify-content-between">
  <div>Session option 1 <br><i> <br> </i>Optional </div>
  <div>Session option 2 <br><i> <br> </i>Optional </div>
</div>
  `,
      },
      {
        start: t('18:00'),
        end: t('22:00'),
        body: `For all other offerings (meditation, workshops, yoga, dance, movement, ...)`,
      },
    ],
  },

  // Day 3
  {
    startDate: moment(`2020-11-15T09:30:00+02:00`),
    startDateFormatted: moment(`2020-11-15T09:30:00+02:00`)
      .tz(tzName)
      .format('dddd, MMMM Do YYYY z'),
    schedule: [
      {
        start: t('07:30'),
        end: t('09:00'),
        body: `For all proposals (meditation, yoga, dance, movement)`,
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
      { start: t('10:20'), end: t('10:35'), body: `Break` },
      {
        start: t('10:35'),
        end: t('12:35'),
        body: `<div class="d-flex justify-content-between">
  <div>Session option 1 <br><i>Magda, <br>Beginners Track</i></div>
  <div>Session option 2 <br><i>Irmtraud<br> </i></div>
  <div>Session option 3 <br><i> Frank<br> </i></div>
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
          <div>Session option 1 <br><i>Louise, <br>Beginners Track</i></div>
          <div>Session option 2 <br><i>Irmtraud<br> </i></div>
          <div>Session option 3 <br><i> Frank<br> </i></div>
    </div>`,
      },
      { start: t('16:05'), end: t('16:20'), body: `Break` },
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
        end: t('18:00'),
        body: `Trainers meeting, from participant requests to offerings`,
      },
      {
        start: t('18:00'),
        end: t('20:00'),
        body: `<div class="d-flex justify-content-between">
  <div>Session option 1 <br><i>Godfrey<br> </i>Optional </div>
  <div>Session option 2 <br><i>Nic<br> </i>(Optional)</div>
</div>
  `,
      },
      {
        start: t('18:00'),
        end: t('22:00'),
        body: `For all other offerings (meditation, workshops, yoga, dance, movement, ...)`,
      },
    ],
  },
  // Day 4
  {
    startDate: moment(`2020-11-16T09:30:00+02:00`),
    startDateFormatted: moment(`2020-11-16T09:30:00+02:00`)
      .tz(tzName)
      .format('dddd, MMMM Do YYYY z'),
    schedule: [
      {
        body: `Day Off`,
      },
    ],
  },
  // Day 5
  {
    startDate: moment(`2020-11-17T09:30:00+02:00`),
    startDateFormatted: moment(`2020-11-17T09:30:00+02:00`)
      .tz(tzName)
      .format('dddd, MMMM Do YYYY z'),
    schedule: [
      {
        start: t('07:30'),
        end: t('09:00'),
        body: `For all proposals (meditation, yoga, dance, movement)`,
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
      { start: t('10:20'), end: t('10:35'), body: `Break` },
      {
        start: t('10:35'),
        end: t('12:35'),
        body: `<div class="d-flex justify-content-between">
  <div>Session option 1 <br><i>Magda<br></i></div>
  <div>Session option 2 <br><i>Irmtraud<br> </i></div>
  <div>Session option 3 <br><i> Frank<br> </i></div>
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
          <div>Session option 1 <br><i>Louise<br> </i></div>
          <div>Session option 2 <br><i>Irmtraud<br> </i></div>
          <div>Session option 3 <br><i> Frank<br> </i></div>
    </div>`,
      },
      { start: t('16:05'), end: t('16:20'), body: `Break` },
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
        end: t('18:00'),
        body: `Trainers meeting, from participant requests to offerings`,
      },
      {
        start: t('18:00'),
        end: t('20:00'),
        body: `<div class="d-flex justify-content-between">
  <div>About Certification <br><i>Irmtraud & Frank, <br> </i>Optional </div>
  <div>Session option 2 <br><i>Godfrey, <br> </i>Optional </div>
</div>
  `,
      },
      {
        start: t('18:00'),
        end: t('22:00'),
        body: `For all other offerings (meditation, workshops, yoga, dance, movement, ...)`,
      },
    ],
  },
  // Day 6
  {
    startDate: moment(`2020-11-18T09:30:00+02:00`),
    startDateFormatted: moment(`2020-11-18T09:30:00+02:00`)
      .tz(tzName)
      .format('dddd, MMMM Do YYYY z'),
    schedule: [
      {
        start: t('07:30'),
        end: t('09:00'),
        body: `For all proposals (meditation, yoga, dance, movement)`,
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
      { start: t('10:20'), end: t('10:35'), body: `Break` },
      {
        start: t('10:35'),
        end: t('12:35'),
        body: `<div class="d-flex justify-content-between">
  <div>Session option 1 <br><i>Magda<br></i></div>
  <div>Session option 2 <br><i>Irmtraud<br> </i></div>
  <div>Session option 3 <br><i> Frank<br> </i></div>
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
          <div>Session option 1 <br><i>Louise<br> </i></div>
          <div>Session option 2 <br><i>Irmtraud<br> </i></div>
          <div>Session option 3 <br><i>Frank<br> </i></div>
    </div>`,
      },
      { start: t('16:05'), end: t('16:20'), body: `Break` },
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
        end: t('18:00'),
        body: `Trainers meeting, from participant requests to offerings`,
      },
      {
        start: t('18:00'),
        end: t('20:00'),
        body: `<div class="d-flex justify-content-between">
  <div>Session option 1 <br><i>Godfrey <br> </i>(Optional)</div>
  <div>Session option 2 <br><i>Ramanusha<br> </i>(Optional)</div>
</div>
  `,
      },
      {
        start: t('18:00'),
        end: t('22:00'),
        body: `For all other offerings (meditation, workshops, yoga, dance, movement, ...)`,
      },
    ],
  },
  // Day 7
  {
    startDate: moment(`2020-11-19T09:30:00+02:00`),
    startDateFormatted: moment(`2020-11-19T09:30:00+02:00`)
      .tz(tzName)
      .format('dddd, MMMM Do YYYY z'),
    schedule: [
      {
        body: `Day Off`,
      },
    ],
  },
  // Day 8
  {
    startDate: moment(`2020-11-20T09:30:00+02:00`),
    startDateFormatted: moment(`2020-11-20T09:30:00+02:00`)
      .tz(tzName)
      .format('dddd, MMMM Do YYYY z'),
    schedule: [
      {
        start: t('07:30'),
        end: t('09:00'),
        body: `For all proposals (meditation, yoga, dance, movement)`,
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
      { start: t('10:20'), end: t('10:35'), body: `Break` },
      {
        start: t('10:35'),
        end: t('12:35'),
        body: `<div class="d-flex justify-content-between">
  <div>Session option 1 <br><i>Magda, <br></i></div>
  <div>Session option 2 <br><i>Irmtraud, <br> </i></div>
  <div>Session option 3 <br><i> Frank, <br> </i></div>
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
          <div>Session option 1 <br><i>Liv Larsson, <br> </i></div>
          <div>Session option 2 <br><i>Irmtraud, <br> </i></div>
          <div>Session option 3 <br><i> Frank, <br> </i></div>
    </div>`,
      },
      { start: t('16:05'), end: t('16:20'), body: `Break` },
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
        end: t('18:00'),
        body: `Trainers meeting, from participant requests to offerings`,
      },
      {
        start: t('18:00'),
        end: t('20:00'),
        body: `<div class="d-flex justify-content-between">
  <div>Session option 1 <br><i>Godfrey, <br> </i>Optional </div>
  <div>Session option 2 <br><i>Nic Burnand, <br> </i>Optional </div>
</div>
  `,
      },
      {
        start: t('18:00'),
        end: t('22:00'),
        body: `For all other offerings (meditation, workshops, yoga, dance, movement, ...)`,
      },
    ],
  },
  // Day 9
  {
    startDate: moment(`2020-11-21T09:30:00+02:00`),
    startDateFormatted: moment(`2020-11-21T09:30:00+02:00`)
      .tz(tzName)
      .format('dddd, MMMM Do YYYY z'),
    schedule: [
      {
        start: t('07:30'),
        end: t('09:00'),
        body: `For all proposals (meditation, yoga, dance, movement)`,
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
      { start: t('10:20'), end: t('10:35'), body: `Break` },
      {
        start: t('10:35'),
        end: t('12:35'),
        body: `<div class="d-flex justify-content-between">
  <div>Session option 1 <br><i>Magda, <br></i></div>
  <div>Session option 2 <br><i>Irmtraud, <br> </i></div>
  <div>Session option 3 <br><i>Matthew, <br> </i></div>
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
          <div>Money pile <br><i>Louise, <br> </i></div>
          <div>Session option 2 <br><i>Irmtraud, <br> </i></div>
          <div>Session option 3 <br><i>Godfrey <br> </i></div>
    </div>`,
      },
      { start: t('16:05'), end: t('16:20'), body: `Break` },
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
        end: t('18:00'),
        body: `Break`,
      },
      {
        start: t('18:00'),
        end: t('21:00'),
        body: `Community time`,
      },
    ],
  },
  // Day 10
  {
    startDate: moment(`2020-11-22T09:30:00+02:00`),
    startDateFormatted: moment(`2020-11-22T09:30:00+02:00`)
      .tz(tzName)
      .format('dddd, MMMM Do YYYY z'),
    schedule: [
      {
        start: t('07:30'),
        end: t('09:00'),
        body: `For all proposals (meditation, yoga, dance, movement)`,
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
        body: `Explain the day`,
      },
      { start: t('10:20'), end: t('10:35'), body: `Break` },
      {
        start: t('10:35'),
        end: t('12:35'),
        body: `<div class="d-flex justify-content-between">
  <div>Landing after the course <br><i>Irmtraud, <br></i></div>
  <div>Landing after the course <br><i>Louise, <br> </i></div>
  <div>Session option 3 <br><i>Magdalena <br> </i></div>
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
        body: `Home Groups`,
      },
      { start: t('16:05'), end: t('16:20'), body: `Break` },
      { start: t('16:20'), end: t('17:40'), body: `Harvesting` },
      { start: t('17:40'), end: t('19:30'), body: `Space for participants` },
    ],
  },
];
