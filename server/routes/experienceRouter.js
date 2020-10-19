const mongoose = require('mongoose');
const experienceRouter = require('express').Router();
const auth = require('./authRouter');

const Experience = require('../models/experienceModel');
const User = mongoose.model('User');

const experienceController = require('../controllers/experienceController');


experienceRouter.post('/create', auth.optional, (req,res)=>{
	experienceController.createExperience(req, res);
});


experienceRouter.get("/complete/:id",auth.optional, (req,res)=>{
	experienceController.completeExperience(req, res);
});

experienceRouter.get("/",auth.optional, async (req,res)=>{
	experienceController.getExperience(req, res);
});


experienceRouter.post('/update/:id', auth.optional, (req,res)=>{
	experienceController.updateExperience(req, res);
});

experienceRouter.delete('/:id',auth.optional, (req,res)=>{
    experienceController.deleteExperience(req, res);
});

module.exports = experienceRouter;