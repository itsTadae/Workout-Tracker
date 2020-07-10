const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());

var mongoConfig = process.env.MONGODB_URI || "mongodb://localhost/workoutDB";
mongoose.connect(
  mongoConfig,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(5000);
