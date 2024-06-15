const express = require('express');
const app = express();
const morgan = require('morgan');

// app.use(morgan('tiny'));
app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log('Midlleware pertama');
    next();
    console.log('Midlleware setelah pertama');
});

app.use((req, res, next) => {
    console.log('Midlleware Kedua');
    next();
});

app.get('/', (req, res) => {
   res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
