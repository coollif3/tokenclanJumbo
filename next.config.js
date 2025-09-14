/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    REACT_APP_IMAGES_PATH: "/assets/images",
    NEXTAUTH_SECRET: "Wxh7ucB6n1ZpL2uSInvk/5Hl5WzgFFuPBhVfy0x6DG0U=",
    NEXT_PUBLIC_CHATBOT_WEBHOOK_URL: process.env.NEXT_PUBLIC_CHATBOT_WEBHOOK_URL,
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
