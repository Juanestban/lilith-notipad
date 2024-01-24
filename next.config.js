const env = require('dotenv');

env.config();

require('./config/mongoose');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: '/lilith-notipad',
  env: {
    MONGODB_ATLAS_USERNAME: process.env.MONGODB_ATLAS_USERNAME,
    MONGODB_ATLAS_PASSWORD: process.env.MONGODB_ATLAS_PASSWORD,
    JWT_PASSWORD: process.env.JWT_PASSWORD,
  },
};

module.exports = nextConfig;
