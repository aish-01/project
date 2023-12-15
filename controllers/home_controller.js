const Post = require('../models/post');

module.exports.home = async function(req, res) {
   // try {
        // Use the promisified version of Post.find
     //   const posts = await Post.find({}).exec();

      //  return res.render('home', {
      //      title: "Codeial | Home",
          //  post: posts
       // });
    //} catch (err) {
     //   console.error("Error fetching posts:", err);
     //   return res.status(500).json({ error: "Internal Server Error" });
   // }
//};

try {
    // Use the promisified version of Post.find with populate
    const posts = await Post.find({}).populate('user').exec();
    console.log("hello ",posts);
    return res.render('home', {
        title: "Codeial | Home",
        posts: posts
    });
} catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).json({ error: "Internal Server Error" });
}
};