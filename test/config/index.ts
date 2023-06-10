const config = () => {
    const port = 8080;
    return {
        port,
        baseUrl: `http://0.0.0.0:${port}`,
    } as const;
};

export default config;
