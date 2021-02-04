module.exports = {
  siteUrl: 'https://vulcan.next',
  generateRobotsTxt: true,
  //outDir: './out/', for static builds
  exclude: ['/vns/*', '/login', '/profile', '/signup', '/admin', '/auth'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/vns/*', '/login', '/profile', '/signup', '/admin', '/auth'],
        //allow: ['/','/docs/*'],
      },
    ]
  }
}