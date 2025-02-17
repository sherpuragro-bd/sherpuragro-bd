import { connectToDB } from "@/lib/connectToDB";
import { AddressModel } from "@/models/address.model";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const params = req.nextUrl.searchParams;
    const email = params.get("user");

    if (!token?.email) {
    }
    await connectToDB();
    const addressesCount = await AddressModel.countDocuments({ author: email });

    return NextResponse.json(addressesCount);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
