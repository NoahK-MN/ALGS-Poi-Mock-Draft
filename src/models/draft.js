const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DraftSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    groups: {
        type: String,
        required: true
    },
    draftName: {
        type: String
    },
    draftResults : {
        type: Array,
        required: true
    }
});

const Draft = mongoose.model('Draft', DraftSchema);

module.exports = Draft;