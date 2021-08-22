/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images : {
        domains : ['links.papareact.com', 'fakestoreapi.com'],
    },
    //to access environment variables on the client side
    env: {
        STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    },
}
