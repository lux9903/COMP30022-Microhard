const pdfRouter = require('express').Router();
const mongoose = require('mongoose');
const auth = require('./authRouter');

const pdfController = require('../controllers/pdfController');

const {upload} = pdfController;

const Pdf = require('../models/pdfModel');

const User = mongoose.model('User');

// : /api/pdf

// upload a single pdf to the database :/upload
pdfRouter.post(
  '/upload/:title',
  auth.optional,
  pdfController.upload.single('file'),
  (req, res) => {
    User.findById(req.payload.id).then(function (user) {
      console.log(req.name);
      const pdf = new Pdf();
      pdf.user = user;
      pdf.fileId = req.file.id;
      pdf.originalName = req.file.originalname;
      pdf.filename = req.file.filename;
      const date = new Date();
      const m = date.getMonth() + 1;
      pdf.date = date.getDate() + "/" + m + "/" + date.getFullYear();
      pdf.title = req.params.title;
      pdf.save();
      return res.send(pdf.fileId);
    });
  }
);

pdfRouter.post('/upload', auth.optional, (req, res) => {
  console.log(req.file.id);
});

// get all pdf of an user :/
pdfRouter.get('/', auth.optional, (req, res) => {
  pdfController.getAllPdf(req, res);
});

// get one image by filename :/:filename
pdfRouter.get('/:filename', auth.optional, (req, res) => {
  pdfController.getOnePdf(req, res);
});

// delete image by filename /: filename
pdfRouter.delete('/:id', auth.optional, (req, res) => {
  pdfController.deletePdf(req, res);
});

pdfRouter.post('/title/:id',auth.optional, (req,res) =>{
  pdfController.updateTitle(req,res);
});
module.exports = pdfRouter;
