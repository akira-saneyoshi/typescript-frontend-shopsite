import apiIntermediate from "@/lib/apiIntermediate";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();
    const {
      first_name,
      last_name,
      email,
      password,
      password_confirm,
    } = body;

    if (!first_name) {
      return new NextResponse("Name is required.", { status: 400 });
    }

    if (request.method === "POST") {
      const result = await apiIntermediate
        .post("/ambassador/register", {
          first_name,
          last_name,
          email,
          password,
          password_confirm,
        })
        .then((response) => response.data);

      console.log('[USER_REGISTER_POST]', result);

      return NextResponse.json(result);
    }
  } catch (error) {
    console.log('[USER_REGISTER_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}