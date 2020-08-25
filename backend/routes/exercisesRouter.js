const exerciseRouter = require('express').Router();
const exerciseController = require('../controllers/exerciseController');
const auth = require('./authRouter');

exerciseRouter.get('/',auth,function (req,res){
	exerciseController.getExercise(req,res);
});

exerciseRouter.post('/add',function (req,res) {
	exerciseController.addExercise(req,res);
});

exerciseRouter.get('/:id', function(req, res){
  exerciseController.getExerciseByID(req,res);
});

exerciseRouter.delete('/:id', function(req, res) {
  exerciseController.deleteExerciseByID(req,res);
});

exerciseRouter.post('/update/:id', function (req, res){
  exerciseController.updateExerciseByID(req,res)
});


module.exports = exerciseRouter;