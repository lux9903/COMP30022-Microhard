const courseRouter = require('express').Router();
const auth = require('./authRouter');
const mongoose = require('mongoose');

const Course = require('../models/courseModel');
const User = mongoose.model('User');
var _ = require('underscore');
//1. create new course by given attribute
// 1) courseCode
// 2) courseName
// 3) description
// 4) state : default ongoing
// 5) related skills
// 6) grades: default Nah
// 7) external link to handbook
// 8) semenster/year             (year, enum(winter,summer,sem1,sem2))
// 9) core or not
// 10) xue fen 12.5 per level

courseRouter.post('/create/',auth.optional,(req,res)=>{
	User.findById(req.payload.id).then((user)=>{
		var course = new Course(req.body);
		course.user = user;
		course.save();
		return res.json(course);
	});
});


//2. edit exist course by various
// if found -> edit
// else -> return no such course

courseRouter.post('/:id',auth.optional,(req,res)=>{
	User.findById(req.payload.id).then(async (user)=>{
		const result = await Course.findOneAndUpdate({_id:req.params.id, user: user},req.body);
		const newOne = await Course.findOne({_id:req.params.id, user: user});
		if(newOne){
			return res.json(newOne);
		}else{
			return res.status(401).send('No such course.');
		}
		
	});
});
//3. get specific course by course id

courseRouter.get('/:id',auth.optional,(req,res)=>{
	User.findById(req.payload.id).then(async (user)=>{
		const course = await Course.findOne({_id:req.params.id, user: user});
		if(course){
			return res.json({"course":course});
		}else{
			return res.json({});
		}
	});
});

//4., get all course classified by sem

courseRouter.get('/',auth.optional,(req,res)=>{
	User.findById(req.payload.id).then(async (user)=>{
		const course = await Course.find({user:user});
		//console.log(_.groupBy(course,"year"));
		return res.json({"course":_.groupBy(course,"year")});
	})
});
//5. delete specific course

courseRouter.delete('/:id',auth.optional,(req,res)=>{
	User.findById(req.payload.id).then(async (user)=>{
		const result = await Course.findOneAndDelete({_id:req.params.id, user: user});
		return res.json({"deleteId":req.params.id});
	});
})

module.exports = courseRouter;