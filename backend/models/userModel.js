const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		requried: true,
		unique: true,
		trim: true,
		minlength: 3
	},
}, {
	timestamps:true,
});
mongoose.model('User', userSchema);
