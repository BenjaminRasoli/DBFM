const express = require("express");
const cors = require("cors");
const db = require("./models");
const routes = require("./routes/routes");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.use(routes);

const port = 3003 || process.env.PORT;
db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("Server running on port 3003");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
