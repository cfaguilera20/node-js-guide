require('dotenv').config()

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorsController = require('./controllers/errorsController');
const mongoConnect = require('./util/database.js').mongoConnect;
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
    User.findById('5c58975f20ee122f9aafd041').then(user => {
        req.user = new User(user.username, user.email, user.cart, user._id);
        next();
    }).catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

mongoConnect(() => {
    app.listen(3000);
});