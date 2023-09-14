import User from "@models/user";
import { connectToDb } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      } else {
        // Handle the case where no user is found
        // You can set session.user.id to null or an empty string
        session.user.id = null;
      }

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDb();
        // Check if the user exists
        const userExist = await User.findOne({
          email: profile.email,
        });

        // If the user does not exist, create a new user
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error.message);
        console.error("Stack Trace:", error.stack);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
