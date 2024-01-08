module.exports = {
  eslint: {
    dirs: ['app', 'components', 'utils'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'imgur.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.rashio.software',
        pathname: '**',
      }
    ],
  },
};
