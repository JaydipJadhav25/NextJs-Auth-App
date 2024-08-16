import connectDB from "@/dbconfig/dbconfig";
import {User} from "@/model/database"
import { NextRequest , NextResponse } from "next/server"


connectDB();

export async function POST(request : NextRequest){

     const reqBody = await  request.json(); 
     
     const {token } = reqBody;

      console.log("token :  :: : " , token); 

     if(!token){
        return NextResponse.json({
            error  : " token  are requried"
        })
     }

     //check token in database

     const user  = await User.findOne({
        forgotpassworstoken : token,
        forgotpassworstokenexpriy :  { $gt : Date.now()}
     })

     if(!user){
        return NextResponse.json({
            error  : " Invalid token user ............Try agin"
        })
     }

     //update fields/.

     user.isverify = true;
     user.forgotpassworstoken = undefined;
     user.forgotpassworstokenexpriy = undefined;

  //save changes
     await user.save();
   
     return NextResponse.json({
        error  : " user successfully verifed..........!",
        user
    })



}