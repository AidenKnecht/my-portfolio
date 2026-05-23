/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Set by the configure-pages action for project pages (e.g. /my-portfolio).
  // Empty string when deploying to a user/org page (username.github.io).
  basePath: process.env.PAGES_BASE_PATH ?? "",
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
