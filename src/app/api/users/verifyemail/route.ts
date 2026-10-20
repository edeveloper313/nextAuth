import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
connectDB();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(`Token: ${token}`);
    const user = await User.findOne({
      verifyTokenString: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({
        status: 400,
        meassage: "token Expire",
      });
    }
    console.log(user);
    user.isVerified = true;
    user.verifyTokenString = undefined;
    user.verifyTokenExpiry = undefined;

    const savedUser = await user.save();

    return NextResponse.json(
      {
        flag: true,
        message: "User Successfully verify",
        userName: user.userName,
        email: user.email,
      },
      {
        status: 400,
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
