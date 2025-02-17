import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/connectToDB";
import { userModel } from "@/models/user.model";
import bcrypt from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        await connectToDB();

        const user = await userModel.findOne({ email: credentials.email });

        if (!user)
          throw new Error(
            "দুঃখিত আপনার প্রদান করা লগইন সকল ইনফর্মেশন সঠিক নয়। দয়া করে সঠিক ইনফর্মেশন প্রদান করুন।"
          );

        if (user.status === "blocked") {
          throw new Error(
            "আপনার একাউন্ট স্থিতি স্থায়ীভাবে নিষ্ক্রিয় করা হয়েছে। আপনি লগইন করতে পারবেন না। যদি আপনি এটি নিষ্ক্রিয় করা হয়েছে বলে মনে করেন তাহলে আমাদের সাথে যোগাযোগ করুন।"
          );
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch)
          throw new Error(
            "দুঃখিত আপনার প্রদান করা লগইন সকল ইনফর্মেশন সঠিক নয়। দয়া করে সঠিক ইনফর্মেশন প্রদান করুন।"
          );

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
        };
      },
    }),
  ],
  pages: {
    signOut: "/",
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone = user.phone;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.phone = token.phone;
      session.user.avatar = token.avatar;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export const { auth, signIn, signOut } = handler;
export { handler as GET, handler as POST };
