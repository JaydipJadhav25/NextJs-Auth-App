import nodemailer  from "nodemailer";


const sendEmail = async({ email , emailType , userId} :any) =>{

try {
        
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f6b5aca1d02bc9",
          pass: "ae4e1b081e7d13"
        }
      });



    const mailOption = {
        from: 'jaydipjadhav.dev25@gamil.com', // sender address
        to: email, // list of receivers
        subject: emailType === "VERIFY" ? "verify your account " : "reast your password", 
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      }

      const mailRespones = await transport.sendMail(mailOption);
      console.log("mail respones : " , mailRespones);
      return mailRespones;



} catch (error : any) {
    console.log(error.massage);
    
}


}

export default sendEmail;