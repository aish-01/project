const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;



//authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email'
},
 async function(email,password,done){
    try{
        //find a user and establish the identity 
        const user= await User.findOne({email:email});

        if (!user || user.password !== password) {
            console.log('Invalid username/Password');
            return done(null, false);
          }
    
          return done(null, user);
        } catch (err) {
          console.log('Error in finding the user --> passport');
          return done(err);
        }
      }
    ));

    
//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    try {
      // find a user by ID
      const user = await User.findById(id);
  
      if (!user) {
        console.log('User not found');
        return done(null, false);
      }
  
      return done(null, user);
    } catch (err) {
      console.log('Error in finding the user --> passport');
      return done(err);
    }
  });

module.exports = passport;  