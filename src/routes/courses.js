const express = require("express");
const router = express.Router();

const enrollInCourse = require("../utils/enroll-course");
const getCourseList = require("../utils/get-course-list");

/*
5.All Courses {
  course image
  course name,
  description,

  course for 
  a) beginner
  b) advance

  rating,
  durations,
  remaining time for start the course
}
*/

router.get("/all-courses", async (req, res) => {
  try {
    const courseList = await getCourseList();
    res.send(courseList);
  } catch (err) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

/*
6.Enroll courses
*/

router.post("/enroll", async (req, res) => {
  const email = req.body.email;
  const courseId = req.body.courseId;

  if (!email || !courseId) {
    return res.status(400).json({
      error: "Please provide a valid email address and Course ID",
    });
  }

  try {
    await enrollInCourse(email, courseId);

    return res.status(201).json({
      message: "You are successfully enrolled.",
    });
  } catch (err) {
    return res.status(400).json({
      error: "Either payment is not processed or Course ID is incorrect",
    });
  }
});

/*
7. All Programs apis
*/
module.exports = router;
