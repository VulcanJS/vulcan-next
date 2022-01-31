// Get a cleaner path for the learn live tutorial
async function vnRedirects() {
  return [
    {
      source: "/learn",
      destination: "/learn/intro-offline",
      permanent: true,
      has: [
        {
          type: "host",
          value: "localhost",
        },
      ],
    },
    {
      source: "/learn",
      destination: "/learn/intro-online",
      permanent: true,
      has: [
        {
          type: "host",
          value: "vulcan-next",
        },
      ],
    },
    {
      source: "/vn/learn",
      destination: "/learn/intro-offline",
      permanent: true,
      has: [
        {
          type: "host",
          value: "localhost",
        },
      ],
    },
    {
      source: "/vn/learn",
      destination: "/learn/intro-online",
      permanent: true,
      has: [
        {
          type: "host",
          value: "vulcan-next",
        },
      ],
    },
  ];
}
async function vnRewrites() {
  return [
    {
      source: "/learn/:path*",
      destination: "/vn/learn/:path*",
    },
  ];
}

module.exports = { vnRewrites, vnRedirects };
