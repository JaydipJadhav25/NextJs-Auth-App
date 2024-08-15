import mongoose from "mongoose";



const useSchema = new  mongoose.Schema({

    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
     password : {
        type : String,
        required : true
    },
    isverify : {
        type : Boolean,
        default : false
    },
    isadmin : {
        type : Boolean,
        default : false
    },
    forgotpassworstoken : String,
    forgotpassworstokenexpriy : Date,
    verifytoken : String,
    verifytokenexpriy : Date,


} ,{
    timestamps : true
})

export const User = mongoose.Schema.users || mongoose.model("users" , useSchema);