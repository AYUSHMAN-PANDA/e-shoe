//decrypt the password
// see if email is valid and exists

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const user_auth = mongoose.model('user_auth');

exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await user_auth.findOne({
                email
            }); //get user by email

            //match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    resolve(user);
                } else {
                    //password didn't match
                    reject('Authentication failed')
                }
            });
        } catch (err) {
            //email not found
            reject('Authentication failed');
        }
    });
}