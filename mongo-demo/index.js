const { boolean } = require('joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/playground')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));


const courseSchema = new mongoose.Schema({
    name: String,
    author:String,
    tags: [ String ],
    date: {type: Date , default: Date.now()},
    isPublished: {type: Boolean}
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
    name: 'Angular Course',
    author:'Mosh',
    tags: ['angular','frontend'],
    isPublished: true
});

const result = await course.save();
console.log(result);
}


async function getCourses() {

    const pageNumber = 2;
    const pageSize = 10;
   

    const courses = await Course.find({ author: "Mosh", isPublished: true })
      // .find({price: {$gte: 10, $lte: 20 } })
      // .find({price : {$in: [10 ,15,20] }})
      // .find()
      // .or([{author: 'Mosh'},{isPublished: true}])
      // .and([])

      //REGEX starts with Mosh
      // .find({author: /^Mosh/ })

      //Ends with Hamedani
      // .find({author: /Hamedani$/i })

      //Contains Mosh
      // .find({author: /.*Mosh.*/i })
      
      .skip((pageNumber - 1) * pageSize )
      .limit(pageSize)
      .sort({ name: 1 })
      // .select({ name: 1, tags: 1})
      .countDocuments();
      console.log(courses);

}

// getCourses();

async function updateCourse(id){
//   const course = await Course.findById(id);
//   if(!course) return;
//   course.set({
//   isPublished: false,
//   author: 'Another author'
//   });

  const course = await Course.findByIdAndUpdate(id, {
    $set: {
        author: 'Jack',
        isPublished: true
    }
  },{new: true});

  const result = await course.save();
  console.log(result);
  
}

async function removeCourse(id) {
//  const result =  await Course.deleteOne({_id: id});

const course = await Course.findByIdAndDelete(id);
 console.log(course );
 
}

removeCourse ("66c7fd4accdb4145d6c87445");



