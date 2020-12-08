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
        start: t('05:30'),
        end: t('06:15'),
        body: `Community session (settling and logistics)`,
      },
      { start: t('06:15'), end: t('06:30'), body: `Break`, type: 'break' },
      {
        start: t('06:30'),
        end: t('08:00'),
        body: `<div class="d-flex justify-content-between">
          <div>Session 1 <br><i>Manasi,</i><br>NVC- An Overview <br> एन.वी. सी. अहिंसक बोली, <br> सोच, और जुड़ाव<br>
          </div>
          <div>Session 2 <br><i>To Be Added<br></i>
          </div>
          <div>Session 3 <br><i>Ramanusha & Chris,</i><br>Hearing Yes behind the No
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
          <div>Session 4 <br><i>Manasi,</i><br>Self-Empathy <br>खुद के लिए समानभूति<br>
          </div>
          <div>Session 5 <br><i>Olga,</i><br>Why our empathy sometimes falls flat
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
          <div>Session 7 <br><i>Kanya,</i><br>Observation<br> 1st component of NVC<br>
          </div>
          <div>Session 8 <br><i>Yi Liu,</i><br>Role-play to deepen empathy<br> and dissolve enemy energy
          </div>
          <div>Session 9 <br><i>Olga,</i><br>Working with NVC at systemic level<br> to increase connection<br>
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
        body: `Community session (settling and logistics)`,
      },
      { start: t('06:15'), end: t('06:30'), body: `Break`, type: 'break' },
      {
        start: t('06:30'),
        end: t('08:00'),
        body: `<div class="d-flex justify-content-between">
          <div>Session 10 <br><i>TBA<br></i><br>
          </div>
          <div>Session 11 <br><i>Stefan and Kate,<br>Harvesting the Fight</i>
          </div>
          <div>Session 12 <br><i>Ramanusha & Chris,<br>Empathy @ home</i>
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
          <div>Session 13 <br><i>Manasi,<br>Empathy समानभूति / दूसरे को समझना</i><br>
          </div>
          <div>Session 14 <br><i>Ramanusha & Chris,<br>Saying No without losing relationship</i>
          </div>
          <div>Session 15 <br><i>Kanya,<br>Receiving Feedback</i>
          </div>
    </div>`,
      },
      { start: t('11:30'), end: t('12:00'), body: `Break`, type: 'break' },
      {
        start: t('12:00'),
        end: t('14:00'),
        body: `<div class="d-flex justify-content-between">
          <div>Session 16 <br><i>Manasi,<br>Self-expression अभिव्यक्ति</i><br>
          </div>
          <div>Session 17 <br><i>Sudha,<br>My Anger, My Friend</i>
          </div>
          <div>Session 18 <br><i>Samuel,<br>Reflecting on Culture</i>
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
        body: `Community session (settling and logistics)`,
      },
      { start: t('06:15'), end: t('06:30'), body: `Break`, type: 'break' },
      {
        start: t('06:30'),
        end: t('08:00'),
        body: `<div class="d-flex justify-content-between">
          <div>Session 19 <br><i>TBA<br></i><br>
          </div>
          <div>Session 20 <br><i>Stefan,<br>NVC Skills in Group Facilitation</i>
          </div>
          <div>Session 21 <br><i>TBA<br></i>
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
          <div>Session 22 <br><i>Sudha,<br>Mourning and Forgiveness</i><br>
          </div>
          <div>Session 23 <br><i>Samuel,<br>My 'No go' Zones</i>
          </div>
          <div>Session 24 <br><i>Jeannine<br>Power dynamics & NVC</i>
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