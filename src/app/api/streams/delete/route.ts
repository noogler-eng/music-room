import prisma from "@/app/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: Response){
    
    const songId: string | null = await request.nextUrl.searchParams.get('streamId');
    try{
        if(songId == null) {
            return NextResponse.json({
                msg: "invalid id"
            }, {status: 411})
        }

        const stream = await prisma.stream.delete({
            where: {
                id: songId
            }
        })
        
        if(!stream){
            return NextResponse.json({
                msg: "stream not found"
            }, {status: 411})
        }
    
        await prisma.stream.delete({
            where: {
                id: songId 
            }
        })
    
        return NextResponse.json({
            msg: "stream has deleted"
        }, {status: 200})
    }catch(error){
        console.log('error while deleting stream', error);
        return NextResponse.json({
            msg: "internal server error"
        }, {status: 500})
    }
}