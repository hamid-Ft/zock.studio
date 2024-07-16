/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: "export",
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "https://images.unsplash.com",
			},
		],
	},
};
export default nextConfig;
