const express = require('express');
const path = require('path');
const routes = require('./routes/routes');

const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/yalantis');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(routes);

app.use((req, res, next) => {
    res.status(404).end('Not found');
})

app.use((err, req, res, next) => {
    res.json(err);
});

app.listen(3000, () => console.log('Listening port 3000...'));