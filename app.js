const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log('First middleware!');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('Second middleware!');
//     res.send('<h1>Assignment solved (almost!)</h1>');
// });

app.use('/users', (req, res, next) => {
    console.log('/users middleware');
    res.send('<h1>The middleware that handles just /users</h1>');
});

app.use('/', (req, res, next) => {
    console.log('/ middleware');
    res.send('<h1>The middleware that handles just /</h1>');
});

app.listen(3000);
