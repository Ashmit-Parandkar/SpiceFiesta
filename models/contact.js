const mongoose = require("mongoose");

const model = mongoose.model;
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    custName:{
        type: String,
        require: true,
    },
    mobile:{
        type: Number,
        require: true,
    },
    address:{
        type: String,
        require: true,
    },
    date:{
        type: Date,
        require: true,
    },
    selectedPackage:{
        type: String,
        require: true,
    },
    numberGuests:{
        type: Number,
        require: true,
    },
    message:{
        type: String,
    },
},{timestamps: true});

module.exports = model("ContactModel", contactSchema);