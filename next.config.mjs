// next.config.mjs
import withLitSSR from '@lit-labs/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add your own config here
  reactStrictMode: true,
  swcMinify: true,
};

export default withLitSSR()(nextConfig);
