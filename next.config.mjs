/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "jmhkaornskbnzncwnraw.supabase.co",
            port: "",
          },
        ],
      },
};

export default nextConfig;
