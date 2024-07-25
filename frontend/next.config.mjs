/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'i.ibb.co',
            port: '',
        }, 
        {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
        },  
        {
            protocol: 'https',
            hostname: 'cdn.pixabay.com',
            port: '',
        }, 
        {
            protocol: 'https',
            hostname: 'www.pexels.com',
            port: '',
        }, 
        {
            protocol: 'https',
            hostname: 'images.pexels.com',
            port: '',
        }, 
        {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
        }, 
        {
            protocol: 'https',
            hostname: 'source.unsplash.com',
            port: '',
        }, 
        {
            protocol: 'https',
            hostname: 'images.ctfassets.net',
            port: '',
        }]
        ,
    },
};

export default nextConfig;
