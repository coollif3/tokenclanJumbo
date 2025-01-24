/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    REACT_APP_IMAGES_PATH: "/assets/images",
    NEXTAUTH_SECRET: "Wxh7ucB6n1ZpL2uSInvk/5Hl5WzgFFuPBhVfy0x6DG0U=",
  },
  output: "standalone",
  staticPageGenerationTimeout: 600,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
