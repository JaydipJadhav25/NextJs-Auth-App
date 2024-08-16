import connectDB from "@/dbconfig/dbconfig";
import { getUserfromtoken } from "@/helpers/gettokenfromuser";
import { User } from "@/model/database"
import { NextRequest , NextResponse } from "next/server"

connectDB();

export async function GET(request : NextRequest){

    //call function and get user
    const userId = await getUserfromtoken(request);

    //find user and fetch data ;
    const user = await User.findById(userId).select("-password");

    if(!user){
        return NextResponse.json({
            massage : "user not fount",
           
        })

    }

    return NextResponse.json({
        massage : "user data fetch successfuly........",
        user
    })


}