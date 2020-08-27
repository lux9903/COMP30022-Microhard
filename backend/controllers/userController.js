const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUser = (req, res) =>{
    User.find()
        .then(function (user){
        if (!user) {
            return res.sendStatus(401).send('The user does not exist.');
        }

        return res.json(user);
    })
    .catch(err => res.status(400).json('Error' + err));
};

const addUser = async (req, res) => {

    //check if email already exist
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exist');

    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    });

    newUser.save()
        .then(() => res.json(newUser))
        .catch(err => res.status(400).json('Error: ' + err));
};

const login = async (req,res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email or password is wrong')

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if (!validPass) return res.status(400).send("Incorrect password")

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
}
module.exports = {
    getUser,
    addUser,
    login
}