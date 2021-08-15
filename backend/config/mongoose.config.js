const mongoose = require('mongoose');
const dbName = process.env.DB_NAME;

mongoose.connect("mongodb://localhost/" + dbName, {
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log("You successfully connected to the " + dbName + " database!")
	})
	.catch((err) => {
		console.log("There was an error connecting to the " + dbName + " database:");
		console.log(err);
	});