const mongoose = require("mongoose");

const { Schema } = mongoose;

const savedLocationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: Date,
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  visitDate: {
    type: Date
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  comments: [
    {
      user: ObjectId,
      message: string,
      body: String,
      date: Date
    }
  ]
});

const SavedLocation = mongoose.model("SavedLocation", savedLocationSchema);
