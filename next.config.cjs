/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    productionBrowserSourceMaps: true,
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: true,
    },
};
