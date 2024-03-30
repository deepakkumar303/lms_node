const express = require("express");
const app = express();
const multer = require("multer");
// const boom = require("@hapi/boom");
const bodyParser = require("body-parser");
const mongo = require("./system/db/mongo");
const errorHandler = require("./system/error/handler");
const logError = require("./system/middleware/log-error");
const userRoutes = require("./api/users/route");
const courseRoutes = require("./api/course/route");
const courseTopicRoutes = require("./api/courseTopic/route");
const categoryRoutes = require("./api/category/route");
const batchRoutes = require("./api/batch/route");
const cors = require("cors");

const axios = require("axios");


require("dotenv").config();

// const mailjet = require('node-mailjet').connect(
//   '6ffbcc5cffa9fdd9b5c6514d313baf7a',
//   '158fa1814b06c9a743886c3de20f2589'
// )

const Mailjet = require("node-mailjet");
const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

process.on("SIGINT", () => {
  console.log(
    "SIGINT signal received. Shutting down server (gracefully; maybe.)."
  );
  const cleanUp = () => {
    mongo.closeDbConn();
  };

  server.close(() => {
    console.log("Server shut down.");
    cleanUp();
    process.exit();
  });
  // Force close server after 4secs
  setTimeout((e) => {
    console.log("Forcing server to shut down.", e);
    cleanUp();
    process.exit(1);
  }, 4000);
});

app.use(cors());

// const corsOpts = {
//   origin: '*',

//   methods: [
//     'GET',
//     'POST',
//     'PUT',
//     'DELETE'
//   ],

//   allowedHeaders: [
//     'Content-Type',
//   ],
// };

// app.use(cors(corsOpts));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/api/get", (req, res) => res.send("Hello World test"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept ,authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept ,authorization"
    );
    return res.status(200).json({});
  }
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/course-topic", courseTopicRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/batch", batchRoutes);

app.use((req, res, next) => {
  // throw boom.notFound("Endpoint Not Found");
  res.send("Endpoint Not Found");
});

app.use(logError);
app.use(errorHandler.token);
app.use(errorHandler.validation);
app.use(errorHandler.all);

app.listen(process.env.PORT, () =>
  console.log("Example app listening on port 5000!")
);
