const fileRouter = require('express').Router();
const auth = require('./authRouter');

const fileController = require('../controllers/fileController');

fileRouter.get('/', (req,res)=>{
  fileController.getAllFile(req, res);
});

fileRouter.get('/:filename', (req, res) => {
  fileRouter.getOneFile(req, res);
});

fileRouter.delete('/:id', (req,res)=>{
  fileRouter.deleteOneFile(req, res);
});

module.exports = fileRouter;