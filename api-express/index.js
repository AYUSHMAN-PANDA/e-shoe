const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const config = require("./config");
const { cas, casClient } = require("./casAuth");
const session = require("express-session");
const MemoryStore = require("session-memory-store")(session);
const mysecret = config.SESSION_SECRET;

app.use(
  session({
    secret: mysecret,
    store: new MemoryStore(),
    resave: true,
    saveUninitialized: true,
  })
);

// app.use(
//   cas.ssout("/"),
//   cas.serviceValidate(),
//   cas.authenticate(),
//   express.static(__dirname + "/public")
// );
// app.use(cas.ssout("/")).use(cas.serviceValidate()).use(cas.authenticate());

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
  });
});

//homepage
console.log(cas.configure());
app.get("/", function (req, res) {
  if (req.session.cas && req.session.cas.user) {
    return res.send(
      "<p>You are logged in. Your username is " +
        req.session.cas.user +
        '. <a href="/logout">Log Out</a></p>'
    );
  } else {
    return res.send(
      '<p>You are not logged in. <a href="/login">Log in now.</a><p>'
    );
  }
});

//cas login route
app.get(
  "/login",
  cas.serviceValidate(),
  cas.authenticate(),
  function (req, res) {
    // Great, we logged in, now redirect back to the home page.
    return res.redirect("/");
  }
);

//cas logout route
app.get("/logout", function (req, res) {
  console.log(
    "here: " + JSON.stringify(req.session.cas.attributes.Name, undefined, 3)
  );
  console.log(
    "here: " + JSON.stringify(req.session.cas.attributes.RollNo, undefined, 3)
  );
  if (req.session.destroy) {
    req.session.destroy();
    // req.ession = null;
    req.session = null;
  } else {
    req.session = null;
  }
  //res.redirect('/reviews.html')
  res.redirect("https://login.iiit.ac.in/cas/logout");
});

const db = mongoose.connection;

db.on("error", (err) => console.log(err));

db.once("open", () => {
  require("./routes/users")(app);
  require("./routes/user_auth")(app);
  require("./routes/issues")(app);
  console.log(`server started on port ${config.PORT}`);
});
