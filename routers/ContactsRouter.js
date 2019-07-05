const express = require("express");
const router = express.Router();
const Contacts = require("../models/ContactsModel");
const { authenticate } = require("../auth/authenticate");

router.post("/", authenticate, async (req, res) => {
  try {
    console.log(`:: CONTACTS ROUTER :: POST ::`);
    const contactToAdd = req.body;
    if (contactToAdd) {
      const contacts = await Contacts.add(contactToAdd);
      res.status(201).json({ contacts });
    } else {
      res.status(400).json({
        message: "The contact to add is not available in the request body."
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Sorry, something went wrong!" });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const contacts = await Contacts.findById(req.params.id);
    console.log(`:: CONTACT GET ROUTER :: contact is ${contacts}`);
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({
      message:
        "There was an error while trying to retrieve the contact information."
    });
  }
});

router.get("/user/:id", authenticate, async (req, res) => {
  try {
    console.log(`:: CONTACTS ROUTER :: GET BY USER ID ::`);
    const contacts = await Contacts.findByUserId(req.params.id);
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({
      message:
        "There was an error while trying to retrieve the contact information."
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log(`:: CONTACTS ROUTER :: UPDATE - PUT USING CONTACTS ID ::`);
    const contactId = req.params.id;
    const contactToBeUpdated = req.body;
    if (contactId && contactToBeUpdated) {
      const isContact = await Contacts.findById(contactId);
      if (isContact) {
        const contacts = await Contacts.update(contactId, contactToBeUpdated);
        res.status(200).json({ contacts });
      } else {
        res.status(403).json({
          message: "Sorry, this contact does not exist in the database."
        });
      }
    } else {
      res.status(400).json({
        message: "Contact Id or contact info missing in the request."
      });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Sorry, something went wrong when trying to update the contact information."
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const contactId = req.params.id;
    console.log(`:: CONTACT ID IS :: ${contactId}`);
    const contact = await Contacts.findById(contactId);
    console.log(`:: CONTACT IS :: ${contact}`);
    if (contact) {
      const contacts = await Contacts.remove(contactId);
      res
        .status(200)
        .json({ message: "Contact successfully deleted.", contacts });
    } else {
      res.status(404).json({ message: "No such record available to delete." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Sorry something went wrong when trying to delete the contact."
    });
  }
});

module.exports = router;
