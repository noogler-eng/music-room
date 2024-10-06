/** @type {import('next').NextConfig} */
// image link "https://lh3.googleusercontent.com/a/ACg8ocIQrut1NND1RZTz0F6woM8ksplOg7315b9BoJ-Z23nKK8fuFrSg=s96-c"
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/*",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/qqHMIDvOMbI/*",
      },
    ],
  },
};

export default nextConfig;
