const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/uploadfilestocloudnary", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection established");
  })
  .catch((error) => {
    console.log("error connecting", error);
  });
