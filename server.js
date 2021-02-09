const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const app = express();

const localConnect = "mongodb://localhost/newinsightsDB";
const mongodbAtlasURL =
  "mongodb+srv://salman:Mongodb@7866@cluster0.geezf.mongodb.net/insights4allDB?retryWrites=true&w=majority";

app.use(express.json());

app.use(
  session({
    secret: "Salmankazi",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

mongoose.connect(mongodbAtlasURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

const courseSchema = new mongoose.Schema({
  image_add: String,
  course_name: String,
  course_desc: String,
  desc_1: String,
  desc_2: String,
  desc_3: String,
  desc_4: String,
  syll_1: String,
  syll_2: String,
  syll_3: String,
  syll_4: String,
  syll_5: String,
  syll_6: String,
  syll_7: String,
  syll_8: String,
  syll_9: String,

  price: Number,
  originalprice_1: Number,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: Number,
  subject: String,
  message: String,
});

userSchema.plugin(passportLocalMongoose);

const Course = mongoose.model("Course", courseSchema);
const User = mongoose.model("User", userSchema);
const Contact = mongoose.model("Contact", contactSchema);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/", function (req, res) {
//   Course.find({}, (err, courses) => {
//     res.render("home", {
//       courses,
//     });
//     if (err) {
//       console.log(err);
//     }
//   }).limit(4);
// });

// app.get("/allcourses", (req, res) => {
//   Course.find({}, (err, courses) => {
//     res.render("allcourses", {
//       courses,
//     });
//     if (err) {
//       console.log(err);
//     }
//   });
// });

// app.post("/newCourse", function (req, res) {
//   const course = new Course({
//     image_add: req.body.image_add,
//     course_name: req.body.course_name,
//     course_desc: req.body.course_desc,
//     originalprice_1: req.body.originalprice_1,
//     price: req.body.price,
//     desc_1: req.body.desc_1,
//     desc_2: req.body.desc_2,
//     desc_3: req.body.desc_3,
//     desc_4: req.body.desc_4,
//     syll_1: req.body.syll_1,
//     syll_2: req.body.syll_2,
//     syll_3: req.body.syll_3,
//     syll_4: req.body.syll_4,
//     syll_5: req.body.syll_5,
//     syll_6: req.body.syll_6,
//     syll_7: req.body.syll_7,
//     syll_8: req.body.syll_8,
//     syll_9: req.body.syll_9,
//   });

//   course.save(function (err) {
//     if (!err) {
//       res.redirect("adminhome");
//     }
//   });
// });

// app.get("/abc/:courseID", function (req, res) {
//   const requestCourseId = req.params.courseID;

//   Course.findOne({ _id: requestCourseId }, function (err, course) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("abc", {
//         course,
//       });
//     }
//   });
// });

// app.get("/newcourse", (req, res) => {
//   res.render("newCourse");
// });

// app.get("/editcourse/:courseID", (req, res) => {
//   const requestCourseId = req.params.courseID;
//   console.log(requestCourseId);

//   Course.findOne({ _id: requestCourseId }, function (err, course) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("editcourse", {
//         course,
//       });
//     }
//   });
// });

// app.post("/editcourse", (req, res) => {
//   const requestCourseId = req.body.course_id;
//   Course.findByIdAndUpdate(
//     { _id: requestCourseId },
//     {
//       image_add: req.body.image_add,
//       course_name: req.body.course_name,
//       course_desc: req.body.course_desc,
//       originalprice_1: req.body.originalprice_1,
//       price: req.body.price,
//       desc_1: req.body.desc_1,
//       desc_2: req.body.desc_2,
//       desc_3: req.body.desc_3,
//       desc_4: req.body.desc_4,
//       syll_1: req.body.syll_1,
//       syll_2: req.body.syll_2,
//       syll_3: req.body.syll_3,
//       syll_4: req.body.syll_4,
//       syll_5: req.body.syll_5,
//       syll_6: req.body.syll_6,
//       syll_7: req.body.syll_7,
//       syll_8: req.body.syll_8,
//       syll_9: req.body.syll_9,
//     },
//     (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.redirect("adminhome");
//       }
//     }
//   );
// });

// app.get("/deletecourse/:courseID", (req, res) => {
//   const requestCourseId = req.params.courseID;
//   console.log(requestCourseId);

//   // var uid = req.params.id.toString();

//   Course.findByIdAndRemove({ _id: requestCourseId }, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect("/");
//     }
//   });
// });

app.get("/", (req, res) => {
  res.send("hello");
});

// app.get("/Adminlogin", (req, res) => {
//   Course.find({}, function (err, course) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send("Adminlogin", {
//         image_add: course.image_add,
//         course_name: course.course_name,
//         course_desc: req.body.course_desc,
//         originalprice_1: course.originalprice_1,
//         price: course.price,
//         desc_1: course.desc_1,
//         desc_2: course.desc_2,
//         desc_3: course.desc_3,
//         desc_4: course.desc_4,
//         syll_1: course.syll_1,
//         syll_2: course.syll_2,
//         syll_3: course.syll_3,
//         syll_4: course.syll_4,
//         syll_5: course.syll_5,
//         syll_6: course.syll_6,
//         syll_7: course.syll_7,
//         syll_8: course.syll_8,
//         syll_9: course.syll_9,
//       });
//     }
//   });

//   // res.render("admin/Adminlogin")
// });

app.post("/Adminlogin", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  console.log(req.body, "------recieved data is", req.body.username);

  req.login(user, function (err) {
    if (err) {
      console.log(err);
      //   res.json("errrros is", err);
    }
    // if (user == null) {
    //   res.json("aaa");
    // }
    else {
      passport.authenticate("local")(req, res, function () {
        res.json("a registered user");
        // res.status(200).json({ error: "boo:(" });
      });
    }
  });
});

app.get("/adminlogout", (req, res) => {
  req.logout();
  res.send("/adminlogin");
});

app.get("/Adminregister", (req, res) => {
  res.send("Adminregister");
});

app.post("/Adminregister", (req, res) => {
  console.log(req.body, "kk");
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.send("/Adminregister");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.send("user registered");
        });
      }
    }
  );
});

// app.get("/Adminhome", (req, res) => {
//   if (req.isAuthenticated()) {
//     Course.find({}, function (err, course) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render("Adminhome", {
//           course,
//           image_add: course.image_add,
//           course_name: course.course_name,
//           course_desc: req.body.course_desc,
//           originalprice_1: course.originalprice_1,
//           price: course.price,
//           desc_1: course.desc_1,
//           desc_2: course.desc_2,
//           desc_3: course.desc_3,
//           desc_4: course.desc_4,
//           syll_1: course.syll_1,
//           syll_2: course.syll_2,
//           syll_3: course.syll_3,
//           syll_4: course.syll_4,
//           syll_5: course.syll_5,
//           syll_6: course.syll_6,
//           syll_7: course.syll_7,
//           syll_8: course.syll_8,
//           syll_9: course.syll_9,
//         });
//       }
//     });
//   } else {
//     res.redirect("adminlogin");
//   }
// });

// app.get("/contact", (req, res) => {
//   res.render("contact");
// });

// app.post("/contact", function (req, res) {
//   const contact = new Contact({
//     name: req.body.name,
//     email: req.body.email,
//     contact: req.body.contact,
//     subject: req.body.subject,
//     message: req.body.message,
//   });

//   contact.save(function (err) {
//     if (!err) {
//       res.redirect("/");
//     }
//   });
// });

// app.get("/about", (req, res) => {
//   res.render("about");
// });

// app.get("/newcourse", (req, res) => {
//     res.render("newCourse")
// }
// )

app.listen(PORT, function () {
  console.log("Server started on port 3000");
});
