const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");


const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//index route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  ); //create route after form submit

// router.post("/",upload.single("listing[image]"),(req, res) => {
//     res.send(req.file);
// })

router.get("/search",isLoggedIn,wrapAsync(listingController.search));

//create route
// imp to keep this before /listing/:id else new will be treated as id
router.get("/new", isLoggedIn, listingController.newForm);

router
  .route("/:id")
  //show route -> read
  .get(wrapAsync(listingController.showListings))
  //update route
  .put(isLoggedIn, isOwner,upload.single("listing[image]"), wrapAsync(listingController.editListing))
  //delete route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editForm)
);

module.exports = router;
