const express = require("express");
const router = express.Router();
const {
  getBookings,
  createBooking,
  updatePost,
  deletePost,
  getPost,
  sendEmail,
} = require("../controllers/controllers");

// Defining routes
router.get("/bookings", getBookings);
// router.get("/posts/:id", getPost);
router.post("/bookings", createBooking);
//router.post("/sendEmail", sendEmail);
// router.put("/posts/:id", updatePost);
// router.delete("/posts/:id", deletePost);

module.exports = router;
