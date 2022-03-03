const getCourseList = async () => {
  return [
    {
      course_image: "abc.jpg",
      course_name: "test",
      description: "some test",
      course_for: "BEGINNER",
      rating: 2,
      duration: 6,
      remaining_time: 3,
    },
  ];
};

module.exports = getCourseList;
