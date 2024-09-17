const mongoose = require('mongoose');

async function reading() {
    await mongoose.connect('mongodb://localhost:27017/test');
    const carSchema = new mongoose.Schema({
        name: String,
        capacity: Number
    });
    const car = mongoose.model('car', carSchema);

    const data = await car.find({ name: "suzuki" });

    if (data.length > 0) {
        console.log("Found Skoda cars:");
        for (const car of data) {
            console.log(car);
        }
    } else {
        console.log("No Skoda cars found.");
    }

    mongoose.connection.close();
}

reading().catch(err => console.log(err));