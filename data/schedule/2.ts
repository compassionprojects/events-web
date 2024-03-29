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

export default function schedule(locale) {
  moment.locale(locale);

  return [
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
          body: `Community session (settling and logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:45'),
          end: t('10:05'),
          body: `[Remembering](https://drive.google.com/file/d/1QWk0NyPzxmTTpZ_2AMOJ8SpmB1rO9tZV/view) and feedback linked to the Remembering - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('10:05'),
          end: t('10:20'),
          body: `Coming back together - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        { start: t('10:20'), end: t('10:35'), body: `Break`, type: 'break' },
        {
          start: t('10:35'),
          end: t('12:35'),
          body: `Introduction to the VIC - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('12:35'),
          end: t('14:05'),
          body: `Break for lunch (including time to cook and eat together)`,
          type: 'break',
        },
        {
          start: t('14:05'),
          end: t('16:05'),
          body: `<div class="d-flex justify-content-between">
          <div>Session option 1 <br><i>Magdalena,<br>Beginners Track</i><br>
            <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
          </div>
          <div>Session option 2 <br><i>Matthew<br></i>
          <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a>
          </div>
          <div>Session option 3 <br><i>Nic<br></i>
          <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a>
          </div>
    </div>`,
        },
        { start: t('16:05'), end: t('16:20'), body: `Break`, type: 'break' },
        {
          start: t('16:20'),
          end: t('17:05'),
          body: `[Home Groups](https://drive.google.com/file/d/1A1fXes5DX9GuB0cE10BDhbF3Du2bw0_a/view) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:05'),
          end: t('17:10'),
          body: `Back to plenary session - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:10'),
          end: t('17:30'),
          body: `Feedback of the day (harvesting) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:30'),
          end: t('17:40'),
          body: `Community session (logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:40'),
          end: t('18:00'),
          body: `Trainers meeting, from participant requests to offerings - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('18:00'),
          end: t('20:00'),
          body: `<div class="d-flex justify-content-between">
  <div>Session option 1 <br><i>Matthew<br></i>(Optional)<br>
  <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
  </div>
  <div>Session option 2 <br><i>Nic<br> </i>(Optional)<br>
  <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a>
  </div>
</div>
  `,
        },
        {
          start: t('18:00'),
          end: t('21:00'),
          body: `For all other offerings (meditation, workshops, yoga, dance, movement, ...) - [zoom link](https://bit.ly/2UnO7GC)`,
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
          body: `For all proposals (meditation, yoga, dance, movement) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:30'),
          end: t('09:45'),
          body: `Community session (settling and logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:45'),
          end: t('10:05'),
          body: `[Remembering](https://drive.google.com/file/d/1QWk0NyPzxmTTpZ_2AMOJ8SpmB1rO9tZV/view) and feedback linked to the Remembering - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('10:05'),
          end: t('10:20'),
          body: `Presentation of trainer offerings - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        { start: t('10:20'), end: t('10:35'), body: `Break`, type: 'break' },
        {
          start: t('10:35'),
          end: t('12:35'),
          body: `<div class="d-flex justify-content-between">
  <div>Session choice 1 <br><i>Magda, <br>Beginners Track</i><br>
  <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
  </div>
  <div>Session choice 2 <br><i>Genevieve<br>Parenting in NVC</i><br>
  <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a></div>
  <div>Session choice 3 <br><i>Lorna<br> Empathy at work</i><br>
  <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a></div></div>
</div>
  `,
        },
        {
          start: t('12:35'),
          end: t('14:05'),
          body: `Break for lunch (including time to cook and eat together)`,
          type: 'break',
        },
        {
          start: t('14:05'),
          end: t('16:05'),
          body: `<div class="d-flex justify-content-between">
          <div>Session choice 1 <br><i>Louise, <br>Beginners Track</i><br>
          <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a></div>
          <div>Session choice 2 <br><i>Godfrey<br>Fury! Rage! Helplessness...</i><br>
          <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a></div>
          <div>Session choice 3 <br><i>Ramanusha<br>Empathy at Home</i><br>
          <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a></div>
    </div>`,
        },
        { start: t('16:05'), end: t('16:20'), body: `Break`, type: 'break' },
        {
          start: t('16:20'),
          end: t('17:05'),
          body: `Home Groups - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:05'),
          end: t('17:10'),
          body: `Back to plenary session - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:10'),
          end: t('17:30'),
          body: `Feedback of the day (harvesting) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:30'),
          end: t('17:40'),
          body: `Community session (logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:40'),
          end: t('18:00'),
          body: `Trainers meeting, from participant requests to offerings - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('18:00'),
          end: t('20:00'),
          body: `<div class="d-flex justify-content-between">
  <div>Session choice 1 <br><i>Giorgos,<br> </i>(Optional)<br>Dialogues with our shame<br>
  <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a></div>
  <div>Session choice 2 <br><i>Thibault,<br> </i>(Optional)<br>NVC that works for all <br>
  <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a></div>
</div>
  `,
        },
        {
          start: t('18:00'),
          end: t('21:00'),
          body: `For all other offerings (meditation, workshops, yoga, dance, movement, ...) - [zoom link](https://bit.ly/2UnO7GC)`,
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
          body: `For all proposals (meditation, yoga, dance, movement) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:30'),
          end: t('09:45'),
          body: `Community session (settling and logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:45'),
          end: t('10:05'),
          body: `Remembering and feedback linked to the Remembering - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('10:05'),
          end: t('10:20'),
          body: `Presentation of trainer offerings - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        { start: t('10:20'), end: t('10:35'), body: `Break`, type: 'break' },
        {
          start: t('10:35'),
          end: t('12:35'),
          body: `<div class="d-flex justify-content-between">
  <div>Session Choice 1 <br><i>Magda, <br>Beginners Track<br>From judging myself to making powerful request to myself <br>(or others)</i><br>
  <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a></div>
  <div>Session Choice 2 <br><i>Irmtraud<br>(White) fragility versus empathic responsibility (part 1)</i><br>
  <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a></div>
  <div>Session Choice 3 <br><i> Frank<br>Mr. Rosenberg and the coffee cup</i><br>
  <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a></div>
</div>
  `,
        },
        {
          start: t('12:35'),
          end: t('14:05'),
          body: `Break for lunch (including time to cook and eat together)`,
          type: 'break',
        },
        {
          start: t('14:05'),
          end: t('16:05'),
          body: `<div class="d-flex justify-content-between">
          <div>Session Choice 1 <br><i>Louise, <br>Beginners Track<br>Slow-self empathy</i><br>
          <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a></div>
          <div>Session Choice 2 <br><i>Irmtraud<br>(White) fragility versus <br>empathic responsibility (part 2)</i><br>
          <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a></div>
          <div>Session Choice 3 <br><i> Frank<br>Dealing with monsters</i><br>
          <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a></div>
    </div>`,
        },
        { start: t('16:05'), end: t('16:20'), body: `Break`, type: 'break' },
        {
          start: t('16:20'),
          end: t('17:05'),
          body: `Home Groups - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:05'),
          end: t('17:10'),
          body: `Back to plenary session - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:10'),
          end: t('17:30'),
          body: `Feedback of the day (harvesting) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:30'),
          end: t('17:40'),
          body: `Community session (logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:40'),
          end: t('18:00'),
          body: `Trainers meeting, from participant requests to offerings - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('18:00'),
          end: t('20:00'),
          body: `<div class="d-flex justify-content-between">
  <div>Session Choice 1 <br><i>Godfrey<br> </i>(Optional)<br>Regrets<br>
  <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a></div>
  <div>Session Choice 2 <br><i>Nic<br> </i>(Optional)<br>Relax and unwind<br>
  <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a></div>
</div>
  `,
        },
        {
          start: t('18:00'),
          end: t('21:00'),
          body: `For all other offerings (meditation, workshops, yoga, dance, movement, ...) - [zoom link](https://bit.ly/2UnO7GC)`,
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
          type: 'break',
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
          body: `For all proposals (meditation, yoga, dance, movement) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:30'),
          end: t('09:45'),
          body: `Community session (settling and logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:45'),
          end: t('10:05'),
          body: `Remembering and feedback linked to the Remembering - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('10:05'),
          end: t('10:20'),
          body: `Presentation of trainer offerings - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        { start: t('10:20'), end: t('10:35'), body: `Break`, type: 'break' },
        {
          start: t('10:35'),
          end: t('12:35'),
          body: `<div class="d-flex justify-content-between">
          <div>Session Choice 1 <br>
          <i>Magdalena, <br>Interrupting - may I?</i><br>
          <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
          </div>
          <div>Session Choice 2 <br>
          <i>Irmtraud<br>Political correctness - authentic expression</i><br>
          <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a>
          </div>
          <div>Session Choice 3 <br><i> Frank and Louise<br>Fear vs Respect of Authority</i><br>
          <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a>
          </div>
        </div>`,
        },
        {
          start: t('12:35'),
          end: t('14:05'),
          body: `Break for lunch (including time to cook and eat together)`,
          type: 'break',
        },
        {
          start: t('14:05'),
          end: t('16:05'),
          body: `<div class="d-flex justify-content-between">
        <div>Session Choice 1 <br>
        <i>Louise, <br>Needs, Strategies and "Street NVC"</i><br>
        <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
        </div>
        <div>Session Choice 2 <br>
        <i>Irmtraud<br>Leadership - power with</i><br>
        <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a>
        </div>
        <div>Session Choice 3 <br><i> Frank<br>Feedback and Empathy skills</i><br>
        <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a>
        </div>
      </div>`,
        },
        { start: t('16:05'), end: t('16:20'), body: `Break`, type: 'break' },
        {
          start: t('16:20'),
          end: t('17:05'),
          body: `Home Groups - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:05'),
          end: t('17:10'),
          body: `Back to plenary session - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:10'),
          end: t('17:30'),
          body: `Feedback of the day (harvesting) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:30'),
          end: t('17:40'),
          body: `Community session (logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:40'),
          end: t('18:00'),
          body: `Trainers meeting, from participant requests to offerings - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('18:00'),
          end: t('20:00'),
          body: `<div class="d-flex justify-content-between">
  <div>About Certification <br><i>Irmtraud & Frank, <br> </i>Optional <br>
  <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a></div>
  <div>Session choice 2 <br><i>Godfrey, <br>Addictions<br> </i>(Optional)<br>
  <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a></div>
</div>
  `,
        },
        {
          start: t('18:00'),
          end: t('21:00'),
          body: `For all other offerings (meditation, workshops, yoga, dance, movement, ...) - [zoom link](https://bit.ly/2UnO7GC)`,
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
          body: `For all proposals (meditation, yoga, dance, movement) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:30'),
          end: t('09:45'),
          session: 1,
          body: `Community session (settling and logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:45'),
          end: t('10:05'),
          body: `Remembering and feedback linked to the Remembering - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('10:05'),
          end: t('10:20'),
          body: `Presentation of trainer offerings - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        { start: t('10:20'), end: t('10:35'), body: `Break`, type: 'break' },
        {
          start: t('10:35'),
          end: t('12:35'),
          session: 2,
          body: `<div class="d-flex justify-content-between">
          <div>Choice 1 <br>
          <i>Godfrey, <br>NVC's view on good manners</i><br>
          <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
          </div>
          <div>Choice 2 <br>
          <i>Irmtraud<br>Transforming old pain</i><br>
          <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a>
          </div>
          <div>Choice 3 <br>
          <i>Frank<br>Labels</i><br>
          <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a>
          </div>
        </div>`,
        },
        {
          start: t('12:35'),
          end: t('14:05'),
          body: `Break for lunch (including time to cook and eat together)`,
          type: 'break',
        },
        {
          start: t('14:05'),
          end: t('16:05'),
          session: 3,
          body: `<div class="d-flex justify-content-between">
        <div>Choice 1 <br>
        <i>Geneviève, <br>Identifying and transforming core beliefs</i><br>
        <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
        </div>
        <div>Choice 2 <br>
        <i>Irmtraud<br>Nonviolence, it's meaning and activism</i><br>
        <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a>
        </div>
        <div>Choice 3 <br>
        <i>Frank<br>The four themes of life</i><br>
        <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a>
        </div>
        <div>Choice 4 <br>
        <i>Louise<br>Sex, sexuality and consent</i><br>
        <a href="https://zoom.us/j/2595001016" target="_blank">zoom link</a>
        </div>
      </div>`,
        },
        { start: t('16:05'), end: t('16:20'), body: `Break`, type: 'break' },
        {
          start: t('16:20'),
          end: t('17:05'),
          session: 4,
          body: `Home Groups - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:05'),
          end: t('17:10'),
          body: `Back to plenary session- [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:10'),
          end: t('17:30'),
          session: 5,
          body: `Feedback of the day (harvesting) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:30'),
          end: t('17:40'),
          body: `Community session (logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:40'),
          end: t('18:00'),
          body: `Trainers meeting, from participant requests to offerings - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('18:00'),
          end: t('20:00'),
          session: 6,
          body: `<div class="d-flex justify-content-between">
          <div>Choice 1 <br>
          <i>Lev and Anish, <br>Men's circle</i><br>
          <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
          </div>
          <div>Choice 2 <br>
          <i>Ramanusha<br>Learning from our pain</i><br>
          <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a>
          </div>
          <div>Choice 3 <br>
          <i>Tamara<br>Women's circle</i><br>
          <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a>
          </div>
        </div>`,
        },
        {
          start: t('18:00'),
          end: t('21:00'),
          body: `For all other offerings (meditation, workshops, yoga, dance, movement, ...) - [zoom link](https://bit.ly/2UnO7GC)`,
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
          body: `For all proposals (meditation, yoga, dance, movement) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:30'),
          end: t('09:45'),
          session: 1,
          body: `Community session (settling and logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:45'),
          end: t('10:05'),
          body: `Remembering and feedback linked to the Remembering - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('10:05'),
          end: t('10:20'),
          body: `Presentation of trainer offerings - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        { start: t('10:20'), end: t('10:35'), body: `Break`, type: 'break' },
        {
          start: t('10:35'),
          end: t('12:35'),
          session: 2,
          body: `<div class="d-flex justify-content-between">
          <div>Choice 1 <br>
          <i>Magdalena <br>Dealing with guilt/shame concerning the past decision that you regret</i><br>
          <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
          </div>
          <div>Choice 2 <br>
          <i>Irmtraud<br>Mediation (part 1) - theory and demonstration</i><br>
          <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a>
          </div>
          <div>Choice 3 <br>
          <i>Frank<br>Mediation with children</i><br>
          <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a>
          </div>
        </div>`,
        },
        {
          start: t('12:35'),
          end: t('14:05'),
          body: `Break for lunch (including time to cook and eat together)`,
          type: 'break',
        },
        {
          start: t('14:05'),
          end: t('16:05'),
          session: 3,
          body: `<div class="d-flex justify-content-between">
          <div>Choice 1 <br>
          <i>Liv Larsson <br>From shame to vulnerability</i><br>
          <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
          </div>
          <div>Choice 2 <br>
          <i>Irmtraud<br>Mediation (part 2)</i><br>
          <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a>
          </div>
          <div>Choice 3 <br>
          <i>Frank<br>Judge and choose</i><br>
          <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a>
          </div>
        </div>`,
        },
        {
          start: t('16:05'),
          end: t('16:20'),
          body: `Break - [zoom link](https://bit.ly/2UnO7GC)`,
          type: 'break',
        },
        {
          start: t('16:20'),
          end: t('17:05'),
          session: 4,
          body: `Home Groups - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:05'),
          end: t('17:10'),
          body: `Back to plenary session - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:10'),
          end: t('17:30'),
          session: 5,
          body: `Feedback of the day (harvesting) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:30'),
          end: t('17:40'),
          body: `Community session (logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:40'),
          end: t('18:00'),
          body: `Trainers meeting, from participant requests to offerings - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('18:00'),
          end: t('20:00'),
          session: 6,
          body: `<div class="d-flex justify-content-between">
          <div>Choice 1 <br>
          <i>Godfrey (& Sharon?) <br>Inner and outer mediation</i><br>
          <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
          </div>
          <div>Choice 2 <br>
          <i>Matthew<br>NVC and spirituality</i><br>
          <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a>
          </div>
          <div>Choice 3 <br>
          <i>Natalia<br>Listening others with empathy (practice session)</i><br>
          <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a>
          </div>
        </div>`,
        },
        {
          start: t('18:00'),
          end: t('21:00'),
          body: `For all other offerings (meditation, workshops, yoga, dance, movement, ...) - [zoom link](https://bit.ly/2UnO7GC)`,
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
          body: `For all proposals (meditation, yoga, dance, movement) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:30'),
          end: t('09:45'),
          session: 1,
          body: `Community session (settling and logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:45'),
          end: t('10:05'),
          body: `Remembering and feedback linked to the Remembering - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('10:05'),
          end: t('10:20'),
          body: `Presentation of trainer offerings - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        { start: t('10:20'), end: t('10:35'), body: `Break`, type: 'break' },
        {
          start: t('10:35'),
          end: t('12:35'),
          session: 2,
          body: `<div class="d-flex justify-content-between">
          <div>Choice 1 <br>
          <i>Magdalena <br>She/he/[insert gender] is so needy</i><br>
          <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
          </div>
          <div>Choice 2 <br>
          <i>Irmtraud<br>Empathy for someone very ill who is afraid of dying</i><br>
          <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a>
          </div>
          <div>Choice 3 <br>
          <i>Matthew<br>NVC boundaries/rules when working with children</i><br>
          <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a>
          </div>
        </div>`,
        },
        {
          start: t('12:35'),
          end: t('14:05'),
          body: `Break for lunch (including time to cook and eat together)`,
          type: 'break',
        },
        {
          start: t('14:05'),
          end: t('16:05'),
          session: 3,
          body: `<div class="d-flex justify-content-between">
          <div>Choice 1 <br>
          <i>Frank <br>Punishment & Reward</i><br>
          <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
          </div>
          <div>Choice 2 <br>
          <i>Irmtraud<br>Sharing NVC - Introducing NVC</i><br>
          <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a>
          </div>
          <div>Choice 3 <br>
          <i>Godfrey<br>Loneliness</i><br>
          <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a>
          </div>
        </div>`,
        },
        { start: t('16:05'), end: t('16:20'), body: `Break`, type: 'break' },
        { start: t('16:20'), end: t('17:05'), body: `Home Groups` },
        { start: t('17:05'), end: t('17:10'), body: `Back to plenary session` },
        {
          start: t('17:10'),
          end: t('17:30'),
          session: 4,
          body: `Feedback of the day (harvesting) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:30'),
          end: t('17:40'),
          session: 5,
          body: `Community session (logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:40'),
          end: t('18:00'),
          body: `Break`,
          type: 'break',
        },
        {
          start: t('18:00'),
          end: t('21:00'),
          session: 6,
          body: `Community time - [zoom link](https://bit.ly/2UnO7GC)`,
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
          body: `For all proposals (meditation, yoga, dance, movement) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:30'),
          end: t('09:45'),
          session: 1,
          body: `Community session (settling and logistics) - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('09:45'),
          end: t('10:05'),
          body: `Remembering and feedback linked to the Remembering - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('10:05'),
          end: t('10:20'),
          body: `Trainer offerings - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        { start: t('10:20'), end: t('10:35'), body: `Break`, type: 'break' },
        {
          start: t('10:35'),
          end: t('12:35'),
          session: 2,
          body: `<div class="d-flex justify-content-between">
          <div>Choice 1 <br>
          <i>Irmtraud <br>Gratitude and expressing appreciation</i><br>
          <a href="https://zoom.us/j/99648483527" target="_blank">zoom link</a>
          </div>
          <div>Choice 2 <br>
          <i>Louise<br>Landing after the course</i><br>
          <a href="https://zoom.us/j/99371168739" target="_blank">zoom link</a>
          </div>
          <div>Choice 3 <br>
          <i>Magdalena<br>Working with big groups</i><br>
          <a href="https://zoom.us/j/92224089535" target="_blank">zoom link</a>
          </div>
          <div>Choice 4 <br>
          <i>Lev & Godfrey<br>Feedback / feedforward</i><br>
          <a href="https://zoom.us/j/2595001016" target="_blank">zoom link</a>
          </div>
        </div>`,
        },
        {
          start: t('12:35'),
          end: t('14:05'),
          body: `Break for lunch (including time to cook and eat together)`,
          type: 'break',
        },
        {
          start: t('14:05'),
          end: t('16:05'),
          session: 3,
          body: `First 10 minutes together and then to Home Groups - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        { start: t('16:05'), end: t('16:20'), body: `Break`, type: 'break' },
        {
          start: t('16:20'),
          end: t('17:40'),
          session: 4,
          body: `Harvesting - [zoom link](https://bit.ly/2UnO7GC)`,
        },
        {
          start: t('17:40'),
          end: t('19:30'),
          body: `Space for participants - [zoom link](https://bit.ly/2UnO7GC)`,
        },
      ],
    },
  ];
}
