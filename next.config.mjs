// Set NEXT_PUBLIC_BASE_PATH=/portfolio-website when deploying under a GitHub Pages project path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
