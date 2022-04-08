var express = require("express");
const async = require("hbs/lib/async");
const { ObjectId } = require("mongodb");
const { client } = require("../db");
const { emitter } = require("../emitter");
var router = express.Router();

// var _ = require("express-ws")(router);

router.post("/heartbeat", async function (req, res, next) {
  let result;
  if (req.body.type === "station") {
    result = await client
      .db()
      .collection("stations")
      .updateOne(
        { _id: ObjectId(req.body.id) },
        { heartbeat: new Date(req.body.timestamp) }
      );
  } else if (req.body.type === "car") {
    result = await client
      .db()
      .collection("cars")
      .updateOne(
        { _id: ObjectId(req.body.id) },
        {
          $set: {
            heartbeat: new Date(req.body.timestamp),
            last_location: req.body.location,
          },
        }
      );
    emitter.emit("data", req.body.id);
  }

  res.send({ success: result?.acknowledged, updated: result?.modifiedCount });
});

router.get("/cars", async (req, res) => {
  res.send(await client.db().collection("cars").find().toArray());
});

router.post("/cars", async (req, res) => {
  res.send(await client.db().collection("cars").insertOne(req.body));
});

router.delete("/cars/:id", async (req, res) => {
  res.send(
    await client
      .db()
      .collection("cars")
      .deleteOne({ _id: ObjectId(req.params.id) })
  );
});

module.exports = router;
