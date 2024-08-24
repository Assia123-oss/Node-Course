const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/mongo-exercises");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course
    // .find({ isPublished: true, tags: "backend" })
    // .sort({ name: 1 })
    .find({ isPublished: true })
    .or([{ price: {$gte: 15}}, {name: /.*by.*/}]);
    // .or([{ tags: "frontend" }, { tags: "backend" }])
    // .select({ name: 1, author: 1 , price: 1 })
    // .sort({ price: -1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
