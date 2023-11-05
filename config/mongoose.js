const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://aishwaryasenyadav:Fl6WdeT1V6WHcrja@cluster0.wmzfusp.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open',function(){
    console.log('Successfully connected to the database');
});