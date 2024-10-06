import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/db/client";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  //   pages: {
  //     signIn: '/auth/signin',
  //     signOut: '/auth/signout',
  //   }

  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {

      // if user is not in the prisma database then adding to the database
      try{
        const isUserExists = await prisma.user.findUnique({
          where: {
            email: user.email
          }
        })

        console.log("isUserExists", isUserExists);
  
        if(isUserExists?.email){
          return true;
        }
  
        await prisma.user.create({
          data: {
            name: user.name,
            provider: "Google",
            email: user.email
          }
        })

        return true;
      }catch(error){
        return false;
      }
    },
    async session({ session, user, token }: any) {
      try{
        const userFromDB = await prisma.user.findUnique({
          where: {
            email: token.email
          }
        })
  
        const newSession = {
          ...session, userId: userFromDB?.id
        }  

        console.log("session: ", newSession);
        return newSession;
      }catch(error){
        return session
      }
    },
  },
};
