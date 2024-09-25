const User = require("../models/user");


module.exports.renderSignupForm = (req, res)=>{
    res.render("./users/signup.ejs");
};

module.exports.signup = async(req, res, next)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        // automatically login after signup
        req.login(registeredUser, (err) => {
            if(err){
                next(err);
            }
            req.flash("success", "Welcome to VentureStay!");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/users/signup");
    }
};

module.exports.renderLoginForm = (req, res)=>{
    res.render("./users/login.ejs");
};

module.exports.login = async(req ,res)=>{
    req.flash("success", "welcome back to VentureStay!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    })
};