import {z} from "zod";
import prisma from "@/app/db/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authConfig } from "../../auth/config";


const downvoteZod = z.object({
    streamId: z.string()
})


export async function POST(request: Request, response: Response){
    const data = await request.json();
    const session = await getServerSession(authConfig)

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if(!user){
        return NextResponse.json({
            msg: "unauthorised!"
        }, {status: 411});
    }

    try{
        const isSusscess = downvoteZod.safeParse(data);
        
        const upvotes = await prisma.upvote.findUnique({
            where: {
                userId_streamId: {
                    userId: user.id || "",
                    streamId: isSusscess.data?.streamId || ""
                }
            }
        })

        if(!upvotes){
            return NextResponse.json({
                msg: "no have not voted yet!"
            }, {status: 411}); 
        }

        // if user already voted or not handel by schema
        await prisma.upvote.delete({
            where: {
                userId_streamId: {
                    userId: user.id || "",
                    streamId: isSusscess.data?.streamId || ""
                }
            }
        })
    
        return NextResponse.json({
            msg: "stream has been downVoted",
        }, {status: 200})

    }catch(error){
        console.log(error);
        return NextResponse.json({
            msg: "some error in backend side",
            error: error
        }, {status: 411})
    }
}