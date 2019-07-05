const express = require("express");
const router = express.Router();
const KindAct = require("../models/KindActsModel");
const { authenticate } = require("../auth/authenticate");

router.post("/", authenticate, async (req, res) => {
  try {
    console.log(`:::: IN KIND ACTS ROUTER ::::`);
    const kindActToAdd = req.body;
    console.log(`:::: KIND ACTS BODY IS :::: ${JSON.stringify(kindActToAdd)}`);
    if (kindActToAdd) {
      const acts = await KindAct.add(kindActToAdd);
      res.status(201).json({ acts });
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
    console.log(`:: KIND ACTS ROUTER :: GET BY KIND ACTS ID ::`);
    const actId = req.params.id;
    const acts = await KindAct.findById(actId);
    if (acts) {
      res.status(200).json({ acts });
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
    console.log(`:: KINDS ACT ROUTER :: GET BY USER ID ::`);
    const userId = req.params.id;
    const acts = await KindAct.findByUserId(userId);
    if (acts) {
      res.status(200).json({ acts });
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

router.get("/userhp/:id", authenticate, async (req, res) => {
  try {
    console.log(`:: KINDS ACT ROUTER :: GET BY USER ID FOR HOME PAGE ::`);
    const userId = req.params.id;
    const acts = await KindAct.findByUserIdForHP(userId);
    if (acts) {
      res.status(200).json({ acts });
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
    console.log(`:: KIND ACTS ROUTER :: UPDATE USING KIND ACTS ID ::`);
    const kindActToUpdate = req.body;
    const actId = req.params.id;
    if (kindActToUpdate && actId) {
      const acts = await KindAct.update(actId, kindActToUpdate);
      res.status(200).json({ acts });
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
    console.log(`:: KIND ACTS ROUTER :: DELETE USING KIND ACTS ID ::`);
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
