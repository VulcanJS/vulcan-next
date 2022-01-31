module.exports = {
  siteUrl: "https://vulcan.next",
  generateRobotsTxt: true,
  //outDir: './out/', for static builds
  exclude: ["/vn/*", "/login", "/profile", "/signup", "/auth"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/vn/*", "/login", "/profile", "/signup", "/auth"],
      },
    ],
  },
};
