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
    startDateFormatted: moment(`2020-11-13T05:30:00+02:00`)
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
          <div>Session 1 <br><i><br>Beginners Track</i><br>
          </div>
          <div>Session 2 <br><i><br></i>
          </div>
          <div>Session 3 <br><i>Nic<br></i>
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
          <div>Session 4 <br><i><br>Beginners Track</i><br>
          </div>
          <div>Session 5 <br><i>Matthew<br></i>
          </div>
          <div>Session 6 <br><i>Nic<br></i>
          </div>
    </div>`,
      },
      { start: t('11:30'), end: t('12:00'), body: `Break`, type: 'break' },
      {
        start: t('12:00'),
        end: t('14:00'),
        body: `<div class="d-flex justify-content-between">
          <div>Session 7 <br><i><br>Beginners Track</i><br>
          </div>
          <div>Session 8 <br><i><br></i>
          </div>
          <div>Session 9 <br><i>Nic<br></i>
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
    startDate: moment(`2020-11-14T09:30:00+02:00`),
    startDateFormatted: moment(`2020-11-14T09:30:00+02:00`)
      .tz(tzName)
      .format('dddd, MMMM Do YYYY z'),
    schedule: [
