const env = process.env.NODE_ENV;

const envs = {
  development: {
    1500: 'price_1HPQgRJz3cShRWny8CVEWQWm',
    240: 'price_1HRdBKJz3cShRWnyimWDkILg',
    1125: 'price_1HMiHFJz3cShRWnyRedFQnaA',
    500: 'price_1HMiGcJz3cShRWny3Sm6fRDd',
    2800: 'price_1HMdnFJz3cShRWnyGxfTXeUh',
  },
  production: {
    1500: 'price_1HRIA9Jz3cShRWnyiPFM8L4K',
    240: 'price_1HRf17Jz3cShRWnytulE9oa7',
    1125: 'price_1HRIARJz3cShRWnyol7cSwzD',
    500: 'price_1HRIAYJz3cShRWnyhKl1j8xk',
    2800: 'price_1HRIAoJz3cShRWnyVdSBXFFG',
  },
};

export default {
  price: envs[env][240],
  amount: 240,
  quantity: 1,
  description: 'NVC Follow-up sessions with CNVC certified trainers',
  details: `This optional follow-up programme from December 2020 to July 2021 allows you to join eight monthly telephone mentoring consultations with a CNVC certified trainer.

Each session lasts for two hours, and is designed to support and encourage management of learning, maximise your potential, develop skills and improve performance.

In English with Irmtraud Kauschat, or in French with Magdalena Sendor.
      `,
};
