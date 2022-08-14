const contact_email = 'madhu@nomaddev.co';
const contact_name = 'Madhu';
const post_payment_questionaire = 'https://typeform.com/';

export default {
  payment_thank_you: `
  We are delighted to see that you registered using this email address **{{email_id}}**.

  If the email is not correct or you decide to use a different one to access the course platform, we invite you to send an email from the address you would like to use to <a href="mailto:${contact_email}?subject=VIC Email ID Correction">${contact_email}</a>.

  We asked for minimal information when booking so that you choose the best moment to fill in more details. Before the start of the course and when you have about 10 minutes free, we invite you to fill in the questionaire.

  <a href="${post_payment_questionaire}" target="_blank" class="btn btn-primary rounded-pill">Help us organise better</a> <a href="/" class="btn btn-link">Return to course info</a>

  We will send you an email a few days before the course begins so that you can prepare well. If you have any questions, feel free to contact us. Thank you and see you soon!`,
  contact_email,
  contact_name,
};
