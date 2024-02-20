import * as env from 'dotenv';
import path from 'node:path';

import connect from './src/config/mongoose.mjs';

env.config({ path: path.resolve(process.cwd(), '.env.local') });
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
