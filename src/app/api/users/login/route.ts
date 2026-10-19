import { connectDB } from "@/dbConfig/dbConfig";
import { loginI } from "@/interfaces/users/users.interface";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password }: loginI = reqBody;
    // Find user
    const user = await User.findOne({ email });
    // if user not available
    if (!user) {
      return NextResponse.json(
        {
          flag: false,
          message: "User Cannot Exist",
        },
        {
          status: 404,
        },
      );
    }
    const userPass = user.password;
    // Comparing password
    const isValidPass = await bcrypt.compare(password, userPass);
    if (!isValidPass) {
      return NextResponse.json(
        {
          flag: false,
          message: "Password is not correct",
        },
        {
          status: 401,
        },
      );
    }
    // password correct and move on next step
    // Create web-token
    const privateKey = process.env.SECRET_TOKEN;
    if (!privateKey) {
      throw new Error("JWT_SECRET is missing in .env");
    }
    // Token
    const token = jwt.sign({ id: user._id }, privateKey, { expiresIn: "1d" });
    // Response
    const response = NextResponse.json(
      {
        success: true,
        message: "User Login successfully",
        user: user,
      },
      {
        status: 200,
      },
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: unknown) {
    return NextResponse.json(
      {
        flag: false,
        message: "Some errors, User Cannot login",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
