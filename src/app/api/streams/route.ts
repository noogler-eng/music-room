import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db/client";
import { z } from "zod";
// @ts-ignore
import youtubesearchapi from "youtube-search-api";
var YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const dataZod = z.object({
  url: z.string().includes("youtube").or(z.string().includes("spotify")), // either has youtube or spotify
});


// adding the new stream
export async function POST(request: NextRequest, response: Response) {
  const data = await request.json();
  const creatorId: string | null = await request.nextUrl.searchParams.get('creatorId');

  if (!creatorId) return Response.json({ msg: "invalid id" }, { status: 411 });

  const user = await prisma.user.findUnique({
    where: {
      id: creatorId || "",
    },
  });

  if (!user) {
    return NextResponse.json({
        msg: "Unauthorized Access",
      },{ status: 500 }
    );
  }

  try {
    const isSusscess = dataZod.safeParse(data);
    const isRight: any = isSusscess.data?.url.match(YT_REGEX);
    if (!isRight) {
      throw new Error("Invalid url");
    }

    const extractedId = isSusscess.data?.url.split("?v=")[1];

    // getting video id
    // title - youtube video title
    // thumbnial - poster or images which youtuber use to display its video on youtube
    const videoData = await youtubesearchapi.GetVideoDetails(extractedId);
    const length = videoData.thumbnail.thumbnails.length;

    // adding the stream to prisma client
    // we want to add music to someone's creator filed
    const streamAddred = await prisma.stream.create({
      data: {
        userId: user.id || "",
        type: isSusscess.data?.url.includes("spotify") ? "Spotify" : "Youtube",
        title: videoData?.title || "",
        url: isSusscess.data?.url || "",
        extractedId: extractedId || "",
        smallImg: videoData.thumbnail.thumbnails[length - 2].url || "",
        bigImg: videoData.thumbnail.thumbnails[length - 1].url || "",
      },
    });

    return NextResponse.json({
        msg: "stream has been added",
        id: streamAddred.id,
      },{ status: 201 }
    );
  } catch (error) {
    console.log('error in addition of song: ', error);
    return NextResponse.json({
        msg: "some error in backend side",
        error: error,
      },{ status: 411 }
    );
  }
}


// fetching all the streams for showing in queue
export async function GET(request: NextRequest, response: NextResponse) {
  const creatorId = request.nextUrl.searchParams.get("creatorId");

  try {
    const stream = await prisma.stream.findMany({
      where: {
        userId: creatorId || "",
      },
    });

    return NextResponse.json({
        streams: stream,
      },{ status: 200 }
    );
  } catch (error) {
    console.log('error in while fetching all streams: ', error);
    return NextResponse.json({
        msg: error,
      },{ status: 500 }
    );
  }
}