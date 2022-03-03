const express = require("express");
const router = express.Router();

const enrollInCourse = require("../utils/enroll-course");
const getCourseList = require("../utils/get-course-list");

const Course = require("../models/course");
const auth = require("../middleware/auth");

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
router.post("/enroll", auth, async (req, res) => {
  const email = req.user.email;
  const courseId = req.body.courseId;

  if (!courseId) {
    return res.status(400).json({
      error: "Please provide a valid Course ID",
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

// WARNING - For development purposes only route
// For creating dummy courses
if (process.env.NODE_ENV !== "production") {
  const faker = require("@faker-js/faker").default;

  router.get("/create-dummy-course", async (req, res) => {
    const course = new Course({
      course_image: `${faker.name.firstName()}.jpg`,
      course_name: `${faker.name.firstName()}`,
      description: `This is a dummy course created for testing`,
      course_for: "ADVANCED",
      rating: 2,
      duration: 6,
      remaining_time: 3,
    });

    try {
      await course.save();

      res.send({
        message: "Course created",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Something went wrong",
      });
    }
  });
}

/*
7. All Programs apis
*/
module.exports = router;
