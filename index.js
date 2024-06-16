const express = require('express');
const app = express();
const morgan = require('morgan');

// app.use(morgan('tiny'));
app.use(morgan('dev'));

// app.use((req, res, next) => {
//     console.log('Midlleware pertama');
//     next();
//     console.log('Midlleware setelah pertama');
// });

// app.use((req, res, next) => {
//     console.log('Midlleware Kedua');
//     next();
// });

app.use((req, res, next) => {
    // req.timeRequest = Date.now();
    console.log(req.method, req.url);
    next();
});

const auth = (req, res, next) => {
    const { password } = req.query;

    if(password === "tahususu"){
        next();
    }

    res.send('Perlu masukkan password');
};

app.get('/', (req, res) => {
    res.send('Hello, Guest!');
});

app.get('/user', auth, (req, res) => {
    res.send('Hello, User!');
});

app.get('/admin', auth, (req, res) => {
    res.send('Hello, Admin!');
});
    
app.use((req, res, next) => {
    res.status(404).send('Page not found');
}); 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
