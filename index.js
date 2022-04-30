const express = require('express'),
    logger = require('morgan');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen( process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000, open http://localhost:3000/ in your browser');
});