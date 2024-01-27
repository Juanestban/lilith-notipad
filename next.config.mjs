import * as env from 'dotenv';

import connect from './config/mongoose.mjs';

env.config();
connect();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGODB_ATLAS_USERNAME: process.env.MONGODB_ATLAS_USERNAME,
    MONGODB_ATLAS_PASSWORD: process.env.MONGODB_ATLAS_PASSWORD,
    JWT_PASSWORD: process.env.JWT_PASSWORD,
  },
};

export default nextConfig;
