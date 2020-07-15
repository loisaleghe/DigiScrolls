const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 50,
            required: true
        },
        slug: {
            type: String,
            unique: true,
            index: true,
            lowercase: true
        },
        content: {
            type: {},
            required: true,
            min: 10,
            max: 150
        },
        author: {
            type: Schema.Types.ObjectId, ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
