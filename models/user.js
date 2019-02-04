const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id ? new ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the user
            dbOp = db
                .collection('users')
                .updateOne({
                    _id: this._id
                }, {
                    $set: this
                });
        } else {
            dbOp = db.collection('users').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            });
        }
        const updatedCart = {
            items: updatedCartItems
        };
        const db = getDb();
        return db
            .collection('users')
            .updateOne({
                _id: new ObjectId(this._id)
            }, {
                $set: {
                    cart: updatedCart
                }
            });

    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .find({
                _id: new ObjectId(userId)
            })
            .next()
            .then(User => {
                console.log(User);
                return User;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(userId) {
        const db = getDb();
        return db
            .collection('users').deleteOne({
                _id: new ObjectId(userId)
            })
            .then(result => {
                console.log('User deleted !');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = User;