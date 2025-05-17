/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure webpack to properly handle file extensions
    webpack: (config) => {
        config.resolve.extensions = [".js", ".jsx", ".json", ".ts", ".tsx", ...config.resolve.extensions];
        return config;
    },
};

export default nextConfig;
