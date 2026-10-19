import { NextRequest } from "next/server";
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
  } catch (error: any) {
    throw new Error(`token not available ${error}`);
  }
};

export default GetToken;
