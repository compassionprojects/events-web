module.exports = {
  async redirects() {
    return [
      {
        source: '/tickets',
        destination: '/course/2/tickets',
        permanent: true,
      },
      {
        source: '/signin',
        destination: '/en/signin',
        permanent: true,
      },
    ];
  },
};
