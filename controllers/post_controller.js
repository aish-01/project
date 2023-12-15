const Post = require('../models/post');

module.exports.create = async function(req, res) {
    console.log("First",req.cookies);
    console.log("Second",res.cookies);
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.cookies.user_id
        });

        return res.redirect('back');
    } catch (err) {
        console.log("Error in creating the post", err);
        return res.status(500).send("Internal Server Error");
    }
};  