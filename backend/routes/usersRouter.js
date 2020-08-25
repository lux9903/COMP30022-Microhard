const userRouter = require('express').Router();
const userController = require('../controllers/userController');

// get user information
userRouter.get('/', function(req,res){
	userController.getUser(req,res);
});

// add new user
userRouter.post('/add', function( req,res){
	userController.addUser(req,res)
});

module.exports = userRouter;