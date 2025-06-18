
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid';





interface IParams {
  ids?: string[];
}

export async function POST(
  request: Request
) {

  const EmailSender = process.env.GRIEVANCE_EMAIL;
  
  // const currentUser = await getCurrentUser();
  // if(!currentUser){
  //   return NextResponse.error();
  // }

  // const body = await request.json();
 
  const { email } = await request.json();

  if(!email){
    return NextResponse.json(null);
  }

try{
  // By ID
const user = await prisma.user.findUnique({
  where: {
    email: email,
  },
})

  if(user){
    const passwordResetToken = uuidv4();

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { emailResetPassword: passwordResetToken },
    });

    
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com", port: 465, secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.GRIEVANCE_EMAIL,
            pass: process.env.GRIEVANCE_EMAIL_PASSWORD

        }
    });

    await new Promise((resolve, reject) => { // verify connection configuration
        transporter.verify(function (error : any, success : any) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                // console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    const currentUrl = process.env.GRIEVANCE_DOMAIN;

    // const resetPasswordUrl = `${currentUrl}/auth/reset-password/${encodeURIComponent(passwordResetToken)}`;
    const resetPasswordUrl = `http://localhost:3000/auth/reset-password/${encodeURIComponent(passwordResetToken)}`;

    // async..await is not allowed in global scope, must use a wrapper
// send mail with defined transport object
try {
  const info = await transporter.sendMail({
    from: `Weedgrowers <${EmailSender}>`,
    to: [email],
    subject: `Password Reset Request`,
    html: `We received a request to reset your password for our app. Please click on the following link to reset your password: <a href="${resetPasswordUrl}">Reset Password</a>. If you did not request a password reset, please ignore this email.`
        });
        return new Response(JSON.stringify({ message: 'A password reset link has been sent to your email.' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return NextResponse.json(error);
    }
     
  }
   else {
  // Respond with a generic message whether or not the email was found
  // This is a security measure to prevent email enumeration
  return new Response(JSON.stringify({ message: 'If the email is associated with an account, a password reset link will be sent.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

} catch (error: any) {
  throw new Error(error);
}
}






