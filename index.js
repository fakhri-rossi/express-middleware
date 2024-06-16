const express = require('express');
const app = express();
const morgan = require('morgan');
const ErrorHandler = require('./ErrorHandler')

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

    throw new ErrorHandler('Perlu masukkan password', 401);
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

app.get('/error', (req, res) => {
    bird.fly();
});

app.get('/general/error', (req, res) => {
    throw new ErrorHandler();
});

// middleware error handler
// app.use((err, req, res, next) => {
//     console.log('**************');
//     console.log('*****Error****');
//     console.log('**************');
//     console.log(err.message);
//     // next(); // -> kalo mau next ke middleware selanjutnya
//     next(err); // -> kalo mau berhenti ke page error
// });
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})

// middleware page not found
app.use((req, res, next) => {
    res.status(404).send('Page not found');
}); 


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
