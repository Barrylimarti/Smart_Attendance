module.exports = {
  Query: {},
  Mutation: {
    async testingRegisterStudent(_, { courseID }) {
      try {
        for (i = 0; i < 10; i++) {
          const password = "123";
          const hashedPassword = await bcrypt.hash(password, 12);

          const newPerson = new Person({
            firstName: "Student FN " + i,
            lastName: "Student LN " + i,
            email: "Student" + i + "@gmail.com",
            cardID: "A17CS0022",
            password: hashedPassword,
            userLevel: 0,
          });
          await newPerson.save();
          const course = await Course.findOne({ shortID: courseID });

          course.enrolledStudents.push(newPerson._id);
          course.save();
        }
        return "Create 50 student";
      } catch (err) {
        throw err;
      }
    },
    //TODO:/*Test*/
    async testingCreateCourse(_, __, context) {
      const currUser = checkAuth(context);
      let errors = {};

      try {
        if (currUser.userLevel !== 1) {
          errors.general =
            "The user is not a lecturer but want to create course!";
          throw new UserInputError(
            "The user is not a lecturer but want to create course!",
            { errors }
          );
        }
        for (i = 0; i < 50; i++) {
          let existingShortID;
          let id;
          do {
            id = shortid.generate();
            existingShortID = await Course.find({ shortID: id });
          } while (existingShortID.length > 0);
          const newCourse = new Course({
            shortID: "Course_" + id,
            creator: currUser._id,
            code: i + " SCSV2013",
            name: i + " Graphic",
            session: "20192020-01",
          });
          await newCourse.save();
        }
        return "Create 50 Course...";
      } catch (err) {
        throw err;
      }
    },
    //TODO:/*Test*/
    async testingDeleteAllCourse(_, __, context) {
      const currUser = checkAuth(context);
      let errors = {};

      try {
        if (currUser.userLevel !== 1) {
          errors.general =
            "The user is not a lecturer but want to delete course!";
          throw new UserInputError(
            "The user is not a lecturer but want to delete course!",
            { errors }
          );
        }

        await Course.deleteMany({ create: currUser._id });

        return "CDelete 50 Course...";
      } catch (err) {
        throw err;
      }
    },
  },
  async obtainStudentWarning(_, { participantID, courseID }, context) {
    const currUser = checkAuth(context);
    let errors = {};
    try {
      const warning = await Warning.findOne({
        student: participantID,
        course: courseID,
      });

      if (!warning) return 0;
      else return warning.count;
    } catch (err) {
      throw err;
    }
  },
  
};
