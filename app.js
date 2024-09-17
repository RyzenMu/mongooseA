// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  const carSchema = new mongoose.Schema({
      name: String,
      capacity : Number
      });
      const car = mongoose.model('car', carSchema);
      
      const maruti = new car({name: "marit 800", capacity: 833});

      await maruti.save();

      const insertmanyCars = [{name:"Skoda", capacity:1000}, {name:"suzuki", capacity:1200}];
      await car.insertMany(insertmanyCars);

}

