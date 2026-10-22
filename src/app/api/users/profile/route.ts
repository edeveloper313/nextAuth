import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import GetToken from "@/helpers/getToken.helper";
import User from "@/models/user.model";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await GetToken(request);
    const user = await User.findOne({ _id: userId }).select("_id");
    if (!user) {
      throw new Error("User Not available");
    }
    const reponse = NextResponse.json(
      {
        flag: true,
        message: "User found",
        user,
      },
      {
        status: 200,
      },
    );
    return reponse;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        flag: false,
        message: "Some errors, User Cannot login, plz login first",
        error: message,
      },
      {
        status: 500,
      },
    );
  }
}
