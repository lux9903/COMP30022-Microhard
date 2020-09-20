const mongoose = require('mongoose');
const experienceRouter = require('express').Router();
const auth = require('./authRouter');
const experienceController = require('../controllers/experienceController');

const Experience = require('../models/experienceModel');
const User = mongoose.model('User');

/*
experienceRouter.post('/create', auth.optional, (req,res)=>{
	User.findById(req.payload.id)
      .then(function (user) {
        
        const experience = new Experience();
        experience.start_date = new Date(req.body.start_date);
        experience.end_date = new Date(req.body.end_date);
        experience.user = user;
        experience.position = req.body.position;
        experience.company = req.body.company;
        experience.description = req.body.description;
        experience.state = "going";
        experience.save();
        return res.redirect("/");
      });
});
*/

experienceRouter.post('/create', auth.optional, (req,res, next)=> {
  experienceController.createExperience(req, res, next);

});


experienceRouter.get("/complete/:id",auth.optional, (req,res)=>{
	Experience.findOne({_id: req.params.id}).then(function(experience){
		if(!experience){
			return res.status(401).send('The experience does not exist.');
		}
		experience.end_date = new Date();
		experience.state = "end";
		return experience.save().then(function () {
            return res.json(experience);
        });

	})
});

experienceRouter.get("/",auth.optional, async (req,res)=>{
	User.findById(req.payload.id).then(async function(theuser){
		const experiences = await Experience.find({user:theuser._id});
		if(experiences){
			return res.send(experiences);
		}else{
			return res.send("no");
		}
	});
});


experienceRouter.post('/update/:id', auth.optional, (req,res)=>{
	User.findById(req.payload.id)
      .then(async function (user) {
        
        let experience = await Experience.findOne({_id:req.params.id})
        if(typeof req.body.start_date != 'undefined'){
        	experience.start_date = new Date(req.body.start_date);
        }
        if(typeof req.body.end_date != 'undefined'){
        	experience.end_date = new Date(req.body.start_date);
        }
        if(typeof req.body.position != 'undefined'){
        	experience.position = req.body.position;
        }
        if(typeof req.body.company != 'undefined'){
        	experience.company = req.body.company;
    	}
    	if(typeof req.body.description != 'undefined'){
        	experience.description = req.body.description;
        }
        return experience.save().then(function () {
                return res.json(experience);
            });
      });
});

module.exports = experienceRouter;