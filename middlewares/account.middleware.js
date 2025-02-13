// import { connectToDB } from "@/lib/connectToDB";
// import { AddressModel } from "@/models/address.model";
// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";

// export const newAddresMiddleware = async () => {
//   const session = await getServerSession();

//   await connectToDB();

//   const allAddress = await AddressModel.countDocuments();

//   console.log(allAddress);
//   return NextResponse.next();
// };
