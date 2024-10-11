/** @type {import('next').NextConfig} */
console.log(
  "process.env.NEXT_PUBLIC_MOON_PAY_KEY",
  process.env.NEXT_PUBLIC_MOON_PAY_KEY
);
console.log(
  "process.env.NEXT_PUBLIC_WALLET_CONNECT_PJ_ID",
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PJ_ID
);
console.log("process.env.NEXT_PUBLIC_ENV", process.env.NEXT_PUBLIC_ENV);

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

    MOON_PAY_KEY: process.env.NEXT_PUBLIC_MOON_PAY_KEY,
    WALLET_CONNECT_PJ_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_PJ_ID,
    ENV: process.env.NEXT_PUBLIC_ENV,
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
