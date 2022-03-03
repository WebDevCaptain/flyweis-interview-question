const Course = require("../models/course");

const getCourseList = async () => {
  try {
    const courses = await Course.find();
    return courses;
  } catch (err) {
    return [];
  }
};

module.exports = getCourseList;
