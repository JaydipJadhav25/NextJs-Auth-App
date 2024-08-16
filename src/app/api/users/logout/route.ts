import connectDB from "@/dbconfig/dbconfig";
import {User} from "@/model/database"
import { NextRequest , NextResponse } from "next/server"

import jwt from "jsonwebtoken";

connectDB();



export async function GET(request : NextRequest){

    const respone = NextResponse.json({
        massage : "user logout successfully.."
    })

    //set cookies

    respone.cookies.delete("token");

    return respone;


}