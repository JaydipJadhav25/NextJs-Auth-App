import nodemailer  from "nodemailer";
import connectDB from "@/dbconfig/dbconfig";
import { User } from "@/model/database"
import bcrypt from "bcrypt"



connectDB();

const sendEmail = async({ email , emailType , userId} :any) =>{



try {


  console.log("call mailler function   ..........." , email , emailType , userId);

         // genreate token
         //and set user doc and send email

         const hashtoken = await bcrypt.hash(userId.toString(), 10);


         if( emailType ==="VERIFY"){
  console.log(" if codn called ........." , email , emailType , userId  , hashtoken);
          


        const user =   await User.findByIdAndUpdate(userId , {
            $set :{
              forgotpassworstoken  : hashtoken,
              forgotpassworstokenexpriy : Date.now() + 3600000

            }
          })

          console.log("user token set  : " , user);



         } else if(emailType==="REAST"){

          
          await User.findByIdAndUpdate(userId , {
            $set :{
              verifytoken  : hashtoken,
              verifytokenexpriy: Date.now() + 3600000

            }
          })


         }



        
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f6b5aca1d02bc9",
          pass: "ae4e1b081e7d13"
        }
      });




    const mailOption = {
        from: 'jaydipjadhav2512@gmail.com', // sender address
        to: email, // list of receivers
        subject: emailType === "VERIFY" ? "verify your account " : "reast your password", 
        html: `<p>click <a href="http://localhost:3000/verifyemail?token=${hashtoken}">here</a>
         to${
         emailType==="VERIFY" ? "verify your email" :  "reast your password"
         } or copy and past the link below  your browser . <br/>
  
          http://localhost:3000/verifyemail?token=${hashtoken}
        

        </p>`, // html body
      }




      console.log("mail respones sending........... option : " , mailOption);


      const mailRespones = await transport.sendMail(mailOption);
      console.log("mail respones : " , mailRespones);

      return mailRespones;



} catch (error : any) {
    console.log(error.massage);
    
}


}

export default sendEmail;