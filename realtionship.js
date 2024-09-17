const mongoose = require('mongoose');

async function relate() {
  try {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const childSchema = new mongoose.Schema({
      name: String,
      age: Number
    });

    const parentSchema = new mongoose.Schema({
      name: String,
      age: Number,
      child: childSchema // Embedded child schema
    });

    const Child = mongoose.model('Child', childSchema);
    const Parent = mongoose.model('Parent', parentSchema);

    // Insert multiple child documents
    await Child.insertMany([{ name: "Abraham", age: 45 }, { name: "John", age: 67 }]);

    // Insert a parent document with a single child object
    await Parent.create({
      name: "Sashi",
      age: 77,
      child: { name: "Abraham", age: 45 } // Example child object
    });

    console.log('Documents inserted successfully');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close();
  }
}

relate().catch(err => console.log(err));
