exports = module.exports = function (app, mongoose) {
    'use strict';
    let Schema = mongoose.Schema;

    let cvSchema = new Schema({

        candidateName: {
            type: String,
            trim: true
        },

        cvLink: {
            type: String,
            trim: true,
        },

    }, {timestamps: true});
    app.db.model('AllCVS', cvSchema);
}