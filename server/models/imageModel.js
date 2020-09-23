const mongoose = require('mongoose');

const {Schema} = mongoose;

const imageSchema = new Schema(
  {
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {timestamps: true}
);

mongoose.model('Image', imageSchema);
