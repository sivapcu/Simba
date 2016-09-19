var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

/**
 * Define the schema for User model
 * @type {[type]}
 */
var userSchema = mongoose.Schema({
    local : {
        email : String,
        password : String,
    },
    facebook : {
        id : String,
        token : String,
        email : String,
        name : String
    },
    twitter : {
        id : String,
        token : String,
        displayName : String,
        username : String
    },
    google : {
        id : String,
        token : String,
        email : String,
        name  : String
    }
});

// methods ======================
/**
 * Generating a Hash
 * @param  {[type]} password [description]
 * @return {[type]}          [description]
 */
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Checking if password is valid
 * @param  {[type]} password [description]
 * @return {[type]}          [description]
 */
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

/**
 * create the model for users and expose it to our app
 * @type {[type]}
 */
module.exports = mongoose.model('User', userSchema);
