import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GetToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      throw new Error("Token missing");
    }
    // // convert decrypting token to decoding
    const secretToken = process.env.SECRET_TOKEN;
    if (!secretToken) {
      throw new Error("Secret Token missing");
    }
    const decoded = jwt.verify(token, secretToken);

    if (typeof decoded === "string" || !("id" in decoded)) {
      throw new Error("Invalid token");
    }
    return decoded.id;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    return NextResponse.json({
      status: 401,
      message: `Something went wrong in token ${message}`,
    });
  }
};

export default GetToken;
