const imageRouter = require('express').Router();
const auth = require('./authRouter');

const imageController = require('../controllers/imageController');

// : /image...

// upload a single photo to the database :/upload
imageRouter.post('/upload', imageController.upload.single('file'), (req,res) => {
  res.redirect('/image');
});

//get all image of an user :/
imageRouter.get('/', (req,res)=>{
  imageController.getAllImage(req, res);
});

// get one image by filename :/:filename
imageRouter.get('/:filename', (req, res) => {
  imageController.getOneImage(req, res);
});

module.exports = imageRouter;