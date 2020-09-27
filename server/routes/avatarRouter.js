const mongoose = require('mongoose');
const avatarRouter = require('express').Router();
const auth = require('./authRouter');
const imageController = require('../controllers/imageController');

const Image = mongoose.model('Image');
const User = mongoose.model('User');
const upload = imageController.upload;

// : /image...

// upload a single photo to the database :/upload


avatarRouter.post('/upload',imageController.upload.single('file'),auth.optional, (req,res) => {
    User.findById(req.payload.id)
        .then(function (user) {
            const image = new Image(req.body);
            image.filename = req.file.filename;
            image.originalName = req.file.originalname;
            image.user = user;
            image.fileId = req.file.id;
            image.type = 'avatar';
            image.save();
            return res.json(image);
        });
});

//get all image of an user :/
avatarRouter.get('/',auth.optional, (req,res)=>{
    imageController.getAvatar(req, res);
});




module.exports = avatarRouter;