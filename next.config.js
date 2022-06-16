/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  files:{
    watcherExclude:{
      "**/.git/objects/**": true,
      "**/node_modules/**": true
    }
  },
  images: {
    domains: [process.env.MYSQL_HOST,],
  },
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/node_modules/**": true
  }
}

module.exports = nextConfig
