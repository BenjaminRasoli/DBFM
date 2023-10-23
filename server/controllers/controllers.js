const { Bookings } = require("../models");
const nodemailer = require("nodemailer");

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
    console.log(req);

    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    const options = {
      from: `"DATA BASE FOR MOVIES" ${process.env.USER_EMAIL}>`,
      to: values.email,
      subject: `Thanks for booking ${values.MovieName}`,
      text: "Hello world?",
      html: `<div style=background-color:grey;>  <h2>Thank you ${values.name} for booking  ${values.MovieName} <br/>  See you at ${values.location}</h2> <img src="cid:unique@nodemailer.com"/>
 </div>`,
      attachments: [
        {
          path: values.MovieImage,
          cid: "unique@nodemailer.com",
        },
      ],
    };
    transporter.sendMail(options, function (err, info) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      console.log("sent" + info.response);
    });
    const createdBooking = await Bookings.create(values);
    res.json(createdBooking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const sendEmail = async (req, res) => {
  const values = req.body;
  //   const transporter = nodemailer.createTransport({
  //     service: "hotmail",
  //     auth: {
  //       user: process.env.USER_EMAIL,
  //       pass: process.env.USER_PASS,
  //     },
  //   });

  //   const options = {
  //     from: `"DATA BASE FOR MOVIES" ${process.env.USER_EMAIL}>`,
  //     to: values.email,
  //     subject: `Thanks for booking ${values.MovieName}`,
  //     text: "Hello world?",
  //     html: `<b>${values.name}</b> <br /> <b>${values.location}</b>`,
  //   };
  // console.log(values)
  //   transporter.sendMail(options, function (err, info) {
  //     if (err) {
  //       return res.status(500).json({ message: err.message });
  //     }
  //     console.log("sent" + info.response);
  //   });
};

module.exports = { createBooking, getBookings, sendEmail };
