const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdfSchema = new Schema(
    {
    fileId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    },
    {timestamps: true });

mongoose.model('Pdf', pdfSchema)