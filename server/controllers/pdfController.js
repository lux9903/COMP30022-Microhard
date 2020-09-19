const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const Pdf = require('../models/pdfModel');

const User = mongoose.model('User');

// file transfer database
const conn = mongoose.createConnection(process.env.DATABASE);
let gfs;
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// connect to storage
const storage = new GridFsStorage({
  url: process.env.DATABASE,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({storage});

// get one Pdf by file name
const getOnePdf = (req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No PDF file exists',
      });
    }

    // Check if pdf
    if (file.contentType === 'application/pdf') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not a PDF',
      });
    }
  });
};

const getAllPdf = (req, res) => {
  User.findById(req.payload.id).then(function (user) {
    if (!user) {
      return res.sendStatus(401).send('The user does not exist.');
    }
    Pdf.find({user: user._id})
      .distinct('fileId')
      .then(function (pdf) {
        console.log(pdf);
        gfs.files.find({_id: {$in: pdf}}).toArray((err, files) => {
          if (!files || files.length === 0) {
            return res.json({
              files: false,
            });
          }
          files.map((file) => {
            if (file.contentType === 'application/pdf') {
              file.isPDF = true;
            } else {
              file.isPDF = false;
            }
          });
          const pdfObj = [];
          for (file of files) {
            if (file.isPDF) {
              pdfObj.push(file);
            }
          }
          return res.json({files: pdfObj});
        });
      });
  });
};

const deletePdf = (req, res) => {
  User.findById(req.payload.id).then(function (user) {
    if (!user) {
      return res.sendStatus(401).send('The user does not exist.');
    }

    Pdf.deleteOne({user: user._id, fileId: req.params.id}, (err) => {
      if (err) {
        return res.status(404).json({err: 'Relation does not exist'});
      }
      gfs.remove({_id: req.params.id, root: 'uploads'}, (err, gridsStore) => {
        if (err) {
          return res.status(404).json({err});
        }
      });
      return res.send(`Deleted${req.params.id}`);
    });
  });
};
module.exports = {
  upload,
  getOnePdf,
  getAllPdf,
  deletePdf,
};
