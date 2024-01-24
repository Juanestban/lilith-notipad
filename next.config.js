const env = require('dotenv');
const connect = require('./config/mongoose');

env.config();
connect();

const isProduction = process.env.NODE_ENV === 'production' || process.env.GITHUB_ACTIONS;
const basePath = isProduction ? '/lilith-notipad' : '/';
const assetPrefix = isProduction ? '/lilith-notipad/' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath,
  assetPrefix,
  env: {
    MONGODB_ATLAS_USERNAME: process.env.MONGODB_ATLAS_USERNAME,
    MONGODB_ATLAS_PASSWORD: process.env.MONGODB_ATLAS_PASSWORD,
    JWT_PASSWORD: process.env.JWT_PASSWORD,
  },
};

module.exports = nextConfig;
