import nodemailer from "nodemailer";

import { sendMailI } from "@/interfaces/users/users.interface";
import {
  checkType,
  checkTypeAndReturnComponent,
} from "@/helpers/checker.helper";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const sendMail = async ({ email, type, userId }: sendMailI) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (type === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyTokenString: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (type === "RESET_PASSWORD") {
      const hashedToken = await bcrypt.hash(userId.toString(), 10);
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }
    // Create a transporter using SMTP
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USER_ID,
        pass: process.env.MAILER_USER_PASS,
      },
    });
    const verificationLink = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;

    const mailOptions = {
      from: "shakirbarkati@gmail.com", // sender address
      to: email, // list of recipients
      subject: checkType(type), // subject line
      html: checkTypeAndReturnComponent(type, verificationLink),
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    return NextResponse.json({
      status: 401,
      message: `Something went wrong in mailer ${message}`,
    });
  }
};
