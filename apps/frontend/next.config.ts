import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // ← NOVO (otimiza para Docker)
};

export default nextConfig;
