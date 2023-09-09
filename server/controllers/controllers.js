const { Bookings } = require("../models");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Used sequlize methods to make the crud functionallity

const getBookings = async (req, res) => {
  try {
    const booking = await Bookings.findAll();
    res.json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const getPost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const post = await Posts.findOne({ where: { id: id } });
//     res.json(post);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

const createBooking = async (req, res) => {
  try {
    const values = req.body;
    const createdBooking = await Bookings.create(values);
    res.json(createdBooking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const sendEmail = async (req, res) => {
  const values = req.body;
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  const options = {
    from: `"Peter" ${process.env.USER_EMAIL}>`,
    to: values.email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: `<b>${values.name}</b><b>${values.location}</b>`,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    console.log("sent" + info.response);
  });
};

// const updatePost = async (req, res) => {
//   try {
//     let id = req.params.id;
//     const post = await Posts.update(req.body, { where: { id: id } });
//     res.json(post);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// const deletePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const post = await Posts.destroy({ where: { id: id } });
//     if (!post) {
//       return res.status(404).json({ message: "Post  dont exist" });
//     } else res.send("Post deleted");
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

module.exports = { createBooking, getBookings, sendEmail };
