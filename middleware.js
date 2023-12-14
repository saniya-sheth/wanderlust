const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        // res.session.redirectURL = req.orignalURL;
        req.flash("error","You need to be logged in.");
        res.redirect("/login");
        return;
    }
    next();
};
module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error","You are not the owner of this listing.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
// module.exports.saveRedirectURL = (req, res, next) => {
//     if(req.session.redirectURL) {
//         res.locals.redirectURL = req.session.redirectURL;
//     }
//     next();
// }

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error","You did not create this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}