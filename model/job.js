exports = module.exports = function (app, mongoose) {
    'use strict';
    let Schema = mongoose.Schema;

    let jobSchema = new Schema({
        jobTitle: {
            type: String,
            trim: true
        },

        jobDescription: {
            type: String,
            trim: true,
        },

        posterId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        createdAt: {
            type: Date,
            default: Date.now()
        },

        CVS: [{
            email: {
                type: String,
                trim: true
            },

            cvLink: {
                type: String,
                trim: true
            }
        }]

    });
    app.db.model('Job', jobSchema);
}