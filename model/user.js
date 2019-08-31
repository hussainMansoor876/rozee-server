exports = module.exports = function (app, mongoose) {
    'use strict';
    let Schema = mongoose.Schema;

    let UserSchema = new Schema({

        fullName: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            trim: true
        },

        username: {
            type: String,
            unique: true,
            trim: true
        },


        password: {
            type: String,
            trim: true,
        },

        role: {
            type: Number,
            default: 0,
        },

    });
    app.db.model('User', UserSchema);
}