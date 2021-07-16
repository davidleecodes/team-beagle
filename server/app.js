const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");
const notificationsRouter = require("./routes/notifications");
const messageRouter = require("./routes/message");
const paymentRouter = require("./routes/payment");
const reviewRouter = require("./routes/review");
const { json, urlencoded } = express;
const cors = require("cors");
const { appSocket } = require("./socket/index");

connectDB();
const app = express();
const server = http.createServer(app);

//socket initialization
appSocket(server);

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  const corsWhitelist = [
    "http://localhost:3001",
    "https://hatchway-team-beagle.herokuapp.com",
  ];
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  next();
});

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/request", requestRouter);
app.use("/profile", profileRouter);
app.use("/notifications", notificationsRouter);
app.use("/message", messageRouter);
app.use("/payment", paymentRouter);
app.use("/review", reviewRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
