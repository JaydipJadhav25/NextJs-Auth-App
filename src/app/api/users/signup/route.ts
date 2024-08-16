import connectDB from "@/dbconfig/dbconfig";
import {User} from "@/model/database"
import { NextRequest , NextResponse } from "next/server"
import bcrypt from "bcrypt"

connectDB();

export async function GET(){
    console.log("user route..........")

    return NextResponse.json({
        massage : "this is User Route"
    })
}


export async function POST(request : NextRequest){

  try {
      const reqBody = await request.json();
      console.log(reqBody);

      const { username , email , password} = reqBody;


      //validation
       const user = await User.findOne({email});

       if(user) {
        return NextResponse.json({
           massage : "user already exists !"
        })
       }

       //hashpassword
       const salt = await bcrypt.genSalt(10);
       const hashpassword = await bcrypt.hash(password , salt);


       //save in database

       const newUser = new User({
        username ,
        email ,
        password :hashpassword
       })

       const saveuser = await newUser.save();
       console.log(saveuser);



      return NextResponse.json({
        massage : "user Registor successfully ........",
        saveuser
      })

  } catch (error : any) {
    console.log("error in signuo router : " , error)
    
  }


}
