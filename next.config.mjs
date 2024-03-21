/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "fumetest.s3.us-east-2.amazonaws.com",
        protocol: "https",
      },
    ],
  },
}
