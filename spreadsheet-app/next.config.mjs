/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["gokapture.com"],
    },
    webpack(config, options) {
        return config;
    },
};

export default nextConfig;
