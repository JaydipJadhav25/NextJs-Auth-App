import { NextRequest , NextResponse } from "next/server"
import jwt from "jsonwebtoken"


const secretKey = "superMan@123";


export const getUserfromtoken = (request : NextRequest) =>{

    //importants
    const token  = request.cookies.get("token")?.value || ""; //imp 
    console.log("token : ", token);
    
    //decode token
    const decodedUser : any = jwt.verify(token , secretKey);
    console.log("user finded : " , decodedUser);

    return decodedUser._id;

}