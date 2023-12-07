const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://aishwaryasenyadav:7FuwwlV26IRsTKQj@cluster0.wmzfusp.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open',function(){
    console.log('Successfully connected to the database');
});