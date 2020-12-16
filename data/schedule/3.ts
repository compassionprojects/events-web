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

export default [
  // Day 1
  {
    startDate: moment(`2020-12-18T05:30:00+02:00`),
    startDateFormatted: moment(`2020-12-18T05:30:00+02:00`)
      .tz(tzName)
      .format('dddd, MMMM Do YYYY z'),
    schedule: [
      {
        start: t('05:00'),
        end: t('06:15'),
        body: `Opening session (settling, logistics and remembering)`,
      },
      { start: t('06:15'), end: t('06:30'), body: `Break`, type: 'break' },
      {
        start: t('06:30'),
        end: t('08:00'),
        body: `<div class="d-flex justify-content-between">
          <div>Session 1 <br><i>Manasi, En&Hi</i><br>NVC- An Overview <br> एन.वी. सी. अहिंसक बोली, <br> सोच, और जुड़ाव<br>
          </div>
          <div>Session 2 <br><i>Hemma,</i><br>The Making of Our Lives
          </div>
          <div>Session 3 <br><i>Ramanusha & Chris, En&Ta</i><br>Hearing Yes behind the No
          </div>
    </div>`,
      },
      {
        start: t('08:00'),
        end: t('09:30'),
        body: `Break for lunch`,
        type: 'break',
      },
      {
        start: t('09:30'),
        end: t('11:30'),
        body: `<div class="d-flex justify-content-between">
          <div>Session 4 <br><i>Manasi, En&Hi</i><br>Self-Empathy <br>खुद के लिए समानभूति<br>
          </div>
          <div>Session 5 <br><i>Olga,</i><br>Why our empathy<br> sometimes falls flat
          </div>
          <div>Session 6 <br><i>Kate,</i><br>Postcards from the Heart
          </div>
    </div>`,
      },
      { start: t('11:30'), end: t('12:00'), body: `Break`, type: 'break' },
      {
        start: t('12:00'),
        end: t('14:00'),
        body: `<div class="d-flex justify-content-between">
          <div>Session 7 <br><i>Kanya,</i><br>Observation 1st<br>component of NVC<br>
          </div>
          <div>Session 8 <br><i>Yi Liu,</i><br>Role-play to deepen empathy<br>and dissolve enemy energy
          </div>
          <div>Session 9 <br><i>Olga,</i><br>Working with NVC<br> at systemic level<br> to increase connection<br>
          </div>
    </div>`,
      },
      {
        start: t('14:00'),
        end: t('14:15'),
        body: `Break`, type: 'break' },
      {
        start: t('14:15'),
        end: t('15:00'),
        body: `Feedback of the day (harvesting)`,
      },
    ],
  },
   // Day 2
  {
    startDate: moment(`2020-12-19T05:30:00+02:00`),
    startDateFormatted: moment(`2020-12-19T05:30:00+02:00`)
      .tz(tzName)
      .format('dddd, MMMM Do YYYY z'),
    schedule: [
      {
        start: t('05:30'),
        end: t('06:15'),
        body: `Opening session (logistics and remembering)`,
      },
      { start: t('06:15'), end: t('06:30'), body: `Break`, type: 'break' },
      {
        start: t('06:30'),
        end: t('08:00'),
        body: `<div class="d-flex justify-content-between">
          <div>Session 10 <br><i>Hemma,</i><br>Gratitude 
          </div>
          <div>Session 11 <br><i>Stefan and Kate,</i><br>Harvesting the Fight
          </div>
          <div>Session 12 <br><i>Ramanusha & Chris, En&Ta</i><br>Empathy @ home
          </div>
    </div>`,
      },
      {
        start: t('08:00'),
        end: t('09:30'),
        body: `Break for lunch`,
        type: 'break',
      },
      {
        start: t('09:30'),
        end: t('11:30'),
        body: `<div class="d-flex justify-content-between">
          <div>Session 13 <br><i>Manasi, En&Hi</i><br>Empathy <br>समानभूति / दूसरे को समझना<br>
          </div>
          <div>Session 14 <br><i>Ramanusha & Chris, En&Ta</i><br>Saying No <br>without losing relationship
          </div>
          <div>Session 15 <br><i>Kanya,</i><br>Receiving Feedback
          </div>
    </div>`,
      },
      { start: t('11:30'), end: t('12:00'), body: `Break`, type: 'break' },
      {
        start: t('12:00'),
        end: t('14:00'),
        body: `<div class="d-flex justify-content-between">
          <div>Session 16 <br><i>Manasi, En&Hi</i><br>Self-expression <br>अभिव्यक्ति<br>
          </div>
          <div>Session 17 <br><i>Sudha,</i><br>My Anger, My Friend
          </div>
          <div>Session 18 <br><i>Samuel,</i><br>Reflecting on Culture
          </div>
    </div>`,
      },
      {
        start: t('14:00'),
        end: t('14:15'),
        body: `Break`, type: 'break' },
      {
        start: t('14:15'),
        end: t('15:00'),
        body: `Feedback of the day (harvesting)`,
      },
    ],
  },
   // Day 3
  {
    startDate: moment(`2020-12-20T05:30:00+02:00`),
    startDateFormatted: moment(`2020-12-20T05:30:00+02:00`)
      .tz(tzName)
      .format('dddd, MMMM Do YYYY z'),
    schedule: [
      {
        start: t('05:30'),
        end: t('06:15'),
        body: `Opening session (logistics and remembering)`,
      },
      { start: t('06:15'), end: t('06:30'), body: `Break`, type: 'break' },
      {
        start: t('06:30'),
        end: t('08:00'),
        body: `<div class="d-flex justify-content-between">
          <div>Session 19 <br><i>Kanya</i><br>Requests<br>
          </div>
          <div>Session 20 <br><i>Stefan,</i><br>NVC Skills in Group Facilitation
          </div>
          <div>Session 21 <br><i>Ranjitha& Manasi, En&Hi</i><br>Open session
          </div>
    </div>`,
      },
      {
        start: t('08:00'),
        end: t('09:30'),
        body: `Break for lunch`,
        type: 'break',
      },
      {
        start: t('09:30'),
        end: t('11:30'),
        body: `<div class="d-flex justify-content-between">
          <div>Session 22 <br><i>Sudha,</i><br>Mourning and Forgiveness<br>
          </div>
          <div>Session 23 <br><i>Samuel,</i><br>My 'No go' Zones
          </div>
          <div>Session 24 <br><i>Jeannine</i><br>Power dynamics & NVC
          </div>
    </div>`,
      },
      { start: t('11:30'), end: t('12:00'), body: `Break`, type: 'break' },
      {
        start: t('12:00'),
        end: t('14:00'),
        body: `Closing session`,
      },
    ],
  },
]
