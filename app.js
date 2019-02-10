require('dotenv').config()

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorsController = require('./controllers/errorsController');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User
        .findOne()
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true
    })
    .then(result => {
        User
            .findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Carlos',
                        email: 'admin@cfaguilera.mx',
                        cart: {
                            items: []
                        }
                    });
                    user.save();
                }
            });
        app.listen(3000)
    })
    .catch(err => console.log(err));