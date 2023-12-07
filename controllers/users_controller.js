const User = require('../models/user');

module.exports.profile = async function (req, res) {
  try {
    if (req.cookies.user_id) {
      const user = await User.findById(req.cookies.user_id);
      
      if (user) {
        return res.render('user_profile', {
          title: 'User Profile',
          user: user
        });
      }
      
      return res.redirect('/users/sign-in');
    } else {
      return res.redirect('/users/sign-in');
    }
  } catch (err) {
    // Handle any errors that occur during the await operations
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};



//render the sign up page
module.exports.signUp = function(req,res){
   if(req.isAuthenticated()){
    return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codeial | Sign up"
    })
}

//render the sign in page
module.exports.signIn = function(req,res){
  if(req.isAuthenticated()){
   return res.redirect('/users/profile');
  }
    return res.render('user_sign_in',{
        title: "Codeial | Sign in"
    })
}

//get the sign up data
module.exports.create = async function (req, res) {
    try {
      if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
      }
  
      const existingUser = await User.findOne({ email: req.body.email });
      console.log(existingUser);
      if (!existingUser) {
        const newUser = await User.create(req.body);
        console.log(newUser);
        return res.redirect('/users/sign-in');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.log('Error:', err);
      return res.redirect('back');
    }
  };


//sign in and create a session for the user
module.exports.createSession = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.redirect('back');
    }

    if (user.password != req.body.password) {
      return res.redirect('back');
    }

    res.cookie('user_id', user.id);
    return res.redirect('/users/profile');
  } catch (err) {
    console.log('Error:', err);
    return res.redirect('back');
  }
};

module.exports.destroySession = function(req,res){
  req.logout(function(err){
  console.log(err);
  });
  console.log('loggedout successfully');
  return res.redirect('/');
}