const mongoose = require("mongoose");
const Review = require("./review");
const User = require("./user");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },

    description : {
        type : String,
    },

    image : {
        url : String,
        filename : String,
    },

    price : {
        type : Number,
        required : true,
        min : [1, "price is to low for listing"],
    },

    location : {
        type : String,
        required : true,
    },

    country : {
        type : String,
        required : true,
    },

    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        }
    ],

    geometry : {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
    },

    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    }
});

// post mongoose middleware
listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing && listing.reviews.length){
        await Review.deleteMany({_id : {$in :listing.reviews}});
    }
    // console.log("post middleware");
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;