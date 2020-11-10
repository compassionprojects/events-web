const Mailchimp = require('mailchimp-api-v3');
const MD5 = require('md5.js');

module.exports = {
  subscribe,
  subscribe_api_endpoint,
};

const languages = {
  fr: 'Français',
  en: 'English',
};

function subscribe_api_endpoint(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  const { id, email, lang } = req.body;

  subscribe(id, email, lang)
    .then(function () {
      res.status(201).send();
    })
    .catch(function (err) {
      console.log(err);
      res.status(422).json({ error: err.toString() });
    });
}

function subscribe(id, email, lang) {
  const apiKey = process.env.MAILCHIMP_API_KEY;

  if (!apiKey) {
    throw new Error(
      'You are missing a `MAILCHIMP_API_KEY` environment variable'
    );
  }

  const mailchimp = new Mailchimp(apiKey);
  const hash = new MD5().update(email.toLowerCase()).digest('hex');
  return mailchimp.put(`/lists/${id}/members/${hash}`, {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      MMERGE14: languages[lang],
    },
  });
}
