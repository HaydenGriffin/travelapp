const {
  Router
} = require("express");
const SavedLocation = require("../models/SavedLocation");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const savedLocationEntries = await SavedLocation.find();
    res.json(savedLocationEntries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const savedLocation = new SavedLocation(req.body);
    const insertedSavedLocation = await savedLocation.save();
    res.json(insertedSavedLocation);
  } catch (error) {
    next(error);
  }
});

module.exports = router;