const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId =  mongodb.ObjectId;

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
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