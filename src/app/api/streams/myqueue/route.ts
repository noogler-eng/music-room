import prisma from "@/app/db/client";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "../../auth/config";

// this is not an best approach (long polling)
// try web socket instead of this
// long polling will done here
export async function GET(request: NextRequest) {
  try {
    const creatorId: string | null = await request.nextUrl.searchParams.get('creatorId');

    if (!creatorId) return Response.json({ msg: "invalid id" }, { status: 411 });
    const session = await getServerSession(authConfig);
    console.log(session);

    const creator = await prisma.user.findUnique({
      where: {
        id: creatorId,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return Response.json({
          msg: "unauthorised access",
        },{ status: 411 }
      );
    }

    if (!creator) {
      return Response.json({
          msg: "creator not exists",
        },{ status: 411 }
      );
    }

    // complex query
    // _count will count the number of upvoters
    const streams = await prisma.stream.findMany({
      where: {
          userId: creator.id
      },
      include: {
        _count: {
          select: {
            upvotes: true,
          },
        },
        upvotes: {
          where: {
            userId: user.id,
          },
        },
      },
      orderBy: {
        upvotes: {
          _count: "desc",
        },
      },
    });

    return Response.json({
        msg: streams,
      },{ status: 200 }
    );
  } catch (error) {
    console.log('error while fetching the creators streams: ', error);
    return Response.json({
        msg: "internal server error",
      },{ status: 500 }
    );
  }
}