import {z} from "zod";
import prisma from "@/app/db/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authConfig } from "../../auth/config";


const upvoteZod = z.object({
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

    const upvote = await prisma.upvote.findFirst({
        where: {
            userId: user.id,
            streamId: data.streamId
        }
    })

    console.log(upvote);

    if(upvote){
        return NextResponse.json({
            msg: "already upvoted!"
        }, {status: 511});
    }

    try{
        const isSusscess = upvoteZod.safeParse(data);

        // if user already voted or not handel by schema
        await prisma.upvote.create({
            data: {
                userId: user.id || "",
                streamId: isSusscess.data?.streamId || ""
            }
        })

        return NextResponse.json({
            msg: "stream has been upvoted",
        }, {status: 200})
    }catch(error){
        console.log(error);
        return NextResponse.json({
            msg: "some error in backend side",
            error: error
        }, {status: 411})
    }
}