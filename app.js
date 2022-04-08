var express = require("express");
var cookieParser = require("cookie-parser");
var path = require("path");
var apiRouter = require("./routes/apis");
const { client } = require("./db");
const { emitter } = require("./emitter");
const { ObjectId } = require("mongodb");

client.connect().then((_) => console.log("mongodb connected"));

var app = express();
var _ = require("express-ws")(app);


app.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

app.ws("/websocket", async (ws, req) => {
  emitter.on("data", async (id) => {
    // or else we can just share the last_location and car id to reduce a db call.
    let resp = await client
      .db()
      .collection("cars")
      .findOne({ _id: ObjectId(id) });
    ws.send(JSON.stringify(resp));
  });

  ws.on("open", () => ws.send("conection created"));

  // ws.on("message", (msg) => {
  //   console.log(msg);
  //   ws.send(msg);
  // });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

app.listen(3000, () => console.log("server started"));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// module.exports = { app };
