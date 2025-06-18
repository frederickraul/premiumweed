// app\(front)\reset-password\[token]\route.ts
import {randomBytes} from 'crypto';
import bcryptjs from 'bcryptjs';

import {NextRequest, NextResponse} from 'next/server';

import prisma from '@/app/libs/prismadb';

export const GET = async (request : NextRequest) => {
    const token = request.nextUrl.pathname.split('/').pop();
    const EmailSender = process.env.GRIEVANCE_EMAIL;


    // Find the user by the emailResetPassword token and check if the token has not expired
    // const user = await prisma.user.findUnique({
    // where: emailResetPassword: token,
    // $or: [
    //     { passwordResetTokenExpires: { $gt: new Date() } },
    //     { passwordResetTokenExpires: null },
    // ],
    // });

    const user = await prisma.user.findFirst({
        where: {
            emailResetPassword: token
        }
    });

    if (user) { // If the user is found, generate a new secure password
        const newPassword = generateSecurePassword();

        // Hash the new password before saving it to the database
        const hashedPassword = await bcryptjs.hash(newPassword, 12);

        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                hashedPassword: hashedPassword,
                emailResetPassword: null,
                passwordResetTokenExpires: undefined
            }
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

        // async..await is not allowed in global scope, must use a wrapper
        try { // send mail with defined transport object
            await transporter.sendMail({
                from: `The Quote Form <${EmailSender}>`,
                to: [`${user.email}`],
                subject: `Your New Password`,
                html: `Your password has been reset. Here is your new password: <strong>${newPassword}</strong>. It is recommended to change this password after logging in.`
            });
            // Return a response indicating the new password has been sent
            return new Response('Your new password has been sent to your email.', {status: 200});

        } catch (error) {
            return NextResponse.json(error);
        }

    } else { // If no user is found or the token is expired, return an error response
        return new Response('Password reset token is invalid or has expired.', {status: 400});
    }
}

// Helper function to generate a secure password
function generateSecurePassword() {
    return randomBytes(12).toString('hex'); // Generates a random hex string of length 24
}

// Note: Do not use 'export default get;' since we are using named exports.
