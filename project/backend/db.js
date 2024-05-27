const mongoose = require('mongoose');
const uri = "mongodb+srv://210971:sabih123@cluster0.yq0mkk9.mongodb.net/gofood";

const mongoDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected Successfully");

        // Fetch data from the "FoodData" collection
        const collection = mongoose.connection.db.collection("FertilizerData");
        const data = await collection.find({}).toArray();

        const foodCategoryCollection = mongoose.connection.db.collection("FertilizerCategory");
        const catData = await foodCategoryCollection.find({}).toArray();

        global.FoodData = data;
        global.foodCategory = catData;

    } catch (error) {
        console.error("Error:", error);
    }
}

module.exports = mongoDB;
