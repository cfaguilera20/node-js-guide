const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    },
});

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User {
//     constructor(username, email, cart, id) {
//         this.name = username;
//         this.email = email;
//         this.cart = cart;
//         this._id = id ? new ObjectId(id) : null;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
//         if (this._id) {
//             // Update the user
//             dbOp = db
//                 .collection('users')
//                 .updateOne({
//                     _id: this._id
//                 }, {
//                     $set: this
//                 });
//         } else {
//             dbOp = db.collection('users').insertOne(this);
//         }
//         return dbOp
//             .then(result => {
//                 console.log(result);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     addToCart(product) {
//         const cartProductIndex = this.cart.items.findIndex(cp => {
//             return cp.productId.toString() === product._id.toString();
//         });
//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];

//         if (cartProductIndex >= 0) {
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//         } else {
//             updatedCartItems.push({
//                 productId: new ObjectId(product._id),
//                 quantity: newQuantity
//             });
//         }
//         const updatedCart = {
//             items: updatedCartItems
//         };
//         const db = getDb();
//         return db
//             .collection('users')
//             .updateOne({
//                 _id: new ObjectId(this._id)
//             }, {
//                 $set: {
//                     cart: updatedCart
//                 }
//             });
//     }

//     getCart() {
//         const db = getDb();
//         const productsIds = this.cart.items.map(i => {
//             return i.productId;
//         });
//         return db
//             .collection('products')
//             .find({
//                 _id: {
//                     $in: productsIds
//                 }
//             })
//             .toArray()
//             .then(products => {
//                 return products.map(p => {
//                     return {
//                         ...p,
//                         quantity: this.cart.items.find(i => {
//                             return i.productId.toString() === p._id.toString();
//                         }).quantity
//                     }
//                 })
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     deleteItemFromCart(productId) {
//         const updatedCartItems = this.cart.items.filter(item => {
//             return item.productId.toString() !== productId.toString();
//         });

//         const db = getDb();
//         return db
//             .collection('users')
//             .updateOne({
//                 _id: new ObjectId(this._id)
//             }, {
//                 $set: {
//                     cart: {
//                         items: updatedCartItems
//                     }
//                 }
//             });
//     }

//     addOrder() {
//         const db = getDb();
//         return this.getCart()
//             .then(products => {
//                 const order = {
//                     items: products,
//                     user: {
//                         _id: new ObjectId(this._id),
//                         name: this.name,
//                     },
//                 };
//                 return db
//                     .collection('orders')
//                     .insertOne(order);
//             })
//             .then(result => {
//                 this.cart = {
//                     items: []
//                 };
//                 db
//                     .collection('users')
//                     .updateOne({
//                         _id: new ObjectId(this._id)
//                     }, {
//                         $set: {
//                             cart: {
//                                 items: []
//                             }
//                         }
//                     });
//             });
//     }

//     getOrders() {
//         const db = getDb();
//         return db
//             .collection('orders')
//             .find({
//                 'user._id': new ObjectId(this._id)
//             })
//             .toArray()
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     static findById(userId) {
//         const db = getDb();
//         return db
//             .collection('users')
//             .find({
//                 _id: new ObjectId(userId)
//             })
//             .next()
//             .then(User => {
//                 console.log(User);
//                 return User;
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     static deleteById(userId) {
//         const db = getDb();
//         return db
//             .collection('users').deleteOne({
//                 _id: new ObjectId(userId)
//             })
//             .then(result => {
//                 console.log('User deleted !');
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
// }

// module.exports = User;