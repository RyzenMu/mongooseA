const mongoose = require('mongoose');

main().catch(err => console.error('Error:', err));

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const carSchema = new mongoose.Schema({
      name: String,
      capacity: {
        type: Number,
        required: true,
        min: 800,
        max: 2000
      }
    });

    const Car = mongoose.model('Car', carSchema);

    const maruti = new Car({ name: "alto", capacity: 956 });
    await maruti.save();
    console.log('Maruti saved successfully');

    const insertManyCars = [
      { name: "iova", capacity: 1753 },
      { name: "kia", capacity: 1544 }
    ];
    // await Car.insertMany(insertManyCars);
    await Car.updateOne({name:"iova"}, {capacity:1800})
    console.log('Cars inserted successfully');

    await Car.deleteOne({name:"iova"})

  } catch (err) {
    console.error('Error during database operations:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Connection closed');
  }
}
