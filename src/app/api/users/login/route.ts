import connectDB from "@/dbconfig/dbconfig";
import { User } from "@/model/database"
import { NextRequest , NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

connectDB();

const secretKey = "superMan@123";

export async function GET(){
    console.log("user route..........")

    return NextResponse.json({
        massage : "this is User Route login"
    })
}

export async function POST(request : NextRequest){

   try {

     const reqbody = await request.json();
     const{email , password} = reqbody;
     console.log(email , password);
 
     if(!email){
         return NextResponse.json({
             error : " Email is requried..."
         })
     }
 
     //cheack user is extis or not
 
     const user  = await User.findOne({email});

     console.log("user : " , user);
 
     if(!user){
         return NextResponse.json({
             error : "User does Not Validate."
         })
     }
 
     //check password
 
     const validepassword = await  bcrypt.compare(password , user.password);
 
     console.log("valify password:  " , validepassword);
 
     if(!validepassword){
         return NextResponse.json({
             error : "User Password is Wrong... "
         })
     }
 
     // set jwt cookies
 
     const token = jwt.sign({
         _id : user.id,
         emial : user.email,
         username : user.username
     } , secretKey);
 
     //create respones
 
     const respone = NextResponse.json({
         massage : "user login successfully.."
     })
 
     //set cookies
 
     respone.cookies.set("token" , token);
 
     return respone;
 
   } catch (error : any) {

    return NextResponse.json({
        error : error.massage
    })
    
   }




}
