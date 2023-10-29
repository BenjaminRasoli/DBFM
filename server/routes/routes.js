const express = require("express");
const router = express.Router();
const { getBookings, createBooking } = require("../controllers/controllers");

router.get("/bookings", getBookings);
router.post("/bookings", createBooking);


module.exports = router;
