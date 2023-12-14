const User = require("../models/user");

module.exports.signUpForm = (req, res) => {
    res.render("users/signup.ejs")
};

module.exports.signUp = async(req, res) => {
    try {
        let {username,email,password} = req.body;
        let newUser = new User({email,username});
        const regUser = await User.register(newUser,password);
        console.log(regUser);
        req.logIn(regUser,(err) => {
            if(err) {
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (error) {
        req.flash("error",error.message);
        res.redirect("/signup");
    }
};
module.exports.logInForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.logIn = async (req,res) => {
    req.flash("success","you have logged in!");
    res.redirect("/listings");
};

module.exports.logOut = (req, res, next) => {
    req.logOut((err)=>{
        if(err){
            next();
        }
        req.flash("success","you have logged out!");
        res.redirect("/listings");
    });
};