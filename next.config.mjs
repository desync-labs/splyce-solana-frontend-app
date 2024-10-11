/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_MOON_PAY_KEY: process.env.NEXT_PUBLIC_MOON_PAY_KEY,
    NEXT_PUBLIC_WALLET_CONNECT_PJ_ID:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PJ_ID,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    PROD_RPC_KEY_HELIUM: process.env.PROD_RPC_KEY_HELIUM,
  },
  async rewrites() {
    return [
      {
        source: "/api/prod-rpc-helius",
        destination: `https://mainnet.helius-rpc.com/?api-key=${process.env.PROD_RPC_KEY_HELIUM}`,
      },
    ];
  },
};

export default nextConfig;
