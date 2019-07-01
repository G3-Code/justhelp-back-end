const express = require("express");
const router = express.Router();
const KindAct = require("../models/KindActsModel");
const { authenticate } = require("../auth/authenticate");

router.post("/", authenticate, async (req, res) => {
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

router.get("/:id", authenticate, async (req, res) => {
  try {
    const actId = req.params.id;
    const kindAct = await KindAct.findById(actId);
    if (kindAct) {
      res.status(200).json({ kindAct });
    } else {
      res.status(404).json({ message: "The requested act was not found." });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Sorry something went wrong while trying to retrieve the kind act."
    });
  }
});

router.get("/user/:id", authenticate, async (req, res) => {
  try {
    const userId = req.params.id;
    const kindAct = await KindAct.findByUserId(userId);
    if (kindAct) {
      res.status(200).json({ kindAct });
    } else {
      res.status(404).json({ message: "The requested act was not found." });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Sorry something went wrong while trying to retrieve the kind act."
    });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const kindActToUpdate = req.body;
    const actId = req.params.id;
    if (kindActToUpdate && actId) {
      const kindAct = await KindAct.update(actId, kindActToUpdate);
      res.status(200).json({ kindAct });
    } else {
      res.status(400).json({
        message:
          "The request body or parameter values is missing the kind act details."
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sorry something went wrong when adding a kind act!" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const actId = req.params.id;
    if (actId) {
      await KindAct.remove(actId);
      res.status(200).json({ message: "Kind Act deleted successfully" });
    } else {
      res.status(400).json({
        message: "The request parameter values is missing the kind act details."
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sorry something went wrong when adding a kind act!" });
  }
});

module.exports = router;
