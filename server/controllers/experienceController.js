const mongoose = require('mongoose');
const passport = require('passport');
const Experience = require('../models/experienceModel');

const User = mongoose.model('User');

const createExperience = (req, res, next) => {
  User.findById(req.payload.id)
    .then(function (user) {
      const experience = new Experience();
      experience.start_date = new Date(req.body.startdate);
      experience.end_date = new Date(req.body.enddate);
      experience.user = user;
      experience.position = req.body.position;
      experience.company = req.body.company;
      experience.description = req.body.description;
      experience.state = 'going';
      experience.save();
      return res.redirect('/');
    })
    .catch(next);
};

module.exports = {
  createExperience,
};
