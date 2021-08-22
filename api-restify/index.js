const restify = require("restify");
const mongoose = require("mongoose");
const config = require("./config"); //create a config file if not found in the same directory
const rjwt = require("restify-jwt-community"); //for protected routes
// var CASAuthentication = require("cas-authentication");
const { cas, casClient } = require("./casAuth");
var session = require("restify-session");
// var MemoryStore = require("session-memory-store")(session);

const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser());

//Protected Routes
// server.use(rjwt({
//     secret: config.JWT_SECRET
// }).unless({
//     path: ['/auth']
// }));

server.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
  });
});

// server.use(casClient.core());

// session({
//   debug: true,
//   ttl: 2,
// });
// server.use(session.sessionManager);
// server.get("/sess", function (req, res, next) {
//   res.send({ success: true, session: req.session });
//   return next();
// });
const db = mongoose.connection;

db.on("error", (err) => console.log(err));

db.once("open", () => {
  require("./routes/users")(server);
  require("./routes/user_auth")(server);
  require("./routes/issues")(server);
  console.log(`server started on port ${config.PORT}`);
});
