const express = require("express");
const router = express.Router();
const KindAct = require("../models/KindActsModel");

router.post("/", async (req, res) => {
  try {
    const kindActToAdd = req.body;
    if (kindActToAdd) {
      const kindAct = await KindAct.add(kindActToAdd);
      res.status(201).json({ kindAct });
    } else {
      res
        .status(400)
        .json({ message: "The request body is missing the kind act details." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sorry something went wrong when adding a kind act!" });
  }
});

module.exports = router;
