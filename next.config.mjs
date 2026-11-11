/** @type {import('next').NextConfig} */
const nextConfig = {
  // Builds a static site into the "out" folder, so it can be hosted anywhere.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
