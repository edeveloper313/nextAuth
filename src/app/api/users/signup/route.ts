import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { singUpI } from "@/interfaces/users/users.interface";
import bcrypt from "bcryptjs";
import { sendMail } from "@/helpers/mailer.helper";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody: singUpI = await request.json();
    const { userName, email, password } = reqBody;
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({
        flag: true,
        status: 422,
        message: "User Already exist",
      });
    }
    // use the bcryptjs
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // add user
    const newUser = await new User({
      userName: userName,
      email: email,
      password: hash,
    });
    const savedUser = await newUser.save();
    const userId = await savedUser._id.toString();

    // Email Sending Here
    const emailResponse = await sendMail({ email, type: "VERIFY", userId });
    NextResponse.json({
      savedUser,
      message: "User Successfully Created",
      email: email,
      status: 202,
      flag: "success",
    });
    const returnShowCase = NextResponse.json({
      flag: "success",
      status: 201,
      message: "User Successfully created",
      id: savedUser._id,
      user_name: savedUser.userName,
      eamil: savedUser.email,
    });
    return returnShowCase;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        message: `Something went wrong in creating user ${message}`,
      },
      {
        status: 401,
      },
    );
  }
}
