import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        flag: true,
        message: "User successfully logout",
      },
      {
        status: 200,
      },
    );
    response.cookies.delete("token");
    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        flag: false,
        message: "Some errors, User Cannot login",
        error: message,
      },
      {
        status: 500,
      },
    );
  }
}
