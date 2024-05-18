const express = require('express');
const app = express();
const port = 8000;
const loggingMiddleware = (req, res, next) => {
    const start = Date.now();
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    const myName = 'Sanjay';
    if (url === '/favicon.ico') {
        return next();
    }

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${timestamp}] ${myName} - ${method} ${url} - ${res.statusCode} - ${duration}ms`);
    });

    next();
};

app.use(loggingMiddleware);

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/test', (req, res) => {
    res.status(200).send('This is a test route');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
