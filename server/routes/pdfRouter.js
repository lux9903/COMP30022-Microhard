const pdfRouter = require('express').Router();
const auth = require('./authRouter');
const mongoose = require('mongoose');

const pdfController = require('../controllers/pdfController');
const upload = pdfController.upload;

const Pdf = require('../models/pdfModel');
const User = mongoose.model('User');

// : /api/pdf

// upload a single pdf to the database :/upload
pdfRouter.post('/upload',auth.optional, pdfController.upload.single('file'), (req,res) => {
  User.findById(req.payload.id)
      .then(function (user) {
        const pdf = new Pdf(req.body);
        pdf.user = user;
        pdf.fileId = req.file.id;
        pdf.save();
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

      });
});

//get all pdf of an user :/
pdfRouter.get('/',auth.optional, (req,res)=>{
  pdfController.getAllPdf(req, res);
});

//get one image by filename :/:filename
pdfRouter.get('/:filename',auth.optional, (req, res) => {
  pdfController.getOnePdf(req, res);
});

// delete image by filename /: filename
pdfRouter.delete('/:id', auth.optional, (req, res) => {
	pdfController.deleteImage(req, res);
});

module.exports = pdfRouter;