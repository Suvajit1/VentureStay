const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");


main()
.then((result)=>{
    console.log(`Connected to DB Successfully!`);
})
.catch((err)=>{
    console.log("some err in DB");
});

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/venturestay');
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner : "66ef62dd8cbe2dcc712c8bd3"}));
    await Listing.insertMany(initData.data);
    // console.log(initData.data);
    console.log("data was initialised");
};

initDB();