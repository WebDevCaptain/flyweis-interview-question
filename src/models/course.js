const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course_image: {
    type: String,
    required: false,
  },
  course_name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
  },
  course_for: {
    type: String,
    enum: ["BEGINNER", "ADVANCED"],
    default: "BEGINNER",
  },
  rating: {
    type: Number,
    required: false,
  },
  duration: {
    type: Number,
    required: true,
  },
  remaining_time: {
    type: Number,
    required: false,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
