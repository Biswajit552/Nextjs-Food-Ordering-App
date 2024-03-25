/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "biswa-food-ordering.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
// module.exports = {
//   webpack: (config) => {
//     config.resolve.fallback = {
//       "mongodb-client-encryption": false ,
//       "aws4": false
//     };

//     return config;
//   }
