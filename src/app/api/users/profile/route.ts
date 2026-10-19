import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import GetToken from "@/helpers/getToken.helper";
import User from "@/models/user.model";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await GetToken(request);
    const user = await User.findOne({ _id: userId }).select("userName email -_id");
    if (!user) {
      throw new Error("User Not available");
    }
    const reponse = NextResponse.json(
      {
        flag: true,
        message: "User Available",
        user,
      },
      {
        status: 200,
      },
    );
    return reponse;
  } catch (error: unknown) {
    return NextResponse.json(
      {
        flag: false,
        message: "Some errors, User Cannot login, plz login first",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
