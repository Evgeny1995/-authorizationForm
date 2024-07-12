export default {
    server: {
        proxy: {
            '/api': {
                target: 'http://test-works.pr-uni.ru',
                changeOrigin: false,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
        cors: false,
    }
}