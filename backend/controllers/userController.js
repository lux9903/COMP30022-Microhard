const mongoose = require('mongoose');
const User = mongoose.model('User');

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

const addUser = (req,res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
};
module.exports = {
    getUser,
    addUser,
}