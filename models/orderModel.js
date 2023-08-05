import mongoose from "mongoose";

const oderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref: 'Product',
    }],
    payment: {},
    buyer:
    {
        type:mongoose.ObjectId,
        ref:'users'
    },
    status:{
        type:String,
        default:"Not Process",
        enum:["Not Process","Processing","shipped","deliverd","cancel"]
    }
},{timestamps:true});

export default mongoose.model("Order", oderSchema);